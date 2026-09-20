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

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "15mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      company: "KITE ROBOTICS",
      tagline: "Empowering Innovation with Robotics, AI & IoT",
      geminiConfigured: !!process.env.GEMINI_API_KEY,
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

  // Vite middleware in dev mode vs static serving in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
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
