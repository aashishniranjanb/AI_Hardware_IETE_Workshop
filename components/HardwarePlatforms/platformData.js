export const PLATFORM_STAGES = [
  {
    id: 0,
    tag: "START WITH ALU",
    eyebrow: "STAGE 01 / 12 • COMPUTATION READY",
    title: "WE HAVE THE COMPUTATION",
    caption: "ALU ENGINE COMPLETE → HOW DOES IT BECOME REAL SILICON?",
    narration: "Slide 10 concluded with an Arithmetic Logic Unit performing digital operations. Now, how does this circuit leave the screen and run on physical hardware?",
    takeaway: "HOW DO WE IMPLEMENT THIS IN SILICON?",
    callout: "COMPUTE ENGINE READY"
  },
  {
    id: 1,
    tag: "THREE PATHS",
    eyebrow: "STAGE 02 / 12 • THREE IMPLEMENTATIONS",
    title: "THREE WAYS TO BUILD IT",
    caption: "FPGA FABRIC VS EMBEDDED MCU VS EDGE TINYML",
    narration: "A single computational task can be realized as dedicated reconfigurable hardware (FPGA), embedded MCU firmware (Renesas V2), or low-power wireless edge AI (ESP32).",
    takeaway: "ONE COMPUTATION — THREE SILICON PATHWAYS",
    callout: "SAME COMPUTATION"
  },
  {
    id: 2,
    tag: "FPGA FLOW",
    eyebrow: "STAGE 03 / 12 • HARDWARE DESCRIPTION",
    title: "PATH 1 — FPGA PIPELINE",
    caption: "DESCRIBE THE HARDWARE WITH VERILOG RTL",
    narration: "With an FPGA, the design flow transforms a hardware description into configuration data (bitstream) that physically programs the FPGA's logic cells and switch matrix.",
    takeaway: "RTL → SYNTHESIS → PLACE & ROUTE → BITSTREAM → FPGA",
    callout: "CONFIGURE HARDWARE"
  },
  {
    id: 3,
    tag: "FPGA TARGET",
    eyebrow: "STAGE 04 / 12 • VSDSQUADRON BOARD",
    title: "TARGET 01 — VSDSQUADRON FPGA MINI",
    caption: "LATTICE ICE40UP5K SILICON TARGET",
    narration: "Houses an iCE40UP5K FPGA with 5,280 logic cells, dedicated DSP multipliers, embedded SPRAM, and a high-speed FT232H USB programmer.",
    takeaway: "RTL → BITSTREAM → PHYSICAL FPGA FABRIC",
    callout: "VSDSQUADRON FPGA MINI"
  },
  {
    id: 4,
    tag: "RENESAS FLOW",
    eyebrow: "STAGE 05 / 12 • EMBEDDED MODEL PIPELINE",
    title: "PATH 2 — RENESAS PIPELINE",
    caption: "DEPLOY A MODEL ON AN EMBEDDED MCU",
    narration: "Here the computational structure is delivered as compiled firmware and an embedded model runtime rather than physically wiring gates.",
    takeaway: "MODEL → QUANTIZE (INT8) → C RUNTIME → COMPILE → FLASH",
    callout: "DEPLOY MODEL"
  },
  {
    id: 5,
    tag: "RENESAS TARGET",
    eyebrow: "STAGE 06 / 12 • EMBEDDED VISION KIT",
    title: "TARGET 02 — RENESAS V2 AI KIT",
    caption: "EMBEDDED AI • SENSOR & CAMERA INTEGRATION",
    narration: "A dedicated embedded microcontroller development kit executing quantized neural network models with camera feeds and rich peripherals.",
    takeaway: "MODEL → MCU FLASH → REAL-TIME INFERENCE",
    callout: "RENESAS V2 AI KIT"
  },
  {
    id: 6,
    tag: "ESP32 FLOW",
    eyebrow: "STAGE 07 / 12 • TINYML PIPELINE",
    title: "PATH 3 — ESP32 PIPELINE",
    caption: "TINYML / ULTRA-LOW-POWER EDGE RUNTIME",
    narration: "An ESP32-class MCU runs lightweight embedded inference using compact neural network frameworks like TensorFlow Lite Micro.",
    takeaway: "TFLITE MODEL → C++ RUNTIME → GCC COMPILER → FLASH",
    callout: "RUN EDGE AI"
  },
  {
    id: 7,
    tag: "ESP32 TARGET",
    eyebrow: "STAGE 08 / 12 • WIRELESS SENSOR",
    title: "TARGET 03 — HELTEC / ESP32 AI",
    caption: "EDGE AI SENSOR • WI-FI & DISPLAY INTEGRATED",
    narration: "Features dual-core processing, wireless connectivity, and low milliwatt power consumption for distributed edge intelligence.",
    takeaway: "SENSOR INPUT → MCU INFERENCE → WIRELESS TELEMETRY",
    callout: "HELTEC / ESP32"
  },
  {
    id: 8,
    tag: "COMPARE FLOWS",
    eyebrow: "STAGE 09 / 12 • CROSS-COMPARISON",
    title: "COMPARE THE THREE PATHS",
    caption: "HARDWARE CONFIGURATION VS EMBEDDED FIRMWARE",
    narration: "FPGA configures physical logic cells; Renesas and ESP32 compile firmware models. All three paths successfully converge on the same task.",
    takeaway: "CONFIGURE HARDWARE vs DEPLOY EMBEDDED FIRMWARE",
    callout: "DIGIT RECOGNITION"
  },
  {
    id: 9,
    tag: "SAME TASK",
    eyebrow: "STAGE 10 / 12 • TASK CONVERGENCE",
    title: "ONE AI TASK: DIGIT RECOGNITION",
    caption: "HANDWRITTEN DIGIT '7' → THREE SILICON PATHS",
    narration: "Input image data is fed into all three platforms. Despite radically different internal silicon structures, all three correctly classify the digit.",
    takeaway: "SAME INPUT → DIFFERENT HARDWARE → SAME OUTPUT (7)",
    callout: "TASK: DIGIT 7"
  },
  {
    id: 10,
    tag: "TRADEOFFS",
    eyebrow: "STAGE 11 / 12 • ENGINEERING DECISION",
    title: "SO WHICH ONE IS BETTER?",
    caption: "LATENCY VS POWER VS MEMORY VS FLEXIBILITY",
    narration: "There is no single winner. FPGA gives deterministic microsecond latency; Renesas offers industrial peripherals; ESP32 delivers ultra-low-cost wireless connectivity.",
    takeaway: "NO UNIVERSAL BEST: HARDWARE IS DEFINED BY TRADEOFFS",
    callout: "ENGINEERING TRADEOFFS"
  },
  {
    id: 11,
    tag: "THE 3 BOARDS",
    eyebrow: "STAGE 12 / 12 • THE HARDWARE REVEAL",
    title: "THE HARDWARE IS RIGHT HERE",
    caption: "VSDSQUADRON FPGA MINI • RENESAS V2 • HELTEC ESP32",
    narration: "Everything we've analyzed is about to leave the screen. Three real silicon boards are ready on the lab workbench.",
    takeaway: "SAME COMPUTATION. DIFFERENT HARDWARE.",
    callout: "NEXT → ONE AI MODEL. THREE HARDWARE PLATFORMS."
  }
];

export const PLATFORM_BREADCRUMBS = [
  { id: 0, label: "ALU" },
  { id: 1, label: "3 PATHS" },
  { id: 2, label: "FPGA FLOW" },
  { id: 3, label: "FPGA BOARD" },
  { id: 4, label: "RENESAS FLOW" },
  { id: 5, label: "RENESAS BOARD" },
  { id: 6, label: "ESP32 FLOW" },
  { id: 7, label: "ESP32 BOARD" },
  { id: 8, label: "COMPARE" },
  { id: 9, label: "SAME TASK" },
  { id: 10, label: "TRADEOFFS" },
  { id: 11, label: "BOARDS" }
];
