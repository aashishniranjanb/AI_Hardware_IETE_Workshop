export const BLACKWELL_STAGES = [
  {
    id: 0,
    name: "ONE_GPU",
    eyebrow: "STAGE 01 / 08 • THE INDIVIDUAL ACCELERATOR",
    title: "START WITH ONE GPU",
    caption: "COMPUTE IS STILL A SINGLE DEVICE",
    tag: "GPU",
    narration: "Start with one accelerator. It has enormous compute, but that compute is only useful when data reaches it.",
    stats: [
      { label: "TRANSISTORS", val: "208 BILLION (DUAL-RETICLE)" },
      { label: "DIE LINK", val: "10 TB/s NV-HBI BRIDGE" }
    ]
  },
  {
    id: 1,
    name: "GPU_PLUS_MEMORY",
    eyebrow: "STAGE 02 / 08 • IN-PACKAGE MEMORY",
    title: "COMPUTE NEEDS MEMORY",
    caption: "THE GPU CANNOT WORK WITHOUT DATA",
    tag: "HBM",
    narration: "Surround the silicon dies with 8 stacks of HBM3e. Data flows at 8 Terabytes per second into the compute engines.",
    stats: [
      { label: "MEMORY CAPACITY", val: "192 GB HBM3e" },
      { label: "MEMORY BANDWIDTH", val: "8.0 TB/s ULTRA-WIDE" }
    ]
  },
  {
    id: 2,
    name: "MULTIPLE_GPUS",
    eyebrow: "STAGE 03 / 08 • PARALLEL ACCELERATION",
    title: "ONE GPU IS NOT ENOUGH",
    caption: "SCALE THE COMPUTE",
    tag: "MULTI-GPU",
    narration: "Trillion-parameter AI models exceed the memory and compute of any single chip. We must cluster multiple GPUs.",
    stats: [
      { label: "CLUSTER COUNT", val: "4 × BLACKWELL GPUS" },
      { label: "AGGREGATE MEMORY", val: "768 GB HBM3e" }
    ]
  },
  {
    id: 3,
    name: "NVLINK",
    eyebrow: "STAGE 04 / 08 • HIGH-SPEED FABRIC",
    title: "NOW THEY MUST TALK",
    caption: "THE INTERCONNECT BECOMES CRITICAL",
    tag: "NVLINK",
    narration: "Bypassing standard PCIe slots, NVLink creates direct all-to-all memory links between GPUs at 1.8 Terabytes per second.",
    stats: [
      { label: "GPU-TO-GPU LINK", val: "1.8 TB/s BIDIRECTIONAL" },
      { label: "LATENCY", val: "MEMORY-SPEED DIRECT RDMA" }
    ]
  },
  {
    id: 4,
    name: "SCALE_TO_72",
    eyebrow: "STAGE 05 / 08 • SCALING THE FABRIC",
    title: "SCALE THE FABRIC",
    caption: "FROM A FEW GPUs TO A 72-GPU NVLINK DOMAIN",
    tag: "72 GPUs",
    narration: "Instead of stopping at 4 or 8 GPUs, link 72 GPUs into one continuous, unified shared-memory domain.",
    stats: [
      { label: "TOTAL ACCELERATORS", val: "72 × BLACKWELL GPUS" },
      { label: "COMBINED HBM3e", val: "13.8 TB UNIFIED MEMORY" }
    ]
  },
  {
    id: 5,
    name: "NVL72_RACK",
    eyebrow: "STAGE 06 / 08 • RACK-SCALE ARCHITECTURE",
    title: "THE SYSTEM BECOMES A MACHINE",
    caption: "GB200 / BLACKWELL-ERA NVL72",
    tag: "NVL72",
    narration: "18 Compute Trays (72 GPUs + 36 Grace CPUs), 9 NVLink Switch Trays, 5,184 direct copper cables, and 100% liquid cooling.",
    stats: [
      { label: "NVLINK COPPER SPINE", val: "5,184 CABLES • 130 TB/s" },
      { label: "COOLING SYSTEM", val: "100% LIQUID-COOLED MANIFOLD" }
    ]
  },
  {
    id: 6,
    name: "AI_SUPERCOMPUTER",
    eyebrow: "STAGE 07 / 08 • DATA-CENTER SCALE",
    title: "NOW SCALE THE WHOLE SYSTEM",
    caption: "THE GPU BECOMES PART OF A DATA-CENTER-SCALE MACHINE",
    tag: "AI SYSTEM",
    narration: "Clusters of NVL72 racks interconnected via InfiniBand / Quantum switches form an AI supercomputer consuming megawatts of power.",
    stats: [
      { label: "CLUSTER SCALE", val: "THOUSANDS OF GPUS" },
      { label: "CORE MESSAGE", val: "COMPUTE + MEMORY + FABRIC + COOLING" }
    ]
  },
  {
    id: 7,
    name: "ZOOM_DOWN",
    eyebrow: "STAGE 08 / 08 • THE PIVOT DOWNWARD",
    title: "BUT WHAT IS INSIDE THE GPU?",
    caption: "LET'S GO ONE LEVEL DEEPER",
    tag: "INSIDE GPU",
    narration: "This gigantic supercomputer is ultimately built from tiny arithmetic circuits doing simple math: Multiply and Accumulate.",
    stats: [
      { label: "NEXT LEVEL", val: "GPU → TENSOR CORE → MAC → LOGIC" },
      { label: "FUNDAMENTALS", val: "PHYSICAL TRANSISTORS" }
    ]
  }
];

export const PROGRESSION_STEPS = [
  { id: 0, label: "GPU" },
  { id: 1, label: "HBM" },
  { id: 2, label: "4 GPUs" },
  { id: 3, label: "NVLINK" },
  { id: 4, label: "72 GPUs" },
  { id: 5, label: "NVL72 RACK" },
  { id: 6, label: "AI SYSTEM" },
  { id: 7, label: "INSIDE GPU" }
];
