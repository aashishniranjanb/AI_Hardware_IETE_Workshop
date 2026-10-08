export const ARCHITECTURES = [
  {
    id: 'cpu',
    name: 'CPU',
    fullName: 'Central Processing Unit',
    subtitle: 'GENERAL-PURPOSE COMPUTING',
    strength: 'FLEXIBILITY',
    color: '#38BDF8',
    glow: 'rgba(56, 189, 248, 0.4)',
    concept: 'A small number of powerful, flexible workers.',
    formula: 'Low Latency • High Single-Thread Performance',
    coresDescription: '6 High-Performance Out-of-Order Cores + Massive Caches',
    examples: ['Operating Systems', 'Applications', 'Control Logic', 'Branch-Heavy Code'],
    typicalRole: 'OS / Everyday Apps'
  },
  {
    id: 'gpu',
    name: 'GPU',
    fullName: 'Graphics Processing Unit',
    subtitle: 'MASSIVELY PARALLEL COMPUTING',
    strength: 'PARALLELISM',
    color: '#60A5FA',
    glow: 'rgba(96, 165, 250, 0.4)',
    concept: 'Many workers doing identical/similar work in parallel.',
    formula: 'Massive Throughput • Thousands of SIMD Cores',
    coresDescription: 'Hundreds of parallel streaming arithmetic units',
    examples: ['AI Model Training', 'High-Batch Inference', '3D Graphics Rendering', 'HPC Simulation'],
    typicalRole: 'AI Training & HPC'
  },
  {
    id: 'npu',
    name: 'NPU',
    fullName: 'Neural Processing Unit',
    subtitle: 'NEURAL NETWORK ACCELERATOR',
    strength: 'AI SPECIALIZATION',
    color: '#22D3EE',
    glow: 'rgba(34, 211, 238, 0.4)',
    concept: 'Hardware optimized specifically for neural-network workloads.',
    formula: 'MATRIX × MATRIX → RESULT (Dense MAC Arrays)',
    coresDescription: 'Multiply-Accumulate (MAC) Tensor Grid + Activation Units',
    examples: ['Edge / Mobile AI', 'On-Device Speech & Vision', 'Low-Power Inference', 'Robotics Edge'],
    typicalRole: 'Edge AI & Mobile'
  },
  {
    id: 'tpu',
    name: 'TPU',
    fullName: 'Tensor Processing Unit',
    subtitle: 'TENSOR PROCESSING ARCHITECTURE',
    strength: 'TENSOR WORKLOADS',
    color: '#F97316',
    glow: 'rgba(249, 115, 22, 0.4)',
    concept: 'Specialized architecture designed around large-scale systolic tensor math.',
    formula: 'Systolic Array: Data flows rhythmically through ALUs',
    coresDescription: 'Matrix Multiply Units (MXU) with direct systolic interconnect',
    examples: ['Google Cloud TPU Pods', 'Transformer Training', 'Large-Scale LLM Inference', 'Supercomputing AI'],
    typicalRole: 'Tensor Acceleration'
  },
  {
    id: 'fpga',
    name: 'FPGA',
    fullName: 'Field-Programmable Gate Array',
    subtitle: 'RECONFIGURABLE DIGITAL HARDWARE',
    strength: 'CONFIGURABILITY',
    color: '#A855F7',
    glow: 'rgba(168, 85, 247, 0.4)',
    concept: 'Configurable digital fabric shaped directly into custom datapaths.',
    formula: 'Zero OS Overhead • Deterministic Ultra-Low Latency',
    coresDescription: 'Configurable Logic Blocks (CLBs) + Programmable Routing + DSP Slices',
    examples: ['Custom Edge Accelerators', 'High-Frequency Trading', 'Aerospace / Defense', 'Chip Prototyping'],
    typicalRole: 'Custom Acceleration'
  }
];

export const SCENARIOS = [
  {
    id: 1,
    question: "Run an operating system, background daemons, and everyday user applications.",
    answer: "CPU",
    reason: "Requires complex branch prediction, large general caches, and out-of-order execution flexibility.",
    target: "cpu"
  },
  {
    id: 2,
    question: "Train a 70-Billion parameter large neural network across clusters.",
    answer: "GPU",
    reason: "Demands thousands of parallel matrix cores and massive memory bandwidth (HBM) running in lockstep.",
    target: "gpu"
  },
  {
    id: 3,
    question: "Run real-time facial recognition and speech transcription efficiently inside a phone camera.",
    answer: "NPU",
    reason: "Ultra-low power budget and dedicated fixed-function MAC engines optimized for INT8/FP16 models.",
    target: "npu"
  },
  {
    id: 4,
    question: "Accelerate massive tensor workloads in Google's cloud supercomputing ecosystem.",
    answer: "TPU",
    reason: "Custom systolic matrix array architecture co-designed specifically for XLA compiler and TensorFlow/JAX.",
    target: "tpu"
  },
  {
    id: 5,
    question: "Build a bespoke hardware accelerator with microsecond-level deterministic latency and unique protocol interfaces.",
    answer: "FPGA",
    reason: "Physical logic gates and routing matrices can be wired specifically to implement the exact custom datapath.",
    target: "fpga"
  }
];

export const STAGES = [
  { id: 'entry', label: 'THE MENTAL MODEL FOCUS', subtitle: 'Zooming from System into Compute' },
  { id: 'compute', label: 'THE COMPUTE PACKAGE', subtitle: 'The Engine of the System' },
  { id: 'cpu', label: 'CPU ARCHITECTURE', subtitle: 'Few Powerful, Flexible Workers' },
  { id: 'gpu', label: 'GPU ARCHITECTURE', subtitle: 'Many Workers in Parallel' },
  { id: 'npu', label: 'NPU ARCHITECTURE', subtitle: 'Dedicated Neural Network Accelerator' },
  { id: 'tpu', label: 'TPU ARCHITECTURE', subtitle: 'Systolic Tensor Array' },
  { id: 'fpga', label: 'FPGA ARCHITECTURE', subtitle: 'Reconfigurable Logic Fabric' },
  { id: 'comparison', label: 'COMPUTE COMPARISON', subtitle: '5 Different Ways to Calculate' },
  { id: 'choice', label: 'INTERACTIVE CHOICE', subtitle: 'Which One Would You Choose?' },
  { id: 'realization', label: 'THE REALIZATION', subtitle: 'Different Trade-offs, Same Goal' },
  { id: 'memory_teaser', label: 'THE NEXT BOTTLENECK', subtitle: 'Even the Fastest Compute Needs Data' }
];
