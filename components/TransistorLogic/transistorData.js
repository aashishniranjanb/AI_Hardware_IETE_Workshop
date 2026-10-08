export const TRANSISTOR_STAGES = [
  {
    id: 0,
    tag: "AND GATE",
    eyebrow: "STAGE 01 / 10 • THE TRANSISTOR SWITCH",
    title: "THE FUNDAMENTAL BUILDING BLOCK",
    caption: "TRANSISTOR → LOGIC GATE (AND)",
    narration: "A logic gate takes binary inputs (high/low voltage) and computes a definitive truth output.",
    takeaway: "ONE GATE IS USEFUL. BUT ONE GATE IS NOT A COMPUTER."
  },
  {
    id: 1,
    tag: "MORE LOGIC",
    eyebrow: "STAGE 02 / 10 • CONNECTING GATES",
    title: "ONE GATE IS NOT A COMPUTER",
    caption: "SO WE CONNECT LOGIC GATES INTO CIRCUITS",
    narration: "By combining AND, OR, NOT, and XOR gates, we can build custom combinational circuits.",
    takeaway: "LOGIC GATES → WIRED DIGITAL CIRCUITS"
  },
  {
    id: 2,
    tag: "PROGRAMMABLE",
    eyebrow: "STAGE 03 / 10 • THE BREAKTHROUGH",
    title: "WHAT IF WE COULD CHOOSE CONNECTIONS?",
    caption: "FROM FIXED WIRES TO PROGRAMMABLE CONNECTIONS",
    narration: "Instead of permanently etching metal wires on silicon, what if configurable switch nodes determine the circuit path?",
    takeaway: "CONFIGURABLE SWITCHES MAKE LOGIC PROGRAMMABLE"
  },
  {
    id: 3,
    tag: "PLD",
    eyebrow: "STAGE 04 / 10 • PROGRAMMABLE LOGIC DEVICE",
    title: "THE PROGRAMMABLE LOGIC DEVICE (PLD)",
    caption: "INPUTS → PROGRAMMABLE LOGIC ARRAY → OUTPUTS",
    narration: "A PLD packs configurable logic arrays into a single chip, allowing designers to configure custom logic without custom fab.",
    takeaway: "PLD: HARDWARE WITH PROGRAMMABLE CONNECTION POINTS"
  },
  {
    id: 4,
    tag: "PLA VS PAL",
    eyebrow: "STAGE 05 / 10 • ARCHITECTURAL TRADE-OFF",
    title: "PLA vs PAL",
    caption: "PROGRAMMABLE AND + PROGRAMMABLE OR vs FIXED OR",
    narration: "PLA has both programmable AND and programmable OR planes. PAL simplifies silicon by fixing the OR plane, boosting speed and lowering cost.",
    takeaway: "PLA: PROG AND + PROG OR  |  PAL: PROG AND + FIXED OR"
  },
  {
    id: 5,
    tag: "CPLD",
    eyebrow: "STAGE 06 / 10 • SCALING CAPACITY",
    title: "WHAT IF WE NEED MORE LOGIC?",
    caption: "CPLD: MULTIPLE LOGIC BLOCKS + GLOBAL INTERCONNECT",
    narration: "A Complex PLD links multiple PAL/PLA-like logic blocks via a centralized programmable interconnect matrix.",
    takeaway: "CPLD = MULTIPLE LOGIC BLOCKS + PROGRAMMABLE INTERCONNECT"
  },
  {
    id: 6,
    tag: "FPGA FABRIC",
    eyebrow: "STAGE 07 / 10 • THE MASSIVE GRID",
    title: "FIELD-PROGRAMMABLE GATE ARRAY",
    caption: "THOUSANDS OF CONFIGURABLE LOGIC BLOCKS (CLBs)",
    narration: "An FPGA scales programmable logic into a vast 2D island-style matrix of Configurable Logic Blocks surrounded by programmable routing channels.",
    takeaway: "FPGA = CLBs (LUTs + DFF) + PROGRAMMABLE ROUTING CHANNELS"
  },
  {
    id: 7,
    tag: "SWITCH MATRIX",
    eyebrow: "STAGE 08 / 10 • THE ROUTING SECRET",
    title: "THE SECRET IS IN THE CONNECTIONS",
    caption: "PROGRAMMABLE SWITCH MATRIX (INTERSECTION NODES)",
    narration: "Routing tracks cross at switch boxes. Programmable SRAM pass-transistors or transmission gates turn connections ON or OFF.",
    takeaway: "CONFIGURING SWITCH NODES CREATES THE ELECTRICAL WIRES"
  },
  {
    id: 8,
    tag: "RTL TO BITSTREAM",
    eyebrow: "STAGE 09 / 10 • THE DESIGN PIPELINE",
    title: "HOW DOES THE FPGA KNOW WHAT TO BECOME?",
    caption: "VERILOG RTL → SYNTHESIS → PLACE & ROUTE → BITSTREAM",
    narration: "Synthesis turns Verilog into logic equations; PnR maps them into LUTs and routing tracks, outputting a raw binary bitstream.",
    takeaway: "RTL DESCRIBES HARDWARE → BITSTREAM CONFIGURES SWITCHES"
  },
  {
    id: 9,
    tag: "CONFIGURED",
    eyebrow: "STAGE 10 / 10 • PHYSICAL HARDWARE",
    title: "YOUR CIRCUIT NOW EXISTS IN HARDWARE",
    caption: "YOU DID NOT WRITE AN APP. YOU CONFIGURED HARDWARE.",
    narration: "The bitstream loads into FPGA configuration SRAM. Switches close, logic activates, and the silicon physically morphs into your circuit.",
    takeaway: "NEXT → FROM LOGIC GATES TO COMPUTATION (ARITHMETIC & ADDERS)"
  }
];

export const TRANSISTOR_BREADCRUMBS = [
  { id: 0, label: "AND GATE" },
  { id: 1, label: "MORE LOGIC" },
  { id: 2, label: "SWITCHES" },
  { id: 3, label: "PLD" },
  { id: 4, label: "PLA / PAL" },
  { id: 5, label: "CPLD" },
  { id: 6, label: "FPGA" },
  { id: 7, label: "SWITCH MATRIX" },
  { id: 8, label: "BITSTREAM" },
  { id: 9, label: "CONFIGURED" }
];
