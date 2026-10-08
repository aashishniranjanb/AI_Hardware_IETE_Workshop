// Stage definitions and data for Slide 17: WRITE THE RTL (FROM AI ARCHITECTURE TO FPGA HARDWARE)

export const RTL_BUILD_STAGES = [
  {
    id: 'THE_ARCHITECTURE',
    title: 'WE KNOW WHAT WE WANT TO BUILD',
    eyebrow: 'STAGE 01 / 15 • ARCHITECTURE RECAP',
    caption: 'Slide 16 established the datapath: Input → MAC → ReLU → MAC → ReLU → MAC → Output. Now we describe it in RTL.',
    takeaway: 'FROM HIGH-LEVEL ARCHITECTURE TO RTL',
    tag: 'THE ARCHITECTURE'
  },
  {
    id: 'DECOMPOSE',
    title: 'BREAK IT INTO HARDWARE BLOCKS',
    eyebrow: 'STAGE 02 / 15 • MODULAR DECOMPOSITION',
    caption: 'RTL design begins by decomposing the neural datapath into discrete digital primitives: MAC units, RAM, Muxes, and Control FSM.',
    takeaway: 'ALGORITHM → DISCRETE HARDWARE BLOCKS',
    tag: 'DECOMPOSITION'
  },
  {
    id: 'RTL_MEANING',
    title: 'WHAT IS RTL?',
    eyebrow: 'STAGE 03 / 15 • REGISTER TRANSFER LEVEL',
    caption: 'RTL describes how data moves between registers on clock edges and how combinational logic transforms that data between cycles.',
    takeaway: 'RTL = REGISTERS + COMBINATIONAL NETS',
    tag: 'WHAT IS RTL'
  },
  {
    id: 'MAC_RTL',
    title: 'DESCRIBE THE MAC IN VERILOG',
    eyebrow: 'STAGE 04 / 15 • MAC RTL',
    caption: 'Sequential hardware: on every positive clock edge, the accumulator register captures the old sum plus the product of x and w.',
    takeaway: 'always_ff @(posedge clk) acc <= acc + (x * w);',
    tag: 'MAC RTL'
  },
  {
    id: 'RELU_RTL',
    title: 'DESCRIBE ReLU IN VERILOG',
    eyebrow: 'STAGE 05 / 15 • ACTIVATION LOGIC',
    caption: 'ReLU(x) = max(0, x). In digital hardware, this is an ultra-fast sign-bit comparator multiplexer.',
    takeaway: 'assign relu_out = (acc[15] == 1\'b0) ? acc : 16\'d0;',
    tag: 'ReLU RTL'
  },
  {
    id: 'CONTROL_RTL',
    title: 'THE DATAPATH NEEDS CONTROL: FSM',
    eyebrow: 'STAGE 06 / 15 • CONTROL LOGIC',
    caption: 'The Finite State Machine (FSM) asserts load strobes, triggers compute cycles, and asserts valid output flags.',
    takeaway: 'DATAPATH (MUSCLE) + CONTROL FSM (BRAIN)',
    tag: 'FSM RTL'
  },
  {
    id: 'COMPLETE_RTL',
    title: 'NOW COMBINE THE BLOCKS',
    eyebrow: 'STAGE 07 / 15 • TOP-LEVEL MODULE',
    caption: 'Top-level Verilog wires Weight ROM, Parallel MACs, ReLU, and FSM into a cohesive synthesizable chip module.',
    takeaway: 'HIERARCHICAL STRUCTURAL VERILOG',
    tag: 'TOP MODULE'
  },
  {
    id: 'RTL_TO_YOSYS',
    title: 'NOW THE TOOLS TAKE OVER: YOSYS',
    eyebrow: 'STAGE 08 / 15 • LOGIC SYNTHESIS',
    caption: 'Yosys synthesizes Verilog into primitive hardware gates: Look-Up Tables (LUT4), Flip-Flops (DFF), and DSP multiplier cells.',
    takeaway: 'RTL SOURCE CODE → GATE-LEVEL NETLIST',
    tag: 'YOSYS SYNTH'
  },
  {
    id: 'NEXTNPNR',
    title: 'NEXT: PLACE + ROUTE (NEXTPNR)',
    eyebrow: 'STAGE 09 / 15 • PHYSICAL IMPLEMENTATION',
    caption: 'nextpnr maps gates onto exact physical X/Y coordinates in the iCE40UP5K silicon fabric and routes copper interconnect wires.',
    takeaway: 'GATE NETLIST → PHYSICAL PLACEMENT & ROUTING',
    tag: 'NEXTPNR P&R'
  },
  {
    id: 'BITSTREAM',
    title: 'GENERATE THE BITSTREAM (ICEPACK)',
    eyebrow: 'STAGE 10 / 15 • BINARY PACKAGING',
    caption: 'icepack packages the placed-and-routed design into a raw binary bitstream file (.bin) encoding every silicon switch state.',
    takeaway: 'BITSTREAM = HARDWARE SWITCH CONFIGURATION',
    tag: 'ICEPACK BITSTREAM'
  },
  {
    id: 'PROGRAM',
    title: 'SEND IT TO THE FPGA',
    eyebrow: 'STAGE 11 / 15 • FLASHING VIA ONBOARD FT232H',
    caption: 'iceprog streams the bitstream through the USB cable and onboard FT232H chip into the iCE40UP5K SRAM fabric.',
    takeaway: 'USB → ONBOARD FT232H → FPGA (NO EXTERNAL ADAPTER)',
    tag: 'ICEPROG OVER USB'
  },
  {
    id: 'FULL_FLOW',
    title: 'THE COMPLETE DESIGN FLOW',
    eyebrow: 'STAGE 12 / 15 • END-TO-END TOOLCHAIN',
    caption: 'AI Model → RTL → Yosys → nextpnr → icepack → iceprog → iCE40UP5K silicon execution.',
    takeaway: 'FROM MATHEMATICS TO PHYSICAL SILICON',
    tag: 'FULL TOOLCHAIN'
  },
  {
    id: 'KEY_DISTINCTION',
    title: 'WE DIDN\'T LOAD PYTHON',
    eyebrow: 'STAGE 13 / 15 • CRITICAL TAKEAWAY',
    caption: 'Python trained the model and quantized weights, but the FPGA executes raw silicon gates, not an interpreted Python script.',
    takeaway: 'WE DON\'T RUN PYTHON — WE BUILD COMPUTATION',
    tag: 'PYTHON VS SILICON'
  },
  {
    id: 'FINAL_MENTAL_MODEL',
    title: 'REMEMBER THIS: THE HIERARCHY',
    eyebrow: 'STAGE 14 / 15 • THE COMPLETE PYRAMID',
    caption: 'AI Model → Math → Hardware Architecture → RTL → Synthesis → Place & Route → Bitstream → FPGA Silicon.',
    takeaway: 'ABSTRACTION → HARDWARE PIPELINE',
    tag: 'THE HIERARCHY'
  },
  {
    id: 'LIVE_HANDOFF',
    title: 'ENOUGH THEORY. NOW WE BUILD IT.',
    eyebrow: 'STAGE 15 / 15 • LIVE WORKSHOP HANDOFF',
    caption: 'The theory is complete. Open your terminal, fire up the open-source EDA toolchain, and program the physical board!',
    takeaway: 'OPEN THE TOOLCHAIN • LIVE HANDS-ON WORKSHOP',
    tag: 'LIVE HANDS-ON'
  }
];

export const RTL_BUILD_BREADCRUMBS = [
  { id: 'THE_ARCHITECTURE', label: '01 ARCH' },
  { id: 'DECOMPOSE', label: '02 BLOCKS' },
  { id: 'RTL_MEANING', label: '03 RTL' },
  { id: 'MAC_RTL', label: '04 MAC RTL' },
  { id: 'RELU_RTL', label: '05 RELU RTL' },
  { id: 'CONTROL_RTL', label: '06 FSM' },
  { id: 'COMPLETE_RTL', label: '07 TOP MODULE' },
  { id: 'RTL_TO_YOSYS', label: '08 YOSYS' },
  { id: 'NEXTNPNR', label: '09 NEXTPNR' },
  { id: 'BITSTREAM', label: '10 BITS' },
  { id: 'PROGRAM', label: '11 FLASH' },
  { id: 'FULL_FLOW', label: '12 FULL FLOW' },
  { id: 'KEY_DISTINCTION', label: '13 NO PYTHON' },
  { id: 'FINAL_MENTAL_MODEL', label: '14 PYRAMID' },
  { id: 'LIVE_HANDOFF', label: '15 LIVE BUILD' }
];
