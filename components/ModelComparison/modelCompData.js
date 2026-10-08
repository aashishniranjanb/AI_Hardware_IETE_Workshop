export const MODEL_COMP_STAGES = [
  {
    id: 0,
    tag: "ONE TASK",
    eyebrow: "STAGE 01 / 13 • THE COMMON CHALLENGE",
    title: "ONE AI TASK",
    caption: "CAN WE RUN THE SAME AI ON DIFFERENT HARDWARE?",
    narration: "We start with a single, universal AI task: handwritten digit recognition from the classic MNIST dataset.",
    takeaway: "ONE COMMON AI TASK AS BENCHMARK: DIGIT 7",
    callout: "INPUT IMAGE"
  },
  {
    id: 1,
    tag: "COMMON PIPELINE",
    eyebrow: "STAGE 02 / 13 • LOGICAL DATAFLOW",
    title: "THE COMMON AI PIPELINE",
    caption: "IMAGE → PREPROCESS → MODEL → OUTPUT (0–9)",
    narration: "The high-level computation can remain conceptually identical even when the target hardware changes.",
    takeaway: "28×28 IMAGE → NORMALIZE → CLASSIFIER → DIGIT 0–9",
    callout: "THE COMMON AI PIPELINE"
  },
  {
    id: 2,
    tag: "THE MODEL",
    eyebrow: "STAGE 03 / 13 • NUMERICAL COMPUTE",
    title: "THE MODEL ARCHITECTURE",
    caption: "784 INPUTS → 32 HIDDEN → 16 HIDDEN → 10 OUTPUTS",
    narration: "The neural network is fundamentally a sequence of numerical operations: multiply, accumulate, activate, compare.",
    takeaway: "A SEQUENCE OF MATH OPERATIONS: MAC, ACTIVATION, COMPARISON",
    callout: "NEURAL NETWORK ARCHITECTURE"
  },
  {
    id: 3,
    tag: "DIVERGENCE",
    eyebrow: "STAGE 04 / 13 • SILICON FORK",
    title: "NOW THE HARDWARE MATTERS",
    caption: "SAME TASK BRANCHES INTO THREE ARCHITECTURES",
    narration: "How does this mathematical graph execute? It splits across three distinct physical hardware paradigms.",
    takeaway: "SAME AI TASK → THREE HARDWARE BRANCHES",
    callout: "FPGA • RENESAS • ESP32"
  },
  {
    id: 4,
    tag: "FPGA PATH",
    eyebrow: "STAGE 05 / 13 • IMPLEMENTATION 01",
    title: "IMPLEMENTATION 01 — FPGA",
    caption: "VSDSQUADRON FPGA MINI: CUSTOM PARALLEL HARDWARE",
    narration: "On FPGA, the computation is expressed as custom parallel hardware and mapped directly into programmable logic resources.",
    takeaway: "BUILD THE COMPUTATION INTO PHYSICAL HARDWARE",
    callout: "RTL → BITSTREAM → FPGA"
  },
  {
    id: 5,
    tag: "RENESAS PATH",
    eyebrow: "STAGE 06 / 13 • IMPLEMENTATION 02",
    title: "IMPLEMENTATION 02 — RENESAS",
    caption: "RENESAS V2 AI KIT: DEPLOY MODEL TO MCU",
    narration: "The MCU executes an embedded representation of the AI computation using its available CPU core and memory resources.",
    takeaway: "DEPLOY THE MODEL TO THE EMBEDDED MCU",
    callout: "MODEL → COMPILE → FLASH → MCU"
  },
  {
    id: 6,
    tag: "ESP32 PATH",
    eyebrow: "STAGE 07 / 13 • IMPLEMENTATION 03",
    title: "IMPLEMENTATION 03 — ESP32",
    caption: "HELTEC / ESP32 AI: RUN AI AT THE EDGE",
    narration: "An ESP32-class platform executes suitably sized edge-AI workloads using an ultra-compact embedded TinyML runtime.",
    takeaway: "RUN AI AT THE ULTRA-LOW-COST EDGE",
    callout: "TINYML → FIRMWARE → ESP32"
  },
  {
    id: 7,
    tag: "THREE WAYS",
    eyebrow: "STAGE 08 / 13 • THREE IMPLEMENTATIONS",
    title: "THREE IMPLEMENTATIONS",
    caption: "CUSTOM LOGIC vs EMBEDDED AI vs TINYML",
    narration: "All three pipelines receive the same input image and compute simultaneously across three different execution models.",
    takeaway: "CUSTOM LOGIC vs EMBEDDED AI vs TINYML",
    callout: "THREE IMPLEMENTATION PIPELINES"
  },
  {
    id: 8,
    tag: "WHAT CHANGES",
    eyebrow: "STAGE 09 / 13 • ARCHITECTURAL DIFFERENCES",
    title: "WHAT ACTUALLY CHANGES?",
    caption: "COMPUTE, MEMORY, PARALLELISM, POWER, LATENCY",
    narration: "The algorithmic task remains the same, but the hardware architecture fundamentally changes how computation is executed.",
    takeaway: "THE ALGORITHM STAYS THE SAME. THE SILICON EXECUTION CHANGES.",
    callout: "ARCHITECTURAL DIMENSIONS"
  },
  {
    id: 9,
    tag: "CHOICE",
    eyebrow: "STAGE 10 / 13 • ENGINEERING DECISION",
    title: "HARDWARE IS AN ENGINEERING CHOICE",
    caption: "FLEXIBILITY vs PERFORMANCE vs COST vs POWER",
    narration: "The best platform depends on the workload. FPGA offers custom parallelism, Renesas offers industrial vision, ESP32 offers low-cost edge.",
    takeaway: "PLATFORM SELECTION DEPENDS ON SYSTEM REQUIREMENTS",
    callout: "ENGINEERING TRADE-OFF SPACE"
  },
  {
    id: 10,
    tag: "SAME INPUT",
    eyebrow: "STAGE 11 / 13 • SYNCHRONIZED INGEST",
    title: "WATCH THE SAME INPUT",
    caption: "ONE DIGIT '7' FED ACROSS THREE SILICON PATHS",
    narration: "A single image of digit 7 enters and branches synchronously into all three hardware implementations.",
    takeaway: "ONE IMAGE FED SIMULTANEOUSLY INTO THREE BOARDS",
    callout: "SYNCHRONIZED INFERENCE"
  },
  {
    id: 11,
    tag: "SAME RESULT",
    eyebrow: "STAGE 12 / 13 • OUTPUT CONVERGENCE",
    title: "SAME TASK. SAME RESULT.",
    caption: "ALL THREE CONVERGE ON OUTPUT: 7",
    narration: "Input travels through custom RTL, embedded MCU firmware, and TinyML runtime. All three produce identical classification: 7.",
    takeaway: "THE ALGORITHM STAYS THE SAME. THE HARDWARE CHANGES.",
    callout: "OUTPUT: 7"
  },
  {
    id: 12,
    tag: "HANDOFF",
    eyebrow: "STAGE 13 / 13 • WORKSHOP HANDOFF",
    title: "NOW WE BUILD IT",
    caption: "WHICH ONE SHOULD WE BUILD FIRST?",
    narration: "Theory and architecture are complete. It's time to build the real hardware accelerator on the workbench.",
    takeaway: "NOW LET'S BUILD IT: FPGA HANDS-ON",
    callout: "NEXT → BUILD THE FPGA VERSION"
  }
];

export const MODEL_COMP_BREADCRUMBS = [
  { id: 0, label: "ONE TASK" },
  { id: 1, label: "PIPELINE" },
  { id: 2, label: "MODEL" },
  { id: 3, label: "DIVERGE" },
  { id: 4, label: "FPGA" },
  { id: 5, label: "RENESAS" },
  { id: 6, label: "ESP32" },
  { id: 7, label: "3 WAYS" },
  { id: 8, label: "CHANGES" },
  { id: 9, label: "CHOICE" },
  { id: 10, label: "INPUT" },
  { id: 11, label: "RESULT" },
  { id: 12, label: "BUILD IT" }
];
