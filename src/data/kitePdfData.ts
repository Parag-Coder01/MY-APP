export interface PdfComponentItem {
  id: string;
  name: string;
  category: string;
  description: string;
  iconType: string;
  accentColor: string;
  page: number;
}

export interface PdfCategorySection {
  id: string;
  title: string;
  subtitle: string;
  page: number;
  part?: string;
  badgeColor: string;
  items: PdfComponentItem[];
}

export const KITE_PDF_CATALOG: PdfCategorySection[] = [
  {
    id: 'basic-components',
    title: 'Basic Electronic Components',
    subtitle: 'Fundamental passives, switching, and building blocks of robotics circuits',
    page: 2,
    part: 'Part 1 of 2',
    badgeColor: 'border-amber-500/50 bg-amber-950/60 text-amber-300',
    items: [
      { id: 'resistor', name: 'Resistor', category: 'Passives', description: 'Restricts electric current flow and divides voltage in circuits.', iconType: 'resistor', accentColor: '#F59E0B', page: 2 },
      { id: 'capacitor', name: 'Capacitor', category: 'Passives', description: 'Stores electrical energy electrostatically and smooths power ripples.', iconType: 'capacitor', accentColor: '#3B82F6', page: 2 },
      { id: 'led', name: 'LED (Light Emitting Diode)', category: 'Optoelectronics', description: 'Emits light when electrical current passes through it in forward bias.', iconType: 'led', accentColor: '#EF4444', page: 2 },
      { id: 'diode', name: 'Diode', category: 'Semiconductor', description: 'Allows current to flow in one direction only, preventing reverse polarity damage.', iconType: 'diode', accentColor: '#6B7280', page: 2 },
      { id: 'breadboard', name: 'Breadboard', category: 'Prototyping', description: 'Solderless construction base for rapid prototyping of electronics.', iconType: 'breadboard', accentColor: '#E2E8F0', page: 2 },
      { id: 'push-button', name: 'Push Button', category: 'Electromechanical', description: 'Momentary switch to trigger events, inputs, or reset functions.', iconType: 'switch', accentColor: '#3B82F6', page: 2 },
      { id: 'jumper-wires', name: 'Jumper Wires', category: 'Wiring', description: 'Flexible connector wires with male/female pins for breadboards and headers.', iconType: 'wires', accentColor: '#10B981', page: 2 },
      { id: 'potentiometer', name: 'Potentiometer (POT)', category: 'Control', description: 'Three-terminal resistor with a rotating contact for tuning voltage/signals.', iconType: 'potentiometer', accentColor: '#D97706', page: 2 },
      { id: 'relay', name: 'Relay Module', category: 'Switching', description: 'Electrically operated switch to control high-power AC/DC loads with low voltage.', iconType: 'relay', accentColor: '#2563EB', page: 2 },
      { id: 'buzzer', name: 'Piezo Buzzer', category: 'Acoustics', description: 'Audio signaling device that produces tones, beeps, and audio alarms.', iconType: 'buzzer', accentColor: '#1E293B', page: 2 },
      { id: 'transistor-bc547', name: 'Transistor (BC547)', category: 'Semiconductor', description: 'Used for switching and amplifying electronic signals in circuits.', iconType: 'transistor', accentColor: '#10B981', page: 2 },
      { id: 'integrated-circuit', name: 'Integrated Circuit (IC)', category: 'Semiconductor', description: 'Performs complex functions like processing, timing, memory, and control.', iconType: 'chip', accentColor: '#6366F1', page: 2 },
      { id: 'lm7805', name: 'Voltage Regulator (LM7805)', category: 'Power', description: 'Provides a stable 5V output for powering microcontrollers and ICs.', iconType: 'regulator', accentColor: '#475569', page: 2 },
      { id: 'ceramic-cap', name: 'Ceramic Capacitor', category: 'Passives', description: 'Used for filtering, bypassing, and high-frequency timing applications.', iconType: 'capacitor', accentColor: '#EA580C', page: 2 },
      { id: 'electrolytic-cap', name: 'Electrolytic Capacitor', category: 'Passives', description: 'Stores larger charge and is used in filtering and power supply smoothing.', iconType: 'capacitor', accentColor: '#0284C7', page: 2 },
      { id: 'crystal-oscillator', name: 'Crystal Oscillator (16MHz)', category: 'Timing', description: 'Provides precise frequency reference for clock signals and processors.', iconType: 'crystal', accentColor: '#94A3B8', page: 2 },
      { id: 'inductor', name: 'Inductor', category: 'Passives', description: 'Stores energy in magnetic field. Used in filters, buck converters, and power circuits.', iconType: 'inductor', accentColor: '#059669', page: 2 },
      { id: 'pot-trimmer', name: 'Variable Resistor (Trimmer)', category: 'Control', description: 'Allows fine precision adjustment of resistance directly on PCB circuits.', iconType: 'potentiometer', accentColor: '#3B82F6', page: 2 },
      { id: 'ldr', name: 'Photoresistor (LDR)', category: 'Optoelectronics', description: 'Changes electrical resistance based on incident light intensity.', iconType: 'sensor', accentColor: '#F59E0B', page: 2 },
      { id: 'thermistor-ntc', name: 'Thermistor (NTC)', category: 'Sensors', description: 'Changes resistance with temperature. Used in temperature sensing and safety.', iconType: 'thermistor', accentColor: '#DC2626', page: 2 },
      { id: 'fuse', name: 'Protection Fuse', category: 'Safety', description: 'Protects circuits from overcurrent damage by safely breaking connection.', iconType: 'fuse', accentColor: '#94A3B8', page: 2 },
      { id: 'slide-switch', name: 'Slide Switch', category: 'Electromechanical', description: 'Used to turn ON/OFF or select between two circuits or power sources.', iconType: 'switch', accentColor: '#475569', page: 2 },
      { id: 'toggle-switch', name: 'Toggle Switch', category: 'Electromechanical', description: 'Robust mechanical lever switch used in heavy-duty control panels.', iconType: 'switch', accentColor: '#0284C7', page: 2 },
      { id: 'header-pins', name: 'Connector (Header Pins)', category: 'Interconnect', description: 'Provides clean connection points between boards, shields, and modules.', iconType: 'header', accentColor: '#64748B', page: 2 },
      { id: 'dc-jack', name: 'DC Power Jack', category: 'Power', description: 'Used to supply DC power to the circuit board from wall adapters or batteries.', iconType: 'power', accentColor: '#0F172A', page: 2 },
      { id: 'terminal-block', name: 'Screw Terminal Block', category: 'Interconnect', description: 'Allows easy, robust, and secure screw-locking connection of wires.', iconType: 'terminal', accentColor: '#16A34A', page: 2 },
      { id: 'pcb', name: 'Printed Circuit Board (PCB)', category: 'Fabrication', description: 'Mechanical support and electrical connection for components via etched copper.', iconType: 'pcb', accentColor: '#15803D', page: 2 },
    ]
  },
  {
    id: 'sensors-environmental',
    title: 'Sensors & Detection Modules (Part 1 & 2)',
    subtitle: 'Telemetry, environmental parameters, spatial orientation, and obstacle sensing',
    page: 3,
    part: 'Pages 3 & 4',
    badgeColor: 'border-cyan-500/50 bg-cyan-950/60 text-cyan-300',
    items: [
      { id: 'dht22', name: 'DHT22 Temperature & Humidity', category: 'Environmental', description: 'High-accuracy digital sensor for temperature and relative humidity monitoring.', iconType: 'sensor', accentColor: '#06B6D4', page: 3 },
      { id: 'bmp180', name: 'BMP180 Barometric Pressure', category: 'Environmental', description: 'Measures atmospheric barometric pressure and altitude calculation for UAVs.', iconType: 'sensor', accentColor: '#3B82F6', page: 3 },
      { id: 'bmp280', name: 'BMP280 Precision Pressure', category: 'Environmental', description: 'High-precision temperature, barometric pressure, and altitude telemetry.', iconType: 'sensor', accentColor: '#8B5CF6', page: 3 },
      { id: 'mq2', name: 'MQ-2 Flammable Gas Sensor', category: 'Gas & Chemical', description: 'Detects LPG, smoke, alcohol, propane, methane, and combustible gases.', iconType: 'sensor', accentColor: '#EA580C', page: 3 },
      { id: 'flame-sensor', name: 'Ultraviolet Flame Sensor', category: 'Safety', description: 'Detects presence of open fire or flame wavelength for fire-alert systems.', iconType: 'sensor', accentColor: '#EF4444', page: 3 },
      { id: 'rain-sensor', name: 'Rain Sensor Module', category: 'Weather', description: 'Detects raindrops or moisture on surface. Used in weather stations & wipers.', iconType: 'sensor', accentColor: '#0284C7', page: 3 },
      { id: 'water-level', name: 'Water Level Sensor', category: 'Telemetry', description: 'Detects water level depth for tanks, overflow alarms, and smart irrigation.', iconType: 'sensor', accentColor: '#0EA5E9', page: 3 },
      { id: 'mpu6050', name: 'MPU6050 Accelerometer + Gyro', category: 'Inertial', description: 'Measures 6-axis acceleration and angular velocity for balance and motion tracking.', iconType: 'imu', accentColor: '#3B82F6', page: 3 },
      { id: 'pir-motion', name: 'PIR Motion Sensor (HC-SR501)', category: 'Infrared', description: 'Detects human infrared body radiation for intrusion detection & automation.', iconType: 'sensor', accentColor: '#10B981', page: 3 },
      { id: 'tof-vl53l0x', name: 'TOF Distance Sensor (VL53L0X)', category: 'Optical Distance', description: 'Measures distance using laser time-of-flight technology with millimeter accuracy.', iconType: 'sensor', accentColor: '#EC4899', page: 3 },
      { id: 'lidar-a2m8', name: 'LiDAR Sensor (A2M8 360°)', category: 'Autonomous Laser', description: '360° laser scanning for SLAM mapping and autonomous robot navigation.', iconType: 'lidar', accentColor: '#6366F1', page: 3 },
      { id: 'rotary-encoder', name: 'Rotary Encoder', category: 'Feedback', description: 'Detects rotational position, direction, and speed for precise motor feedback.', iconType: 'encoder', accentColor: '#64748B', page: 3 },
      { id: 'hall-effect', name: 'Hall Effect Sensor (SS49E)', category: 'Magnetic', description: 'Detects magnetic field variations. Used for RPM speed and contactless positioning.', iconType: 'sensor', accentColor: '#065F46', page: 3 },
      { id: 'vibration-sw420', name: 'Vibration Sensor (SW-420)', category: 'Vibration', description: 'Senses mechanical vibrations and shaking for earthquake and anti-theft alarms.', iconType: 'sensor', accentColor: '#2563EB', page: 3 },
      { id: 'tilt-sensor', name: 'Tilt Sensor', category: 'Orientation', description: 'Detects inclination in any axis for rollover protection and safety interlocks.', iconType: 'sensor', accentColor: '#0284C7', page: 3 },
      { id: 'dht11', name: 'DHT11 Temperature & Humidity', category: 'Environmental', description: 'Cost-effective digital temperature and humidity sensor for basic STEM labs.', iconType: 'sensor', accentColor: '#3B82F6', page: 3 },
      { id: 'apds9960', name: 'Gesture Sensor (APDS-9960)', category: 'Optical AI', description: 'Detects hand gestures (up/down/left/right), proximity, and RGB ambient light.', iconType: 'sensor', accentColor: '#8B5CF6', page: 4 },
      { id: 'sharp-gp2y0a21yk', name: 'Sharp IR Obstacle Sensor', category: 'Distance', description: 'Analog distance measuring sensor for collision avoidance in rovers.', iconType: 'sensor', accentColor: '#1E293B', page: 4 },
      { id: 'fingerprint-r305', name: 'Fingerprint Sensor (R305)', category: 'Biometrics', description: 'Optical fingerprint scanner with onboard DSP matching for secure locks.', iconType: 'biometric', accentColor: '#10B981', page: 4 },
      { id: 'rc522-rfid', name: 'RFID Module (RC522 13.56MHz)', category: 'ID & Wireless', description: 'Reads RFID tags and smart cards for attendance logging and access control.', iconType: 'rfid', accentColor: '#2563EB', page: 4 },
      { id: 'wheel-encoder', name: 'Optical Wheel Encoder', category: 'Odometry', description: 'Counts wheel revolutions for robot odometry, speed, and distance calculations.', iconType: 'encoder', accentColor: '#475569', page: 4 },
      { id: 'fsr402', name: 'Force Sensor (FSR402)', category: 'Tactile', description: 'Detects applied force or pressure in robotic grippers and touch sensing.', iconType: 'sensor', accentColor: '#D97706', page: 4 },
      { id: 'tsop1738', name: 'IR Receiver (TSOP1738)', category: 'Wireless IR', description: 'Receives modulated 38kHz infrared commands from TV/robot remotes.', iconType: 'sensor', accentColor: '#1E293B', page: 4 },
      { id: 'hx711-loadcell', name: 'Load Cell + HX711 24-Bit ADC', category: 'Weight & Force', description: 'Weighs mass with gram-level precision for digital weighing scales.', iconType: 'weight', accentColor: '#059669', page: 4 },
      { id: 'mq135', name: 'MQ-135 Air Quality Sensor', category: 'Gas & Chemical', description: 'Detects hazardous gases including NH3, NOx, benzene, CO2, and smoke.', iconType: 'sensor', accentColor: '#B45309', page: 4 },
      { id: 'mpu9250', name: 'MPU9250 9-Axis IMU', category: 'Inertial Navigation', description: '9-DOF sensor with accelerometer, gyro, and compass for drone AHRS navigation.', iconType: 'imu', accentColor: '#3B82F6', page: 4 },
      { id: 'hmc5883l', name: 'Compass / Magnetometer', category: 'Heading', description: 'Electronic 3-axis magnetometer for robot compass heading orientation.', iconType: 'compass', accentColor: '#1D4ED8', page: 4 },
    ]
  },
  {
    id: 'motors-actuators',
    title: 'Motors, Servos & Actuators',
    subtitle: 'Kinematic propulsion, high-torque servos, stepper motors, and precision linear motion',
    page: 5,
    part: 'Pages 5 & 6',
    badgeColor: 'border-emerald-500/50 bg-emerald-950/60 text-emerald-300',
    items: [
      { id: 'continuous-servo', name: 'Continuous Rotation Servo', category: 'Servos', description: 'Modified servo that rotates continuously 360° in both directions for wheels.', iconType: 'servo', accentColor: '#8B5CF6', page: 5 },
      { id: 'metal-gear-servo', name: 'Metal Gear Servo', category: 'Servos', description: 'Durable brass/metal gears for higher torque, shock resistance, and longevity.', iconType: 'servo', accentColor: '#F59E0B', page: 5 },
      { id: 'sg90', name: 'Micro Servo SG90 (9g)', category: 'Servos', description: 'Ultra-lightweight 9g servo for small grippers, pan-tilt heads, and RC aircraft.', iconType: 'servo', accentColor: '#0284C7', page: 5 },
      { id: 'mg996r', name: 'High Torque Servo MG996R', category: 'Servos', description: 'Delivers 13kg-cm torque with metal gears for heavy robot arms and biped walkers.', iconType: 'servo', accentColor: '#475569', page: 5 },
      { id: 'nema17', name: 'Stepper Motor NEMA 17', category: 'Steppers', description: 'Precise 1.8° step angle motor for 3D printers, CNC routers, and laser cutters.', iconType: 'motor', accentColor: '#94A3B8', page: 5 },
      { id: 'nema23', name: 'Stepper Motor NEMA 23', category: 'Steppers', description: 'Heavy-duty industrial stepper for high-torque robotic axes and CNC machines.', iconType: 'motor', accentColor: '#334155', page: 5 },
      { id: 'worm-gear-motor', name: 'Worm Gear DC Motor', category: 'Geared Motors', description: 'Provides immense holding torque and automatic self-locking for lifts & conveyors.', iconType: 'motor', accentColor: '#CA8A04', page: 5 },
      { id: 'vibration-motor', name: 'Vibration Motor', category: 'Haptics', description: 'Produces eccentric mass haptic feedback for wearables, remotes, and indicators.', iconType: 'motor', accentColor: '#DC2626', page: 5 },
      { id: 'n20-motor', name: 'N20 Micro Metal Gear Motor', category: 'Micro Motors', description: 'Compact miniature DC motor with metal gearbox for micro-sumo and rovers.', iconType: 'motor', accentColor: '#EAB308', page: 5 },
      { id: 'bo-motor', name: 'BO Gear Motor (Yellow)', category: 'Classroom', description: 'Economical dual-shaft gear motor standard for classroom 2WD/4WD rovers.', iconType: 'motor', accentColor: '#FACC15', page: 5 },
      { id: 'planetary-motor', name: 'Planetary Gear Motor', category: 'Precision Motors', description: 'High torque density and co-axial efficiency for precision AGVs and robotics.', iconType: 'motor', accentColor: '#64748B', page: 5 },
      { id: 'high-torque-dc', name: 'High Torque DC Gear Motor', category: 'Geared Motors', description: 'High torque at lower RPM for heavy industrial mobile platforms.', iconType: 'motor', accentColor: '#475569', page: 5 },
      { id: 'bldc-motor', name: 'Brushless DC Motor (BLDC)', category: 'High-RPM UAV', description: 'High efficiency outrunner motor electronically commutated for drones & RC.', iconType: 'motor', accentColor: '#EA580C', page: 5 },
      { id: 'linear-actuator', name: 'Linear Actuator', category: 'Actuators', description: 'Converts rotary motor motion into powerful linear push/pull extension.', iconType: 'actuator', accentColor: '#0F172A', page: 5 },
      { id: 'solenoid', name: 'Electromagnetic Solenoid', category: 'Actuators', description: 'Electromagnetic push-pull actuator providing rapid linear stroke motion.', iconType: 'actuator', accentColor: '#6B7280', page: 5 },
      { id: 'electromagnetic-lock', name: 'Electromagnetic Door Lock', category: 'Access Control', description: 'Solenoid bolt lock for biometric access gates and cabinet security.', iconType: 'lock', accentColor: '#374151', page: 5 },
      { id: 'mini-pump', name: 'Mini Water / Air Pump Motor', category: 'Fluidic', description: 'Submersible miniature pump for automated plant watering and fluid handling.', iconType: 'pump', accentColor: '#0EA5E9', page: 6 },
      { id: 'robotic-gripper', name: 'Robotic Mechanical Gripper', category: 'End-Effectors', description: 'Servo-actuated dual-claw gripper to grab, hold, and sort physical objects.', iconType: 'gripper', accentColor: '#1E293B', page: 6 },
      { id: 'arm-joint-actuator', name: 'Articulated Arm Joint Actuator', category: 'Kinematics', description: 'Heavy-duty pivot actuator designed for multi-axis robotic arm shoulder/elbows.', iconType: 'actuator', accentColor: '#334155', page: 6 },
      { id: 'geared-dc-motor', name: 'Geared DC Motor', category: 'DC Motors', description: 'Standard high-reliability DC drive motor with metal gearbox.', iconType: 'motor', accentColor: '#64748B', page: 6 },
    ]
  },
  {
    id: 'motor-drivers-power',
    title: 'Motor Drivers & Power Electronics',
    subtitle: 'H-Bridges, stepper controllers, ESCs, BMS, and buck/boost switching regulators',
    page: 6,
    part: 'Pages 6 & 7',
    badgeColor: 'border-purple-500/50 bg-purple-950/60 text-purple-300',
    items: [
      { id: 'l298n', name: 'L298N Dual H-Bridge Driver', category: 'Motor Drivers', description: 'Dual H-Bridge driver with heavy heat sink; drives 2 DC motors or 1 stepper.', iconType: 'driver', accentColor: '#DC2626', page: 6 },
      { id: 'l293d', name: 'L293D Quad Half-H Driver IC', category: 'Motor Drivers', description: 'Compact DIP driver IC to control two bidirectional DC motors up to 600mA.', iconType: 'driver', accentColor: '#16A34A', page: 6 },
      { id: 'tb6612fng', name: 'TB6612FNG High-Efficiency Driver', category: 'Motor Drivers', description: 'MOSFET H-bridge driver delivering high efficiency with minimal heat.', iconType: 'driver', accentColor: '#059669', page: 6 },
      { id: 'bts7960', name: 'BTS7960 43A High-Power Driver', category: 'High-Power', description: 'Heavy current motor driver handling up to 43A for electric combat bots.', iconType: 'driver', accentColor: '#1E3A8A', page: 6 },
      { id: 'a4988', name: 'A4988 Microstepping Stepper Driver', category: 'Stepper Drivers', description: 'Microstepping driver with translator for NEMA 17 steppers in 3D printers.', iconType: 'driver', accentColor: '#10B981', page: 6 },
      { id: 'drv8825', name: 'DRV8825 Advanced Stepper Driver', category: 'Stepper Drivers', description: 'Offers 1/32 microstepping for quieter, smoother stepper movement.', iconType: 'driver', accentColor: '#7C3AED', page: 6 },
      { id: 'esc-30a', name: 'ESC 30A (Electronic Speed Controller)', category: 'UAV ESC', description: 'SimonK/BLHeli controller modulating brushless DC motor speeds in drones.', iconType: 'esc', accentColor: '#E11D48', page: 6 },
      { id: 'mosfet-module', name: 'High-Power MOSFET Switch Module', category: 'Power Switching', description: 'Fast electronic switch controlling high-voltage high-current DC loads.', iconType: 'mosfet', accentColor: '#1E293B', page: 6 },
      { id: 'ssr', name: 'Solid State Relay (SSR)', category: 'Power Switching', description: 'No moving parts, optically isolated high-voltage AC switching with zero noise.', iconType: 'relay', accentColor: '#475569', page: 7 },
      { id: 'buck-converter', name: 'LM2596 DC Step-Down Buck Converter', category: 'Power Supply', description: 'Efficiently steps down high input voltages (e.g. 12V/24V) to stable 5V or 3.3V.', iconType: 'power', accentColor: '#2563EB', page: 7 },
      { id: 'boost-converter', name: 'DC Step-Up Boost Converter', category: 'Power Supply', description: 'Steps up lower battery voltages (e.g. 3.7V) to higher regulated outputs.', iconType: 'power', accentColor: '#D97706', page: 7 },
      { id: 'buck-boost', name: 'Automatic Buck-Boost Converter', category: 'Power Supply', description: 'Regulates stable output regardless of whether input is higher or lower.', iconType: 'power', accentColor: '#DC2626', page: 7 },
      { id: 'bms-board', name: 'Battery Management System (BMS)', category: 'Battery Safety', description: 'Protects Li-ion cells against overcharge, overdischarge, and short circuits.', iconType: 'bms', accentColor: '#15803D', page: 7 },
      { id: 'power-dist-board', name: 'Drone Power Distribution Board (PDB)', category: 'UAV Power', description: 'Cleanly routes high-current LiPo power to 4-8 ESCs and flight electronics.', iconType: 'power', accentColor: '#111827', page: 7 },
      { id: 'dc-dc-module', name: 'Mini DC-DC Power Regulator Module', category: 'Power Supply', description: 'Ultra-compact power module with preset 3.3V, 5V, 9V, or 12V fixed outputs.', iconType: 'power', accentColor: '#059669', page: 7 },
      { id: 'ac-dc-module', name: 'Isolated AC-DC Power Supply Module', category: 'Mains Power', description: 'Converts 220V AC household mains into isolated, regulated DC output safely.', iconType: 'power', accentColor: '#374151', page: 7 },
    ]
  },
  {
    id: 'microcontrollers',
    title: 'Microcontrollers & Compute Boards',
    subtitle: 'From ATmega328P to ESP32 dual-core IoT, Raspberry Pi single-board computers & ARM Cortex',
    page: 7,
    part: 'Page 7',
    badgeColor: 'border-blue-500/50 bg-blue-950/60 text-blue-300',
    items: [
      { id: 'arduino-nano', name: 'Arduino Nano V3 (ATmega328P)', category: '8-Bit Micro', description: 'Compact breadboard-friendly microcontroller board with Mini/Type-C USB.', iconType: 'mcu', accentColor: '#00979D', page: 7 },
      { id: 'arduino-mega', name: 'Arduino Mega 2560', category: '8-Bit Micro', description: 'Massive I/O board with 54 digital pins, 16 analog inputs, and 4 UART ports.', iconType: 'mcu', accentColor: '#008184', page: 7 },
      { id: 'arduino-pro-mini', name: 'Arduino Pro Mini (3.3V/5V)', category: '8-Bit Micro', description: 'Ultra-thin, low-power board with no USB interface for permanent embedded builds.', iconType: 'mcu', accentColor: '#0284C7', page: 7 },
      { id: 'esp32-mcu', name: 'ESP32 Dual-Core WiFi + BLE', category: '32-Bit IoT', description: 'High-speed 240MHz dual-core processor with integrated 2.4GHz WiFi & Bluetooth.', iconType: 'mcu', accentColor: '#10B981', page: 7 },
      { id: 'esp8266-nodemcu', name: 'NodeMCU ESP8266 WiFi Board', category: 'IoT', description: 'Cost-effective WiFi-enabled microcontroller board for quick cloud IoT prototypes.', iconType: 'mcu', accentColor: '#2563EB', page: 7 },
      { id: 'rpi-pico', name: 'Raspberry Pi Pico (RP2040)', category: 'Dual-Core ARM', description: 'High-performance RP2040 silicon with programmable I/O (PIO) and MicroPython.', iconType: 'mcu', accentColor: '#C51A4A', page: 7 },
      { id: 'stm32-bluepill', name: 'STM32 ARM Cortex-M3 (Blue Pill)', category: 'ARM Cortex', description: '32-bit ARM Cortex-M3 microcontroller for high-speed industrial calculations.', iconType: 'mcu', accentColor: '#002B49', page: 7 },
      { id: 'microbit', name: 'BBC micro:bit V2', category: 'STEM Classroom', description: 'Educational pocket computer with LED matrix, buttons, compass & radio.', iconType: 'mcu', accentColor: '#00A3E0', page: 7 },
      { id: 'raspberry-pi-sbc', name: 'Raspberry Pi 4 / 5 SBC', category: 'Single Board Computer', description: 'Full Linux micro-computer with Quad-core CPU, HDMI, and USB 3.0 for Computer Vision.', iconType: 'sbc', accentColor: '#C51A4A', page: 7 },
      { id: 'teensy', name: 'Teensy High-Speed Board', category: 'High-Performance', description: 'ARM Cortex microcontroller board renowned for ultra-fast audio and robotics.', iconType: 'mcu', accentColor: '#10B981', page: 7 },
      { id: 'arduino-leonardo', name: 'Arduino Leonardo (ATmega32u4)', category: 'USB Native', description: 'Features native USB communication; can emulate a mouse, keyboard, or HID.', iconType: 'mcu', accentColor: '#00979D', page: 7 },
      { id: 'arduino-due', name: 'Arduino Due (ARM Cortex-M3)', category: '32-Bit ARM', description: 'Powerful 84MHz 32-bit ARM processor with 54 digital pins for industrial robotics.', iconType: 'mcu', accentColor: '#007A7E', page: 7 },
    ]
  },
  {
    id: 'displays-ui',
    title: 'Displays & User Interfaces',
    subtitle: 'Visual data feedback, LCD/OLED panels, touchscreens, keypads, and tactile inputs',
    page: 8,
    part: 'Page 8',
    badgeColor: 'border-yellow-500/50 bg-yellow-950/60 text-yellow-300',
    items: [
      { id: 'lcd-16x2', name: '16x2 Alphanumeric LCD Display', category: 'Displays', description: '16 characters by 2 rows with I2C backpack for clear text and parameter readouts.', iconType: 'display', accentColor: '#84CC16', page: 8 },
      { id: 'lcd-20x4', name: '20x4 Alphanumeric LCD Display', category: 'Displays', description: 'Large 4-line display showing telemetry, menus, and detailed system messages.', iconType: 'display', accentColor: '#10B981', page: 8 },
      { id: 'oled-096', name: '0.96" I2C OLED Display (128x64)', category: 'Displays', description: 'High-contrast graphic OLED screen with wide viewing angles and low power.', iconType: 'display', accentColor: '#38BDF8', page: 8 },
      { id: 'seven-seg', name: '4-Digit 7-Segment Display (TM1637)', category: 'Numeric', description: 'Bright digital LED numeric display for timers, stopwatches, and digital clocks.', iconType: 'display', accentColor: '#EF4444', page: 8 },
      { id: 'tft-display', name: 'Full-Color SPI TFT Display', category: 'Graphic Color', description: 'Rich full-color graphics screen for UI dashboards, icons, and real-time graphs.', iconType: 'display', accentColor: '#3B82F6', page: 8 },
      { id: 'touch-screen', name: 'Touchscreen Interactive Display', category: 'HMI', description: 'Touchscreen GUI module allowing interactive button controls for smart systems.', iconType: 'display', accentColor: '#6366F1', page: 8 },
      { id: 'matrix-keypad', name: '4x4 Matrix Membrane Keypad', category: 'Input', description: '16-button hexadecimal keypad for numeric PIN entry, security codes, and inputs.', iconType: 'keypad', accentColor: '#1E293B', page: 8 },
      { id: 'analog-joystick', name: 'Dual-Axis Analog Joystick Module', category: 'Input', description: 'Spring-return 2-axis potentiometers with integrated push switch for gimbal/rover.', iconType: 'joystick', accentColor: '#475569', page: 8 },
      { id: 'rotary-encoder-mod', name: 'Digital Rotary Encoder Module', category: 'Input', description: 'Infinite dial rotation with push click for smooth digital menu navigation.', iconType: 'encoder', accentColor: '#0D9488', page: 8 },
      { id: 'push-matrix', name: 'Push Button Keyboard Matrix', category: 'Input', description: 'Saves microcontroller I/O pins by multiplexing multiple tactile push buttons.', iconType: 'keypad', accentColor: '#15803D', page: 8 },
    ]
  },
  {
    id: 'mechanical-parts',
    title: 'Robotics Mechanical Components',
    subtitle: 'Chassis, brackets, omni wheels, continuous tracks, couplers, leadscrews & gear trains',
    page: 8,
    part: 'Pages 8 & 9',
    badgeColor: 'border-orange-500/50 bg-orange-950/60 text-orange-300',
    items: [
      { id: 'mech-arm', name: 'Articulated Robotic Arm Mechanism', category: 'Mechanisms', description: 'Multi-joint linkage assembly for pick-and-place industrial manufacturing simulations.', iconType: 'arm', accentColor: '#EC4899', page: 8 },
      { id: 'mech-gripper', name: 'Precision Gripper End-Effector', category: 'End-Effectors', description: 'Parallel jaw mechanism to firmly grasp varied shapes without slippage.', iconType: 'gripper', accentColor: '#1E293B', page: 8 },
      { id: 'servo-horn', name: 'Reinforced Metal/Nylon Servo Horns', category: 'Linkages', description: 'Connects servo output splines to push rods, linkages, and mechanical levers.', iconType: 'link', accentColor: '#0F172A', page: 8 },
      { id: 'motor-coupler', name: 'Flexible Motor Shaft Coupler', category: 'Transmission', description: 'Connects motor shaft to threaded lead screw or axle while absorbing misalignment.', iconType: 'coupler', accentColor: '#94A3B8', page: 8 },
      { id: 'shafts', name: 'Precision Steel D-Shafts & Rods', category: 'Transmission', description: 'Hardened linear shafts transmitting rotary motion with tight mechanical tolerances.', iconType: 'shaft', accentColor: '#CBD5E1', page: 8 },
      { id: 'ball-bearings', name: 'Flanged Miniature Ball Bearings', category: 'Motion', description: 'Reduces mechanical friction and supports smooth radial loads on rotating axles.', iconType: 'bearing', accentColor: '#64748B', page: 8 },
      { id: 'gear-set', name: 'Spur & Bevel Gear Transmission Set', category: 'Transmission', description: 'Assortment of engineered nylon/brass gears to alter speed ratios and torque.', iconType: 'gear', accentColor: '#D97706', page: 8 },
      { id: 'pulley', name: 'Timing Belt Pulley', category: 'Transmission', description: 'Toothed grooved pulley for anti-slip synchronous power transmission.', iconType: 'pulley', accentColor: '#94A3B8', page: 8 },
      { id: 'timing-belt', name: 'GT2 Toothed Timing Belt', category: 'Transmission', description: 'Fiberglass reinforced rubber timing belt ensuring zero slip in 3D printers and CNCs.', iconType: 'belt', accentColor: '#0F172A', page: 9 },
      { id: 'chain-drive', name: 'Roller Chain Drive & Sprocket', category: 'Heavy Transmission', description: 'High-strength chain drive for rugged combat bots and tracked vehicles.', iconType: 'chain', accentColor: '#475569', page: 9 },
      { id: 'universal-joint', name: 'Universal Joint (Cardan U-Joint)', category: 'Linkages', description: 'Transmits torque smoothly between non-aligned drive shafts at varied angles.', iconType: 'joint', accentColor: '#64748B', page: 9 },
      { id: 'bracket', name: 'Multi-Angle Servo / Motor Bracket', category: 'Structural', description: 'Heavy-gauge anodized aluminum structural brackets for modular robot frames.', iconType: 'bracket', accentColor: '#1E293B', page: 9 },
      { id: 'motor-mount', name: 'Motor Clamping Mount', category: 'Mounting', description: 'Securely fixes DC/stepper motors to robot chassis and dampens vibration.', iconType: 'mount', accentColor: '#334155', page: 9 },
      { id: 'servo-mount', name: 'Flush Servo Mounting Bracket', category: 'Mounting', description: 'Enables quick pan-tilt setup and articulated joint installation on chassis.', iconType: 'mount', accentColor: '#475569', page: 9 },
      { id: 'caster-ball', name: 'Omni-Directional Caster Ball', category: 'Mobility', description: 'Swiveling steel ball caster balancing 2WD and 3-wheeled differential rovers.', iconType: 'wheel', accentColor: '#CBD5E1', page: 9 },
      { id: 'omni-wheel', name: 'Omni Wheel (Multi-Directional)', category: 'Holonomic Wheels', description: 'Peripheral rollers allow the wheel to slide sideways while driving forward.', iconType: 'wheel', accentColor: '#0284C7', page: 9 },
      { id: 'mecanum-wheel', name: 'Mecanum Wheel (45° Rollers)', category: 'Holonomic Wheels', description: 'Angled rollers allow four-wheel vehicle to translate laterally in any direction.', iconType: 'wheel', accentColor: '#2563EB', page: 9 },
      { id: 'rubber-tracks', name: 'Continuous Rubber Tank Tracks', category: 'Off-Road', description: 'High-traction caterpillar tracks for rough terrain, stair climbers, and tank rovers.', iconType: 'track', accentColor: '#0F172A', page: 9 },
      { id: 'spacers-standoffs', name: 'Brass / Nylon Threaded Spacers', category: 'Fasteners', description: 'Creates clean vertical spacing and isolation between multi-tier acrylic/PCB decks.', iconType: 'standoff', accentColor: '#D97706', page: 9 },
      { id: 'screws-nuts', name: 'M3 Stainless Steel Screws & Locknuts', category: 'Hardware', description: 'Standard metric fastening hardware for building rigid educational robotic frames.', iconType: 'hardware', accentColor: '#94A3B8', page: 9 },
      { id: 'belt-tensioner', name: 'Adjustable Belt Tensioner', category: 'Precision', description: 'Maintains optimal tension on timing belts to eliminate backlash and tooth skips.', iconType: 'tensioner', accentColor: '#1E293B', page: 9 },
      { id: 'limit-switch', name: 'Micro Limit Switch with Lever', category: 'End-Stop', description: 'Physical collision / travel limit switch for automatic zero homing in CNC machines.', iconType: 'switch', accentColor: '#DC2626', page: 9 },
      { id: 'lead-screw', name: 'T8 Lead Screw & Brass Nut', category: 'Linear Motion', description: 'Precision threaded rod converting high-speed rotary motor power into linear lift.', iconType: 'leadscrew', accentColor: '#D97706', page: 9 },
      { id: 'linear-rail', name: 'MGN Linear Guide Rail & Carriage', category: 'Linear Motion', description: 'Provides smooth, high-rigidity linear travel with zero play for 3D printers & CNCs.', iconType: 'rail', accentColor: '#64748B', page: 9 },
      { id: 'cable-drag-chain', name: 'Flexible Cable Drag Chain (Energy Chain)', category: 'Cable Management', description: 'Guides, organizes, and protects moving cables from snagging and repetitive fatigue.', iconType: 'chain', accentColor: '#0F172A', page: 9 },
    ]
  }
];

export const PDF_SUMMARY = {
  title: 'KITE ROBOTICS: THE KITS AND COMPONENTS WE USE',
  tagline: 'INNOVATE TODAY. TRANSFORM TOMORROW. INSPIRE GENERATIONS.',
  subtagline: 'Empowering Minds. Building Futures. Through Robotics, STEM & AI.',
  pillars: [
    { title: 'INNOVATE', desc: 'Turning Ideas Into Reality.' },
    { title: 'EDUCATE', desc: 'Hands-On Learning. Future-Ready Skills.' },
    { title: 'EMPOWER', desc: 'Empowering Young Minds With Technology.' },
    { title: 'ELEVATE', desc: 'Building A Better Tomorrow.' },
  ],
  contact: {
    website: 'www.kiterobotics.in',
    email: 'gm.kiterobotics@gmail.com',
    phone: '9564866985',
  },
  totalComponents: 104,
  pageCount: 9,
};
