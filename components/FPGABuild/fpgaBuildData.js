export const FPGA_BUILD_STAGES = [
  {
    id: 0,
    tag: "START: MODEL",
    eyebrow: "STAGE 01 / 15 • THE COMPUTATION",
    title: "START WITH THE MODEL",
    caption: "MNIST DIGIT CLASSIFIER: 784 → 32 → 16 → 10",
    narration: "We start from the trained neural network model designed to recognize handwritten digits from 28x28 pixel images.",
    takeaway: "THE HIGH-LEVEL AI COMPUTATION WE WANT TO RUN",
    callout: "AI MODEL"
  },
  {
    id: 1,
    tag: "THE GAP",
    eyebrow: "STAGE 02 / 15 • THE TRANSLATION CHALLENGE",
    title: "THE FPGA DOESN'T UNDERSTAND PYTHON",
    caption: "BRIDGING HIGH-LEVEL NEURAL MATH TO PHYSICAL HARDWARE",
    narration: "The FPGA does not understand Python, PyTorch, or floating-point tensors directly. We must translate the computation into hardware.",
    takeaway: "WE MUST TRANSLATE THE COMPUTATION INTO DIGITAL HARDWARE",
    callout: "BRIDGING THE GAP"
  },
  {
    id: 2,
    tag: "QUANTIZATION",
    eyebrow: "STAGE 03 / 15 • PRECISION SCALING",
    title: "STEP 01 — QUANTIZATION",
    caption: "FLOATING POINT (32-BIT) → INTEGER (INT8)",
    narration: "Quantization converts model weights and activations into lower-precision integers, reducing memory footprint and silicon complexity.",
    takeaway: "FLOAT32 → INT8: 4X MEMORY REDUCTION + HARDWARE-FRIENDLY MATH",
    callout: "SMALLER + HARDWARE FRIENDLY"
  },
  {
    id: 3,
    tag: "REPRESENT MATH",
    eyebrow: "STAGE 04 / 15 • ARITHMETIC FORMULATION",
    title: "STEP 02 — REPRESENT THE MATH",
    caption: "y = Σ(w × x) + b → MULTIPLY + ACCUMULATE",
    narration: "Neural network inference is dominated by repeated multiply-and-accumulate operations over inputs and weights.",
    takeaway: "MAC = MULTIPLY + ACCUMULATE (THE ATOM OF AI MATH)",
    callout: "y = Σ(w × x) + b"
  },
  {
    id: 4,
    tag: "ONE MAC",
    eyebrow: "STAGE 05 / 15 • THE CORE OPERATION",
    title: "THE CORE OPERATION: ONE MAC",
    caption: "INPUT ACTIVATION × WEIGHT + ACCUMULATOR",
    narration: "A single MAC unit computes one product and accumulates it per clock cycle. Multipliers and adders execute the dot product.",
    takeaway: "MULTIPLY → ADD → REPEAT IN HARDWARE",
    callout: "ONE MAC UNIT"
  },
  {
    id: 5,
    tag: "PARALLEL MAC",
    eyebrow: "STAGE 06 / 15 • HARDWARE ACCELERATION",
    title: "ONE MAC IS NOT ENOUGH",
    caption: "PARALLEL MAC ARRAY FOR CONCURRENT MULTIPLICATION",
    narration: "FPGAs exploit true parallelism by duplicating arithmetic datapaths to compute dozens of dot products simultaneously.",
    takeaway: "TRUE PARALLELISM: MULTIPLE MAC UNITS WORKING SIMULTANEOUSLY",
    callout: "PARALLEL COMPUTATION"
  },
  {
    id: 6,
    tag: "DESCRIBE RTL",
    eyebrow: "STAGE 07 / 15 • HARDWARE DESCRIPTION",
    title: "STEP 03 — DESCRIBE IT IN RTL",
    caption: "VERILOG / SYSTEMVERILOG HARDWARE DESCRIPTION",
    narration: "We write Register-Transfer Level (RTL) code in Verilog to describe the registers, arithmetic multipliers, adders, and state machine.",
    takeaway: "RTL DESCRIBES DIGITAL HARDWARE, NOT SERIAL CPU INSTRUCTIONS",
    callout: "VERILOG RTL"
  },
  {
    id: 7,
    tag: "SYNTHESIS",
    eyebrow: "STAGE 08 / 15 • LOGIC TRANSLATION",
    title: "STEP 04 — SYNTHESIS",
    caption: "RTL CODE → GATE NETLIST → FPGA LOGIC CELLS",
    narration: "The synthesis engine (Yosys) parses the Verilog code, inferring logic gates and mapping them to iCE40 Look-Up Tables (LUTs) and Flip-Flops.",
    takeaway: "SYNTHESIS: MAPS VERILOG INTO FPGA LOGIC RESOURCES",
    callout: "RTL → FPGA LOGIC"
  },
  {
    id: 8,
    tag: "PLACE & ROUTE",
    eyebrow: "STAGE 09 / 15 • PHYSICAL LAYOUT",
    title: "STEP 05 — PLACE & ROUTE",
    caption: "PHYSICAL MAPPING ONTO iCE40UP5K SILICON FABRIC",
    narration: "Place-and-route (nextpnr) assigns synthesized LUTs to physical coordinate locations and routes electrical connections through switch boxes.",
    takeaway: "PLACE LOGIC IN THE GRID → ROUTE INTERCONNECT TRACKS",
    callout: "PLACE → ROUTE"
  },
  {
    id: 9,
    tag: "BITSTREAM",
    eyebrow: "STAGE 10 / 15 • CONFIGURATION DATA",
    title: "STEP 06 — GENERATE THE BITSTREAM",
    caption: "PHYSICAL MAPPING → BINARY CONFIGURATION BITSTREAM",
    narration: "The routed circuit is packaged into a raw binary bitstream file (.bin) representing all switch positions and LUT truth tables.",
    takeaway: "BITSTREAM CONTAINS THE HARDWARE CONFIGURATION DATA",
    callout: "CONFIGURATION DATA"
  },
  {
    id: 10,
    tag: "PROGRAM FPGA",
    eyebrow: "STAGE 11 / 15 • FLASHING THE SILICON",
    title: "STEP 07 — PROGRAM THE FPGA",
    caption: "LAPTOP → USB (FT232H) → iCE40UP5K SRAM",
    narration: "The programmer streams the configuration data over USB directly into the FPGA configuration SRAM or onboard SPI flash.",
    takeaway: "STREAMING CONFIGURATION DATA INTO FPGA HARDWARE",
    callout: "FLASHING BITSTREAM"
  },
  {
    id: 11,
    tag: "THE TARGET",
    eyebrow: "STAGE 12 / 15 • PHYSICAL BOARD",
    title: "THE TARGET: VSDSQUADRON FPGA MINI",
    caption: "LATTICE iCE40UP5K SILICON BENCHTOP BOARD",
    narration: "The physical board on the workbench: 5,280 logic cells, dedicated DSP multipliers, SPRAM, and 32 accessible GPIO pins.",
    takeaway: "THIS IS WHERE OUR ACCELERATOR HARDWARE RUNS",
    callout: "VSDSQUADRON FPGA MINI"
  },
  {
    id: 12,
    tag: "COMPLETE FLOW",
    eyebrow: "STAGE 13 / 15 • THE COMPLETE CHAIN",
    title: "THE COMPLETE FPGA PIPELINE",
    caption: "MODEL → QUANTIZE → MAC → RTL → SYNTHESIS → PnR → BITSTREAM → FPGA",
    narration: "Every stage links seamlessly: from high-level mathematical concepts all the way down to active transistors on the FPGA.",
    takeaway: "AI MODEL → DIGITAL LOGIC → REAL CONFIGURED SILICON",
    callout: "COMPLETE PIPELINE"
  },
  {
    id: 13,
    tag: "THE SHIFT",
    eyebrow: "STAGE 14 / 15 • PEDAGOGICAL PAYOFF",
    title: "LOOK WHAT JUST HAPPENED",
    caption: "WE DIDN'T WRITE AN APP. WE CONFIGURED HARDWARE.",
    narration: "With software, a CPU runs a stream of sequential instructions. On our FPGA, the bitstream physically creates a custom AI neural engine.",
    takeaway: "WE BUILT THE COMPUTATION DIRECTLY INTO HARDWARE",
    callout: "COMPUTATION IS SILICON"
  },
  {
    id: 14,
    tag: "HANDS-ON READY",
    eyebrow: "STAGE 15 / 15 • WORKSHOP LAUNCH",
    title: "FROM SCREEN → TO REAL FPGA",
    caption: "NOW WE BUILD THE FIRST HARDWARE ACCELERATOR",
    narration: "The conceptual foundation is complete. Now let's connect the board, load the toolchain, and build the digit recognizer.",
    takeaway: "READY FOR HANDS-ON WORKSHOP EXECUTION",
    callout: "LET'S BUILD IT"
  }
];

export const FPGA_BUILD_BREADCRUMBS = [
  { id: 0, label: "MODEL" },
  { id: 1, label: "THE GAP" },
  { id: 2, label: "QUANTIZE" },
  { id: 3, label: "MATH" },
  { id: 4, label: "ONE MAC" },
  { id: 5, label: "PARALLEL" },
  { id: 6, label: "RTL" },
  { id: 7, label: "SYNTHESIS" },
  { id: 8, label: "PnR" },
  { id: 9, label: "BITSTREAM" },
  { id: 10, label: "PROGRAM" },
  { id: 11, label: "TARGET" },
  { id: 12, label: "PIPELINE" },
  { id: 13, label: "PAYOFF" },
  { id: 14, label: "BUILD IT" }
];
