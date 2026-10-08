export const AICHIP_STAGES = [
  {
    id: 0,
    name: "THE_GPU",
    eyebrow: "STAGE 01 / 10 • THE ACCELERATOR",
    title: "START WITH THE GPU",
    caption: "A MASSIVE PARALLEL COMPUTE ENGINE",
    tag: "GPU",
    narration: "A modern AI accelerator contains many compute resources, memory interfaces, and communication structures.",
    teachingPoint: "GPU = MANY COMPUTE UNITS WORKING IN PARALLEL",
    equation: null
  },
  {
    id: 1,
    name: "COMPUTE_TILES",
    eyebrow: "STAGE 02 / 10 • DIE PARTITIONING",
    title: "ZOOM INTO COMPUTE",
    caption: "THE GPU IS DIVIDED INTO MANY COMPUTE REGIONS",
    tag: "COMPUTE TILES",
    narration: "Instead of one giant serial calculator, AI chips contain dozens of modular compute regions operating simultaneously.",
    teachingPoint: "MODULAR PARALLEL REGIONS WITH LOCAL HIGH-SPEED CACHES",
    equation: null
  },
  {
    id: 2,
    name: "AI_COMPUTE_UNIT",
    eyebrow: "STAGE 03 / 10 • THE ARITHMETIC CORE",
    title: "INSIDE ONE COMPUTE UNIT",
    caption: "AI MATH IS HIGHLY PARALLEL",
    tag: "COMPUTE CORE",
    narration: "At the core of every neural network is a repeated pattern: weighted multiplications followed by additions.",
    teachingPoint: "NEURAL NETWORK = LOTS OF MULTIPLY + ADD",
    equation: "y = Σ(wᵢ × xᵢ)"
  },
  {
    id: 3,
    name: "MAC",
    eyebrow: "STAGE 04 / 10 • THE FUNDAMENTAL UNIT",
    title: "THE MAC UNIT",
    caption: "MULTIPLY–ACCUMULATE: THE ATOM OF AI HARDWARE",
    tag: "MAC",
    narration: "Multiply two numbers (activation × weight), then add the product to an accumulated register.",
    teachingPoint: "y ← y + (x × w)",
    equation: "y ← y + (x × w)"
  },
  {
    id: 4,
    name: "PARALLEL_MAC",
    eyebrow: "STAGE 05 / 10 • MASSIVE MULTIPLICATION",
    title: "ONE MAC IS NOT ENOUGH",
    caption: "SO WE REPEAT IT — MASSIVELY",
    tag: "PARALLEL MACs",
    narration: "One MAC produces 1 operation per cycle. Tens of thousands of MACs produce trillions of operations per second.",
    teachingPoint: "MORE MACs → MORE OPERATIONS / SECOND",
    equation: "1 MAC → 4 MACs → 16 MACs → 10,000+ MACs"
  },
  {
    id: 5,
    name: "MATRIX_MULTIPLICATION",
    eyebrow: "STAGE 06 / 10 • 2D VECTOR MATH",
    title: "NOW THINK IN MATRICES",
    caption: "AI DOESN'T PROCESS ONE NUMBER AT A TIME",
    tag: "MATRIX MATH",
    narration: "Weights and activations are organized as matrices. Matrix multiplication is composed of parallel dot-product MAC operations.",
    teachingPoint: "MATRIX MULTIPLICATION = PARALLEL DOT PRODUCTS",
    equation: "[A] × [B] = [C]"
  },
  {
    id: 6,
    name: "TENSOR_ENGINE",
    eyebrow: "STAGE 07 / 10 • SPECIALIZED HARDWARE",
    title: "THE TENSOR / MATRIX ENGINE",
    caption: "HARDWARE OPTIMIZED FOR 2D/3D TENSOR MATH",
    tag: "TENSOR CORE",
    narration: "Modern accelerators include dedicated hardware matrices that ingest entire matrix tiles in a single instruction cycle.",
    teachingPoint: "TILE-BASED SYSTOLIC HARDWARE EXECUTION",
    equation: "D = A × B + C"
  },
  {
    id: 7,
    name: "ZOOM_TO_DIGITAL_LOGIC",
    eyebrow: "STAGE 08 / 10 • CIRCUITS DECOMPOSED",
    title: "BUT HOW IS THE MAC BUILT?",
    caption: "THE MAC IS STILL DIGITAL HARDWARE",
    tag: "CIRCUITS",
    narration: "Peel back the MAC unit. It splits into an arithmetic multiplier, an adder tree, accumulator flip-flops, and logic gates.",
    teachingPoint: "COMPLEX MATH IS BUILT FROM SIMPLE ARITHMETIC BLOCKS",
    equation: "MULTIPLIER + ADDER TREE + REGISTERS"
  },
  {
    id: 8,
    name: "LOGIC_GATE_LEVEL",
    eyebrow: "STAGE 09 / 10 • BINARY FOUNDATION",
    title: "UNDERNEATH IT ALL: DIGITAL LOGIC",
    caption: "REPRESENTING TRUTH WITH 0s AND 1s",
    tag: "LOGIC GATES",
    narration: "Every calculation is ultimately executed by fundamental logic gates: AND, OR, NOT, and XOR manipulating high and low voltage states.",
    teachingPoint: "BINARY VOLTAGE (0 & 1) → BOOLEAN GATES → ADDITION",
    equation: "AND • OR • NOT • XOR"
  },
  {
    id: 9,
    name: "FINAL_REVEAL",
    eyebrow: "STAGE 10 / 10 • THE COMPLETE CHAIN",
    title: "FROM ONE TRANSISTOR TO AI",
    caption: "SIMPLE BUILDING BLOCKS • MASSIVE SCALE",
    tag: "THE FULL CHAIN",
    narration: "We went from an AI supercomputer all the way down to a circuit that understands 0 and 1. Now let's build one ourselves.",
    teachingPoint: "TRANSISTORS → GATES → ADDER → MAC → GPU → SUPERCOMPUTER",
    equation: "NOW LET'S BUILD ONE: FROM LOGIC → RTL → FPGA"
  }
];

export const BREADCRUMB_STEPS = [
  { id: 0, label: "GPU" },
  { id: 1, label: "TILES" },
  { id: 2, label: "CORE" },
  { id: 3, label: "MAC" },
  { id: 4, label: "PARALLEL" },
  { id: 5, label: "MATRIX" },
  { id: 6, label: "TENSOR" },
  { id: 7, label: "CIRCUIT" },
  { id: 8, label: "LOGIC" },
  { id: 9, label: "FULL CHAIN" }
];
