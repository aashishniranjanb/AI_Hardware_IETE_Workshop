export const LOGIC_STAGES = [
  {
    id: 0,
    tag: "LOGIC TOOLKIT",
    eyebrow: "STAGE 01 / 11 • DIGITAL BUILDING BLOCKS",
    title: "START WITH LOGIC",
    caption: "SIMPLE BUILDING BLOCKS: AND • OR • NOT • XOR",
    narration: "Individual gates perform simple Boolean operations. Combining them allows us to create useful digital circuits.",
    takeaway: "CAN WE BUILD MATH FROM THESE?",
    callout: "CAN WE BUILD MATH FROM THESE?"
  },
  {
    id: 1,
    tag: "XOR + AND",
    eyebrow: "STAGE 02 / 11 • THE ARITHMETIC REVEAL",
    title: "TWO GATES CAN DO ARITHMETIC",
    caption: "XOR PRODUCES SUM • AND PRODUCES CARRY",
    narration: "XOR tells us whether the two bits differ (SUM). AND tells us whether both bits are 1 (CARRY). Together they form arithmetic.",
    takeaway: "SUM = A ⊕ B  |  CARRY = A · B",
    callout: "XOR → SUM  |  AND → CARRY"
  },
  {
    id: 2,
    tag: "HALF ADDER",
    eyebrow: "STAGE 03 / 11 • 1-BIT ARITHMETIC",
    title: "THE HALF ADDER",
    caption: "TWO GATES → ONE BIT OF BINARY ADDITION",
    narration: "We just constructed a circuit that performs binary addition using nothing more than XOR and AND gates.",
    takeaway: "TWO GATES → ONE BIT OF ADDITION",
    callout: "A + B"
  },
  {
    id: 3,
    tag: "FULL ADDER",
    eyebrow: "STAGE 04 / 11 • ACCEPTING CARRY-IN",
    title: "NOW ADD THE CARRY",
    caption: "A + B + CIN → ACCEPTING INCOMING CARRY",
    narration: "A Full Adder accepts an incoming carry (Cin) from a lower bit column, allowing arbitrary bit widths to be chained.",
    takeaway: "SUM = A ⊕ B ⊕ Cin  |  COUT = (A·B) + (Cin·(A⊕B))",
    callout: "THE CARRY CONTINUES"
  },
  {
    id: 4,
    tag: "CHAINED FAs",
    eyebrow: "STAGE 05 / 11 • CARRY PROPAGATION",
    title: "ONE ADDER IS STILL NOT ENOUGH",
    caption: "CASCADE 4 FULL ADDERS: C0 → C1 → C2 → C3 → C4",
    narration: "Chain four Full Adders together. As carry ripples from right to left, larger binary words are computed in a single clock cycle.",
    takeaway: "CHAIN THE BUILDING BLOCKS: RIPPLE CARRY",
    callout: "RIPPLE CARRY CHAIN"
  },
  {
    id: 5,
    tag: "4-BIT ADDER",
    eyebrow: "STAGE 06 / 11 • MULTI-BIT ARITHMETIC",
    title: "NOW WE HAVE A 4-BIT ADDER",
    caption: "LOGIC GATES → 4-BIT BINARY ADDITION (0..15 + 0..15)",
    narration: "Larger arithmetic circuits are constructed by repeating smaller digital building blocks.",
    takeaway: "3 + 5 = 8 (0011₂ + 0101₂ = 1000₂)",
    callout: "4-BIT ARITHMETIC IN HARDWARE"
  },
  {
    id: 6,
    tag: "SCALE MATH",
    eyebrow: "STAGE 07 / 11 • BEYOND ADDITION",
    title: "WHAT IF WE NEED MORE THAN ADDITION?",
    caption: "ADD • SUBTRACT • AND • OR • XOR UNDER CONTROL",
    narration: "Once arithmetic and logic circuits exist, they can be multiplexed under a control signal to perform many operations.",
    takeaway: "ONE CIRCUIT → MANY DIGITAL OPERATIONS",
    callout: "ARITHMETIC + LOGIC"
  },
  {
    id: 7,
    tag: "THE ALU",
    eyebrow: "STAGE 08 / 11 • GENERAL-PURPOSE COMPUTE",
    title: "THE ARITHMETIC LOGIC UNIT (ALU)",
    caption: "ARITHMETIC + LOGIC COMBINED IN ONE UNIT",
    narration: "An ALU combines arithmetic and logical operations into one computational core with an operation selector.",
    takeaway: "GENERAL-PURPOSE DIGITAL COMPUTE ENGINE",
    callout: "ALU ENGINE"
  },
  {
    id: 8,
    tag: "TO COMPUTER",
    eyebrow: "STAGE 09 / 11 • SYSTEM INTEGRATION",
    title: "WHAT IF WE ADD CONTROL + MEMORY?",
    caption: "ALU + REGISTERS + CONTROL + MEMORY = PROCESSOR",
    narration: "An ALU becomes the beating heart of a CPU when surrounded by registers, control logic, and program memory.",
    takeaway: "COMPUTATION BECOMES A SYSTEM",
    callout: "PROCESSOR ARCHITECTURE"
  },
  {
    id: 9,
    tag: "THE LADDER",
    eyebrow: "STAGE 10 / 11 • THE COMPLETE CHAIN",
    title: "LOOK HOW FAR WE JUST WENT",
    caption: "LOGIC → ARITHMETIC → COMPUTATION",
    narration: "From transistors and logic gates, to adders, to an ALU, to an entire compute system.",
    takeaway: "LOGIC → ARITHMETIC → COMPUTATION",
    callout: "THE COMPLETE PYRAMID"
  },
  {
    id: 10,
    tag: "PLATFORMS",
    eyebrow: "STAGE 11 / 11 • HARDWARE HANDOFF",
    title: "NOW PUT THE CIRCUIT INTO HARDWARE",
    caption: "ONE COMPUTATION — THREE PHYSICAL IMPLEMENTATIONS",
    narration: "We take the ALU design: synthesize to FPGA gates, compile for Renesas MCU, or flash to Heltec ESP32 TinyML.",
    takeaway: "SAME COMPUTATION. DIFFERENT HARDWARE.",
    callout: "NEXT → FROM RTL TO REAL HARDWARE"
  }
];

export const LOGIC_BREADCRUMBS = [
  { id: 0, label: "TOOLKIT" },
  { id: 1, label: "XOR + AND" },
  { id: 2, label: "HALF ADDER" },
  { id: 3, label: "FULL ADDER" },
  { id: 4, label: "CASCADE" },
  { id: 5, label: "4-BIT ADDER" },
  { id: 6, label: "OPERATIONS" },
  { id: 7, label: "ALU" },
  { id: 8, label: "SYSTEM" },
  { id: 9, label: "LADDER" },
  { id: 10, label: "HANDOFF" }
];
