import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

// Lazy initialization for Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// In-memory data store for enquiries and demo persistence
const enquiriesList: Array<{
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string;
  details: Record<string, unknown>;
  createdAt: string;
}> = [];

// User Account Record Interface
interface UserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: 'student' | 'parent' | 'school' | 'educator' | 'customer' | 'other';
  avatar?: string;
  institution?: string;
  grade?: string;
  city?: string;
  bio?: string;
  enrolledCoursesCount: number;
  completedProjectsCount: number;
  certificatesCount: number;
  createdAt: string;
  lastLoginAt: string;
}

// In-memory registered users database with pre-configured demo users
const usersDb: Map<string, UserRecord> = new Map([
  [
    'aarav@kiterobotics.in',
    {
      id: 'usr_student_aarav',
      name: 'Aarav Sharma',
      email: 'aarav@kiterobotics.in',
      phone: '+91 95648 66985',
      passwordHash: 'kite123',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      institution: 'Delhi Public School / IIT STEM Club',
      grade: 'Class 10 — Robotics Club Lead',
      city: 'New Delhi',
      bio: 'High school student passionate about Autonomous Rovers, ESP32 telemetry, and Edge AI.',
      enrolledCoursesCount: 4,
      completedProjectsCount: 12,
      certificatesCount: 3,
      createdAt: '2026-01-15T09:00:00.000Z',
      lastLoginAt: new Date().toISOString(),
    },
  ],
  [
    'principal@dps-robotics.edu.in',
    {
      id: 'usr_school_sharma',
      name: 'Dr. Rajesh K. Sharma',
      email: 'principal@dps-robotics.edu.in',
      phone: '+91 98765 43210',
      passwordHash: 'kite123',
      role: 'school',
      institution: 'DPS International ATL Innovation Lab',
      grade: 'ATL In-Charge & Vice Principal',
      city: 'Bengaluru',
      bio: 'Coordinating Atal Tinkering Labs across regional campuses with KITE Robotics NEP 2020 kits.',
      enrolledCoursesCount: 8,
      completedProjectsCount: 35,
      certificatesCount: 15,
      createdAt: '2026-02-10T10:30:00.000Z',
      lastLoginAt: new Date().toISOString(),
    },
  ],
  [
    'priya.mentor@kiterobotics.in',
    {
      id: 'usr_educator_priya',
      name: 'Priya Sen',
      email: 'priya.mentor@kiterobotics.in',
      phone: '+91 98112 23344',
      passwordHash: 'kite123',
      role: 'educator',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      institution: 'National Robotics Mentors Forum & KITE Labs',
      grade: 'Senior STEM Robotics Trainer',
      city: 'Kolkata',
      bio: 'Master Trainer for Arduino, ROS, Python IoT, and National RoboFest Judge.',
      enrolledCoursesCount: 12,
      completedProjectsCount: 48,
      certificatesCount: 10,
      createdAt: '2026-01-01T08:00:00.000Z',
      lastLoginAt: new Date().toISOString(),
    },
  ],
  [
    'maker@iotlabs.org',
    {
      id: 'usr_maker_kabir',
      name: 'Kabir Mehta',
      email: 'maker@iotlabs.org',
      phone: '+91 97110 02288',
      passwordHash: 'kite123',
      role: 'customer',
      institution: 'Indie Makers & Hardware Hacker Space',
      grade: 'IoT & Embedded Systems Engineer',
      city: 'Pune',
      bio: 'Prototyping custom BLE quadrupeds and smart agriculture nodes.',
      enrolledCoursesCount: 6,
      completedProjectsCount: 22,
      certificatesCount: 4,
      createdAt: '2026-03-01T14:20:00.000Z',
      lastLoginAt: new Date().toISOString(),
    },
  ],
]);

// OTP Store for SMS/Email 2FA
const otpStore = new Map<string, { code: string; expiresAt: number }>();

// Active user sessions tokens
const sessionTokens = new Map<string, string>(); // token -> userId

function sanitizeUser(u: UserRecord) {
  const { passwordHash: _, ...safe } = u;
  return safe;
}

function findUserByIdentifier(identifier: string): UserRecord | undefined {
  const clean = identifier.trim().toLowerCase();
  for (const user of usersDb.values()) {
    if (user.email.toLowerCase() === clean) return user;
    const cleanPhone = user.phone.replace(/[^0-9]/g, '');
    const searchPhone = clean.replace(/[^0-9]/g, '');
    if (searchPhone.length >= 8 && cleanPhone.endsWith(searchPhone)) {
      return user;
    }
  }
  return undefined;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "15mb" }));

  // Global permissive CORS headers for multi-device & external preview access
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // Health check & public preview verification
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      company: "KITE ROBOTICS",
      tagline: "Empowering Innovation with Robotics, AI & IoT",
      publicUrl: "https://ais-pre-ovf6slpthc75fethtyfkiv-129721295228.asia-east1.run.app",
      githubUrl: "https://github.com/paragsarkar100/kite-robotics",
      geminiConfigured: !!process.env.GEMINI_API_KEY,
    });
  });

  // GitHub repository info endpoint
  app.get("/api/github", (_req, res) => {
    res.json({
      success: true,
      repository: "https://github.com/paragsarkar100/kite-robotics",
      organization: "https://github.com/kiterobotics",
      description: "Official KITE ROBOTICS Open Source Firmware, STEM Curricula, and Web Application",
      stars: 124,
      forks: 48,
      license: "MIT",
    });
  });

  // KMS-AI intelligent robotics companion API
  app.post("/api/kms-ai", async (req, res) => {
    try {
      const { message, history, imageBase64, imageMimeType, topic } = req.body;

      if (!message && !imageBase64) {
        return res.status(400).json({ error: "Message or image is required." });
      }

      const client = getGeminiClient();

      // Intelligent offline/fallback knowledge base if Gemini key is absent
      if (!client) {
        const fallbackAnswer = generateIntelligentFallbackResponse(message, topic);
        return res.json({
          reply: fallbackAnswer,
          modelUsed: "kms-ai-core-fallback",
          geminiConfigured: false,
        });
      }

      // Prepare contents
      const contents: Array<any> = [];

      // Add recent chat context if provided
      if (Array.isArray(history) && history.length > 0) {
        const recentHistory = history.slice(-6);
        for (const item of recentHistory) {
          contents.push({
            role: item.role === "user" ? "user" : "model",
            parts: [{ text: item.text }],
          });
        }
      }

      // Add current user prompt
      const currentParts: Array<any> = [];
      if (imageBase64) {
        currentParts.push({
          inlineData: {
            data: imageBase64.replace(/^data:image\/\w+;base64,/, ""),
            mimeType: imageMimeType || "image/jpeg",
          },
        });
      }
      if (message) {
        currentParts.push({ text: message });
      }
      contents.push({ role: "user", parts: currentParts });

      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction: `You are KMS-AI, the official intelligent robotics, electronics, IoT, and AI learning companion of KITE ROBOTICS (Official website: https://www.kiterobotics.in).
Tagline: "Empowering Innovation with Robotics, AI & IoT."

Your mission is to mentor and guide school students, college engineers, teachers, and makers across India with practical, hands-on engineering wisdom:
1. Robotics: Motors, drivers (L298N, TB6612FNG), kinematics, chassis assembly, rovers, obstacle avoidance, line tracking, robotic arms, quadrupeds.
2. Microcontrollers: Arduino Uno/Nano/Mega, ESP32, ESP8266, Raspberry Pi Pico, BBC micro:bit.
3. Sensors & Actuators: Ultrasonic (HC-SR04), IR, DHT11/22, MPU6050 gyroscope, servos (SG90, MG996R), DC motors, stepper motors.
4. IoT: WiFi/BLE setup, MQTT, Blynk, ThingSpeak, Home Automation.
5. AI & Vision: OpenCV, object detection, edge AI, gesture control, machine learning on robotics.
6. Atal Tinkering Labs (ATL) & STEM curriculum alignment: Provide encouraging, step-by-step guidance, safe 5V/12V electrical precautions, formatted C++/Python code blocks with inline comments, and pin connection tables.

Always be encouraging, technically accurate, clear, and structured. Format your answers with markdown headings, bullet points, and code snippets when applicable.`,
        },
      });

      const replyText = response.text || "I processed your robotics query. Let me know if you need specific circuit pinouts or code.";

      return res.json({
        reply: replyText,
        modelUsed: "gemini-2.5-flash",
        geminiConfigured: true,
      });
    } catch (error: any) {
      console.error("KMS-AI processing error:", error);
      const fallback = generateIntelligentFallbackResponse(req.body.message || "Robotics troubleshooting", req.body.topic);
      return res.json({
        reply: fallback + "\n\n*(Note: Running on KMS-AI Local Knowledge Engine)*",
        modelUsed: "kms-ai-local-engine",
        error: error.message,
      });
    }
  });

  // School Partner & Customer Enquiry API
  app.post("/api/enquiry", (req, res) => {
    const { type, name, email, phone, details, schoolName, coordinatorName, message, city, studentCount } = req.body;
    const newEnquiry = {
      id: "ENQ-" + Math.floor(100000 + Math.random() * 900000),
      type: type || (schoolName ? "school_partnership" : "general_contact"),
      name: coordinatorName || name || schoolName || "Anonymous Inquiry",
      email: email || "",
      phone: phone || "",
      details: {
        schoolName,
        coordinatorName,
        city,
        studentCount,
        message,
        ...(details || {}),
      },
      createdAt: new Date().toISOString(),
    };
    enquiriesList.push(newEnquiry);
    res.json({
      success: true,
      enquiryId: newEnquiry.id,
      message: "Thank you! The KITE ROBOTICS Academic & Innovation Team will reach out to you within 24 hours.",
    });
  });

  // Get enquiries for admin preview
  app.get("/api/enquiries", (_req, res) => {
    res.json(enquiriesList);
  });

  // ==========================================
  // AUTHENTICATION & USER PROFILE BACKEND APIS
  // ==========================================

  // 1. Get Pre-configured Demo Accounts for Instant Testing
  app.get("/api/auth/demo-accounts", (_req, res) => {
    const list = Array.from(usersDb.values()).map((u) => ({
      name: u.name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      institution: u.institution,
      grade: u.grade,
      avatar: u.avatar,
      demoPassword: u.passwordHash,
    }));
    res.json({ success: true, accounts: list });
  });

  // 2. Create Account (Register)
  app.post("/api/auth/register", (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        password,
        role,
        institution,
        grade,
        city,
      } = req.body;

      if (!name || (!email && !phone)) {
        return res.status(400).json({
          success: false,
          error: "Full name and email or phone number are required.",
        });
      }

      if (password && password.length < 6) {
        return res.status(400).json({
          success: false,
          error: "Password must be at least 6 characters long.",
        });
      }

      // Check existing user
      if (email && findUserByIdentifier(email)) {
        return res.status(409).json({
          success: false,
          error: "An account with this email address already exists. Please log in.",
        });
      }

      if (phone && findUserByIdentifier(phone)) {
        return res.status(409).json({
          success: false,
          error: "An account with this mobile number already exists. Please log in.",
        });
      }

      const userId = "usr_" + Math.random().toString(36).substring(2, 10);
      const userKey = (email || `${phone.replace(/[^0-9]/g, '')}@kiterobotics.user`).toLowerCase();

      const newUser: UserRecord = {
        id: userId,
        name: name.trim(),
        email: email ? email.trim() : `${phone.replace(/[^0-9]/g, '')}@kiterobotics.user`,
        phone: phone ? phone.trim() : "",
        passwordHash: password || "kite123",
        role: role || "student",
        institution: institution || (role === "school" ? "ATL Innovation School" : "STEM Institute"),
        grade: grade || (role === "student" ? "Standard STEM Learner" : "Instructor"),
        city: city || "India",
        enrolledCoursesCount: 1,
        completedProjectsCount: 0,
        certificatesCount: 0,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      usersDb.set(userKey, newUser);

      // Generate session token
      const token = `kite_sess_${userId}_${Date.now()}`;
      sessionTokens.set(token, userId);

      res.status(201).json({
        success: true,
        message: `Welcome to KITE ROBOTICS, ${newUser.name}! Your account has been created.`,
        token,
        user: sanitizeUser(newUser),
      });
    } catch (err: any) {
      console.error("Registration error:", err);
      res.status(500).json({ success: false, error: "Internal server error creating account." });
    }
  });

  // 3. Login with Credentials or OTP
  app.post("/api/auth/login", (req, res) => {
    try {
      const { identifier, password, phone, otp } = req.body;

      // OTP Verification Login
      if (phone && otp) {
        const stored = otpStore.get(phone.trim());
        const isMasterOtp = otp.trim() === "582419";
        const isValidStoredOtp = stored && stored.code === otp.trim() && stored.expiresAt > Date.now();

        if (!isMasterOtp && !isValidStoredOtp) {
          return res.status(401).json({
            success: false,
            error: "Invalid or expired OTP. Please use code 582419 or request a new code.",
          });
        }

        let user = findUserByIdentifier(phone);
        if (!user) {
          // Auto create account for OTP verified phone
          const userId = "usr_" + Math.random().toString(36).substring(2, 10);
          user = {
            id: userId,
            name: `Robotics Explorer (${phone.slice(-4)})`,
            email: `${phone.replace(/[^0-9]/g, '')}@kiterobotics.user`,
            phone: phone.trim(),
            passwordHash: "kite123",
            role: "student",
            institution: "KITE Innovation Club",
            grade: "STEM Maker",
            city: "India",
            enrolledCoursesCount: 1,
            completedProjectsCount: 1,
            certificatesCount: 0,
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
          };
          usersDb.set(user.email.toLowerCase(), user);
        } else {
          user.lastLoginAt = new Date().toISOString();
        }

        const token = `kite_sess_${user.id}_${Date.now()}`;
        sessionTokens.set(token, user.id);

        return res.json({
          success: true,
          message: `Logged in successfully as ${user.name}`,
          token,
          user: sanitizeUser(user),
        });
      }

      // Password Login
      if (!identifier || !password) {
        return res.status(400).json({
          success: false,
          error: "Email or phone and password are required.",
        });
      }

      const user = findUserByIdentifier(identifier);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: "No account found with this email or phone. Please create an account.",
        });
      }

      // Check password (allows standard test password kite123 or match)
      if (user.passwordHash !== password && password !== "kite123") {
        return res.status(401).json({
          success: false,
          error: "Incorrect password. Default test password is 'kite123'.",
        });
      }

      user.lastLoginAt = new Date().toISOString();
      const token = `kite_sess_${user.id}_${Date.now()}`;
      sessionTokens.set(token, user.id);

      res.json({
        success: true,
        message: `Welcome back, ${user.name}!`,
        token,
        user: sanitizeUser(user),
      });
    } catch (err: any) {
      console.error("Login error:", err);
      res.status(500).json({ success: false, error: "Internal server error during login." });
    }
  });

  // 4. Send OTP (Phone or Email)
  app.post("/api/auth/send-otp", (req, res) => {
    const { identifier } = req.body;
    if (!identifier) {
      return res.status(400).json({ success: false, error: "Identifier (phone or email) is required." });
    }

    const clean = identifier.trim();
    // Default 582419 for instantaneous automated testing
    const code = "582419";
    otpStore.set(clean, {
      code,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

    res.json({
      success: true,
      message: `A 6-digit OTP has been sent to ${clean}. (Demo Code: 582419)`,
      demoOtp: "582419",
    });
  });

  // 5. Verify OTP
  app.post("/api/auth/verify-otp", (req, res) => {
    const { identifier, code } = req.body;
    if (!identifier || !code) {
      return res.status(400).json({ success: false, error: "Identifier and OTP code are required." });
    }

    const clean = identifier.trim();
    const stored = otpStore.get(clean);
    const isMasterOtp = code.trim() === "582419";
    const isValid = isMasterOtp || (stored && stored.code === code.trim() && stored.expiresAt > Date.now());

    if (!isValid) {
      return res.status(400).json({ success: false, error: "Invalid or expired OTP code." });
    }

    let user = findUserByIdentifier(clean);
    if (!user) {
      return res.json({
        success: true,
        verified: true,
        needsRegistration: true,
        message: "Phone verified! Please complete your name and role to register.",
      });
    }

    user.lastLoginAt = new Date().toISOString();
    const token = `kite_sess_${user.id}_${Date.now()}`;
    sessionTokens.set(token, user.id);

    res.json({
      success: true,
      verified: true,
      token,
      user: sanitizeUser(user),
    });
  });

  // 6. Current User Session Check
  app.get("/api/auth/me", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, error: "Not authenticated" });
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const userId = sessionTokens.get(token);
    if (!userId) {
      // Return default first user for graceful demo fallback if token expired
      const defaultUser = usersDb.get("aarav@kiterobotics.in")!;
      return res.json({ success: true, user: sanitizeUser(defaultUser) });
    }

    const user = Array.from(usersDb.values()).find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User session expired." });
    }

    res.json({ success: true, user: sanitizeUser(user) });
  });

  // 7. Update User Profile
  app.put("/api/auth/profile", (req, res) => {
    try {
      const {
        id,
        name,
        email,
        phone,
        role,
        institution,
        grade,
        city,
        bio,
        avatar,
      } = req.body;

      // Find user by ID or by email
      let user = Array.from(usersDb.values()).find((u) => u.id === id);
      if (!user && email) {
        user = findUserByIdentifier(email);
      }

      if (!user) {
        // Create user record if updating fresh
        const newId = id || "usr_" + Math.random().toString(36).substring(2, 10);
        user = {
          id: newId,
          name: name || "Robotics Innovator",
          email: email || "innovator@kiterobotics.in",
          phone: phone || "+91 95648 66985",
          passwordHash: "kite123",
          role: role || "student",
          institution: institution || "Delhi STEM Hub",
          grade: grade || "Level 1",
          city: city || "India",
          bio: bio || "",
          avatar,
          enrolledCoursesCount: 2,
          completedProjectsCount: 1,
          certificatesCount: 1,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        };
        usersDb.set(user.email.toLowerCase(), user);
      } else {
        if (name !== undefined) user.name = name.trim();
        if (role !== undefined) user.role = role;
        if (institution !== undefined) user.institution = institution.trim();
        if (grade !== undefined) user.grade = grade.trim();
        if (city !== undefined) user.city = city.trim();
        if (bio !== undefined) user.bio = bio.trim();
        if (phone !== undefined) user.phone = phone.trim();
        if (avatar !== undefined) user.avatar = avatar;
      }

      res.json({
        success: true,
        message: "Profile updated successfully.",
        user: sanitizeUser(user),
      });
    } catch (err: any) {
      console.error("Profile update error:", err);
      res.status(500).json({ success: false, error: "Failed to update profile." });
    }
  });

  // 8. Logout
  app.post("/api/auth/logout", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "").trim();
      sessionTokens.delete(token);
    }
    res.json({ success: true, message: "Logged out safely." });
  });

  // Vite middleware in dev mode vs static serving in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`KITE ROBOTICS server running on http://0.0.0.0:${PORT}`);
  });
}

function generateIntelligentFallbackResponse(query: string, _topic?: string): string {
  const lower = (query || "").toLowerCase();

  if (lower.includes("ultrasonic") || lower.includes("hc-sr04") || lower.includes("not detecting")) {
    return `### Troubleshooting HC-SR04 Ultrasonic Sensor with Arduino

Here is the step-by-step diagnostic checklist from the **KITE ROBOTICS Laboratory**:

#### 1. Pin Connections Check
* **VCC**: Connect to Arduino **5V** (Ensure it is getting a full 5V, not 3.3V, as HC-SR04 requires 5V logic).
* **GND**: Connect to Arduino **GND** (Crucial: verify common ground if using external power).
* **Trig**: Connect to Digital Pin (e.g., Pin 9).
* **Echo**: Connect to Digital Pin (e.g., Pin 10).

#### 2. Tested Diagnostic Code
\`\`\`cpp
const int trigPin = 9;
const int echoPin = 10;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.println("KMS-AI: HC-SR04 Test Initialized");
}

void loop() {
  // Clear trigger
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  
  // Send 10us trigger pulse
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Measure echo pulse width (timeout 30000us = ~5 meters)
  long duration = pulseIn(echoPin, HIGH, 30000);
  
  if (duration == 0) {
    Serial.println("Warning: Echo timed out! Check wiring or object angle.");
  } else {
    float distanceCm = duration * 0.034 / 2;
    Serial.print("Distance: ");
    Serial.print(distanceCm);
    Serial.println(" cm");
  }
  delay(100);
}
\`\`\`

#### 3. Common Hardware Pitfalls
* **Target Surface Angle**: Soft fabric or angled surfaces scatter ultrasound waves away from the receiver. Test against a flat cardboard or wall first.
* **Loose Jumper Wires**: Jumper wires frequently develop micro-breaks inside the crimp collar. Swap the 4 jumper wires.
* **Check Baud Rate**: Confirm your Arduino IDE Serial Monitor is set to **9600 baud**.`;
  }

  if (lower.includes("l298n") || lower.includes("motor") || lower.includes("rover") || lower.includes("wheel")) {
    return `### Motor Driver Troubleshooting (L298N / Dual H-Bridge)

When your robotics rover or DC motors fail to spin:

1. **Dual Power Source Rule**: Never power DC motors directly from Arduino's 5V pin! Connect a 7.4V (2S Li-ion) or 11.1V (3S Li-ion) battery pack to the L298N **12V** terminal.
2. **Common Ground (MANDATORY)**: Always connect the **GND** pin of your battery pack, the L298N GND terminal, and the Arduino GND pin together. Without common ground, digital signals cannot trigger the transistors.
3. **5V Enable Jumper**: Keep the 5V regulator jumper cap plugged into the L298N if your battery is under 12V.
4. **ENA / ENB Jumpers**: If you are not using PWM speed control, keep the jumper caps ON ENA and ENB to supply constant HIGH. If using PWM, remove the jumpers and connect ENA/ENB to Arduino PWM pins (~3, ~5, ~6, ~9, ~10, or ~11).`;
  }

  if (lower.includes("esp32") || lower.includes("wifi") || lower.includes("iot")) {
    return `### ESP32 IoT & WiFi Quick Setup Guide

For building IoT projects at **KITE ROBOTICS**:

\`\`\`cpp
#include <WiFi.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\\nWiFi Connected Successfully!");
    Serial.print("ESP32 IP Address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\\nConnection Failed! Check 2.4GHz network requirement.");
  }
}

void loop() {
  // Your IoT sensor reading and cloud transmission loop
}
\`\`\`

**Pro-Tip**: ESP32 works strictly on **2.4 GHz WiFi networks**. Most 5 GHz-only routers will not be recognized.`;
  }

  return `### KMS-AI Engineering Response

Welcome to **KITE ROBOTICS** technical intelligence. Here are the core principles for your query:

1. **Hardware Verification**: Verify logic level compatibility (3.3V vs 5V logic).
2. **Power Distribution**: Ensure current capacity matches motor/sensor peak draw. Always use decouple capacitors (100uF + 0.1uF ceramic) near power inputs.
3. **Firmware Diagnostics**: Use verbose \`Serial.println()\` statements at each milestone in your \`setup()\` and \`loop()\` to pinpoint code execution freezes.
4. **Hands-On Mentor Tip**: Try breaking the system down into isolated sub-circuits (test sensor alone, test motor alone, then combine).

Ask me for exact schematics, C++ Arduino sketches, ESP32 web servers, OpenCV Python scripts, or project wiring charts!`;
}

startServer();
