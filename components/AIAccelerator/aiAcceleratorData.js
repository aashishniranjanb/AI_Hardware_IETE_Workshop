// Stage definitions and data for Slide 16: BUILD THE AI ACCELERATOR

export const AI_ACCELERATOR_STAGES = [
  {
    id: 'REPLACE_BLINKER',
    title: 'THE BLINKER WAS ONLY THE TEST',
    eyebrow: 'STAGE 01 / 19 • UPGRADE THE CIRCUIT',
    caption: 'Slide 15 verified the board and USB pipeline. Now we replace the counter with the real computational circuit.',
    takeaway: 'NOW THE REAL CIRCUIT • AI ACCELERATOR',
    tag: 'REPLACE BLINKER'
  },
  {
    id: 'AI_MATH',
    title: 'WHAT DOES THE AI ACTUALLY COMPUTE?',
    eyebrow: 'STAGE 02 / 19 • NEURAL COMPUTATION',
    caption: 'Every artificial neuron computes a weighted sum followed by a bias and activation function.',
    takeaway: 'y = Σ(w × x) + b • MULTIPLY + ACCUMULATE',
    tag: 'NEURAL MATH'
  },
  {
    id: 'ONE_MAC',
    title: 'THE ATOM OF AI: ONE MAC UNIT',
    eyebrow: 'STAGE 03 / 19 • ARITHMETIC CORE',
    caption: 'Multiply-Accumulate (MAC) takes input x and weight w, multiplies them, and adds the result to an accumulator.',
    takeaway: 'MAC = MULTIPLIER + ACCUMULATOR',
    tag: 'ONE MAC'
  },
  {
    id: 'REPEAT',
    title: 'ONE MAC IS NOT ENOUGH',
    eyebrow: 'STAGE 04 / 19 • HARDWARE REPLICATION',
    caption: 'A neural network requires thousands of multiply-accumulate operations. In hardware, we can replicate arithmetic units.',
    takeaway: 'REPLICATE HARDWARE ACROSS SILICON',
    tag: 'MAC × N'
  },
  {
    id: 'PARALLELISM',
    title: 'THIS IS WHERE FPGA BECOMES POWERFUL',
    eyebrow: 'STAGE 05 / 19 • SPATIAL CONCURRENCY',
    caption: 'Unlike a CPU fetching instructions sequentially, FPGA silicon instantiates multiple MACs running simultaneously.',
    takeaway: 'CONCURRENT SILICON VS SEQUENTIAL FETCH',
    tag: 'SPATIAL PARALLEL'
  },
  {
    id: 'DOT_PRODUCT',
    title: 'FROM MACs TO A VECTOR DOT PRODUCT',
    eyebrow: 'STAGE 06 / 19 • VECTOR MATH',
    caption: 'A dense neuron is simply a vector dot product: multiplying an input vector by weights and summing the result.',
    takeaway: 'VECTOR × WEIGHTS → SINGLE SUM',
    tag: 'DOT PRODUCT'
  },
  {
    id: 'LAYER',
    title: 'NOW BUILD A COMPLETE NEURAL LAYER',
    eyebrow: 'STAGE 07 / 19 • MATRIX MULTIPLY',
    caption: 'A layer performs multiple dot products concurrently: Y = W·X + b. The same hardware pattern repeated.',
    takeaway: 'MATRIX TRANSFORMATION Y = W·X + b',
    tag: 'LAYER MATRIX'
  },
  {
    id: 'FIRST_LAYER',
    title: 'OUR FIRST LAYER: 784 → 32',
    eyebrow: 'STAGE 08 / 19 • LAYER 1 (DENSE)',
    caption: '784 pixel inputs from a 28×28 grayscale digit image stream into the MAC engine to yield 32 learned features.',
    takeaway: '784 INPUT PIXELS → 32 FEATURES',
    tag: 'LAYER 1: 784→32'
  },
  {
    id: 'RELU',
    title: 'NONLINEARITY: THE ReLU ACTIVATION',
    eyebrow: 'STAGE 09 / 19 • ACTIVATION FUNCTION',
    caption: 'ReLU(x) = max(0, x). In digital logic, this is an ultra-fast sign-bit comparator multiplexer.',
    takeaway: 'MAX(0, x) • SIGN BIT ZERO-CLAMP',
    tag: 'ReLU LOGIC'
  },
  {
    id: 'SECOND_LAYER',
    title: 'SECOND LAYER: 32 → 16',
    eyebrow: 'STAGE 10 / 19 • LAYER 2 (DENSE)',
    caption: 'The 32 activated features feed into the second layer MAC engine, distilling down to 16 higher-level features.',
    takeaway: '32 FEATURES → 16 FEATURES',
    tag: 'LAYER 2: 32→16'
  },
  {
    id: 'OUTPUT_LAYER',
    title: 'FINAL LAYER: 16 → 10 CLASSES',
    eyebrow: 'STAGE 11 / 19 • CLASSIFICATION',
    caption: '16 features map to 10 class scores (digits 0 through 9). The highest score indicates the recognized digit.',
    takeaway: '16 FEATURES → 10 DIGIT SCORES (0–9)',
    tag: 'LAYER 3: 16→10'
  },
  {
    id: 'ACCELERATOR_DATAPATH',
    title: 'PUT IT ALL TOGETHER: THE DATAPATH',
    eyebrow: 'STAGE 12 / 19 • HARDWARE PIPELINE',
    caption: 'Input buffer → Weight Memory → MAC Array → Accumulator → ReLU → Next Layer. A continuous silicon pipeline.',
    takeaway: 'FULL STREAMING ACCELERATOR DATAPATH',
    tag: 'DATAPATH'
  },
  {
    id: 'CONTROL',
    title: 'HARDWARE ALSO NEEDS CONTROL: FSM',
    eyebrow: 'STAGE 13 / 19 • CONTROL LOGIC',
    caption: 'A Finite State Machine coordinates data flow: IDLE → LOAD_PIXEL → COMPUTE_MAC → ACCUMULATE → RELU → OUTPUT.',
    takeaway: 'FSM DIRECTS BUSES, STROBES & REGISTERS',
    tag: 'CONTROL FSM'
  },
  {
    id: 'MEMORY',
    title: 'WHERE DO THE WEIGHTS LIVE?',
    eyebrow: 'STAGE 14 / 19 • WEIGHT STORAGE',
    caption: 'Trained weights live in on-chip Block RAM / ROM and stream into MACs synchronously with activation inputs.',
    takeaway: 'COMPUTE REQUIRES BALANCED MEMORY BANDWIDTH',
    tag: 'WEIGHT BRAM'
  },
  {
    id: 'COMPLETE_ACCELERATOR',
    title: 'THE COMPLETE AI ACCELERATOR ARCHITECTURE',
    eyebrow: 'STAGE 15 / 19 • INTEGRATED SYSTEM',
    caption: 'Preprocess + Weight ROM + Parallel MAC + ReLU + Control FSM = Complete Silicon Inference Engine.',
    takeaway: 'PIXELS IN → HARDWARE COMPUTE → DIGIT OUT',
    tag: 'COMPLETE ARCH'
  },
  {
    id: 'RTL_MAPPING',
    title: 'TRANSLATE ARCHITECTURE INTO RTL',
    eyebrow: 'STAGE 16 / 19 • SYNTHESIZABLE VERILOG',
    caption: 'The blocks map directly into Verilog constructs: multipliers, registers, RAM instances, and FSM case statements.',
    takeaway: 'BLOCK DIAGRAM → SYNTHESIZABLE RTL',
    tag: 'RTL MAPPING'
  },
  {
    id: 'FPGA',
    title: 'MAP IT INTO THE iCE40UP5K FABRIC',
    eyebrow: 'STAGE 17 / 19 • PHYSICAL ALLOCATION',
    caption: 'Arithmetic maps into DSP/MAC blocks and LUTs, weights into embedded BRAM, and control into logic cells.',
    takeaway: 'ARCHITECTURE BECOMES PHYSICAL SILICON',
    tag: 'FPGA MAPPING'
  },
  {
    id: 'DIGIT',
    title: 'THE FINAL GOAL: REAL-TIME INFERENCE',
    eyebrow: 'STAGE 18 / 19 • END-TO-END EXECUTION',
    caption: 'Handwritten digit 7 streams into the accelerator. MAC pipelines execute. Class 7 fires. The FPGA is doing AI!',
    takeaway: 'THE FPGA IS NOW DOING AI INFERENCE',
    tag: 'DIGIT 7 INFERRED'
  },
  {
    id: 'HANDS_ON_HANDOFF',
    title: 'THIS IS WHAT WE WILL BUILD',
    eyebrow: 'STAGE 19 / 19 • WORKSHOP BRIDGE',
    caption: '784 → 32 → 16 → 10 on the VSDSquadron FPGA Mini. Next: let us examine and write the actual synthesizable RTL.',
    takeaway: 'MODEL → MAC → RTL → FPGA • READY FOR RTL',
    tag: 'NEXT: WRITE RTL'
  }
];

export const AI_ACCELERATOR_BREADCRUMBS = [
  { id: 'REPLACE_BLINKER', label: '01 REPLACE' },
  { id: 'AI_MATH', label: '02 MATH' },
  { id: 'ONE_MAC', label: '03 ONE MAC' },
  { id: 'REPEAT', label: '04 MAC × N' },
  { id: 'PARALLELISM', label: '05 PARALLEL' },
  { id: 'DOT_PRODUCT', label: '06 DOT PROD' },
  { id: 'LAYER', label: '07 LAYER' },
  { id: 'FIRST_LAYER', label: '08 784→32' },
  { id: 'RELU', label: '09 RELU' },
  { id: 'SECOND_LAYER', label: '10 32→16' },
  { id: 'OUTPUT_LAYER', label: '11 16→10' },
  { id: 'ACCELERATOR_DATAPATH', label: '12 DATAPATH' },
  { id: 'CONTROL', label: '13 CONTROL' },
  { id: 'MEMORY', label: '14 MEMORY' },
  { id: 'COMPLETE_ACCELERATOR', label: '15 COMPLETE' },
  { id: 'RTL_MAPPING', label: '16 RTL' },
  { id: 'FPGA', label: '17 FPGA' },
  { id: 'DIGIT', label: '18 INFERENCE' },
  { id: 'HANDS_ON_HANDOFF', label: '19 HANDOFF' }
];
