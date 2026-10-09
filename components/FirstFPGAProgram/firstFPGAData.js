// Stage definitions and data for Slide 15: FIRST FPGA PROGRAM (MAKE IT DO SOMETHING)

export const FIRST_FPGA_STAGES = [
  {
    id: 'WHY_BLINK',
    title: 'WHY START WITH BLINK?',
    eyebrow: 'STAGE 01 / 14 • VERIFY THE ENTIRE PATH',
    caption: 'Before debugging an AI accelerator, first prove that the FPGA programming path itself works.',
    takeaway: 'SMALLEST POSSIBLE HARDWARE TEST',
    tag: 'VERIFY PIPELINE'
  },
  {
    id: 'RTL_CONCEPT',
    title: 'WHAT ARE WE ASKING THE FPGA TO DO?',
    eyebrow: 'STAGE 02 / 14 • THE HARDWARE CONCEPT',
    caption: 'Instead of telling a CPU to execute a loop, we describe a digital circuit containing a counter and output logic.',
    takeaway: 'THIS IS HARDWARE, NOT SOFTWARE',
    tag: 'CIRCUIT NOT LOOP'
  },
  {
    id: 'VERILOG',
    title: 'WRITE THE RTL',
    eyebrow: 'STAGE 03 / 14 • VERILOG HARDWARE DESCRIPTION',
    caption: 'RTL describes the behavior and structure of registers and logic gates in hardware description language.',
    takeaway: 'RTL DESCRIBES THE CIRCUIT',
    tag: 'VERILOG RTL'
  },
  {
    id: 'CLOCK',
    title: 'THE CLOCK DRIVES EVERYTHING',
    eyebrow: 'STAGE 04 / 14 • SEQUENTIAL TIMING',
    caption: 'Digital sequential logic changes state in response to clock events. Each clock edge increments the counter.',
    takeaway: 'CLOCK RISING EDGE → STATE CHANGE',
    tag: 'TIMING & CLK'
  },
  {
    id: 'SYNTHESIS',
    title: 'COMPILE THE HARDWARE: SYNTHESIS',
    eyebrow: 'STAGE 05 / 14 • SYNTHESIS',
    caption: 'Synthesis converts the high-level RTL description into primitive hardware cells: Look-Up Tables (LUTs) & Flip-Flops (FFs).',
    takeaway: 'RTL CODE → PRIMITIVE HARDWARE BLOCKS',
    tag: 'LOGIC SYNTHESIS'
  },
  {
    id: 'PLACE_ROUTE',
    title: 'PLACE + ROUTE (NEXTPNR)',
    eyebrow: 'STAGE 06 / 14 • PHYSICAL IMPLEMENTATION',
    caption: 'The implementation tools map logic onto exact physical coordinates in the iCE40UP5K fabric and route interconnect wires.',
    takeaway: 'MAP THE CIRCUIT INTO SILICON FABRIC',
    tag: 'PLACE & ROUTE'
  },
  {
    id: 'BITSTREAM',
    title: 'GENERATE THE BITSTREAM',
    eyebrow: 'STAGE 07 / 14 • BINARY HARDWARE ENCODING',
    caption: 'The bitstream contains the full configuration information produced from the placed and routed digital circuit.',
    takeaway: 'BITSTREAM = HARDWARE SWITCH CONFIGURATION',
    tag: 'ICEPACK / BITSTREAM'
  },
  {
    id: 'PROGRAM',
    title: 'PROGRAM THE FPGA',
    eyebrow: 'STAGE 08 / 14 • FLASHING VIA ONBOARD FT232H',
    caption: 'The bitstream streams over USB through the onboard FT232H directly to the iCE40UP5K SRAM configuration memory.',
    takeaway: 'USB → ONBOARD FT232H → FPGA (NO EXTERNAL ADAPTER)',
    tag: 'ICEPROG OVER USB'
  },
  {
    id: 'CONFIGURED',
    title: 'THE CIRCUIT NOW EXISTS IN SILICON',
    eyebrow: 'STAGE 09 / 14 • PHYSICAL REALIZATION',
    caption: 'The SRAM cells configure the switch matrix and logic blocks. The circuit described in Verilog is now physical wire and logic.',
    takeaway: 'RTL DESCRIPTION → REAL RUNNING CIRCUIT',
    tag: 'SILICON ACTIVE'
  },
  {
    id: 'LED',
    title: 'AND NOW... IT BLINKS!',
    eyebrow: 'STAGE 10 / 14 • EXPECTED OUTPUT',
    caption: 'The high-order counter bit drives the LED pin. Simulated here — on the VSDSquadron FPGA Mini, check that the physical LED blinks.',
    takeaway: 'SIMULATED • VERIFY ON THE BOARD',
    tag: 'LED OUTPUT'
  },
  {
    id: 'WHAT_PROVED',
    title: 'WHAT DID WE JUST PROVE?',
    eyebrow: 'STAGE 11 / 14 • 7-POINT VERIFICATION',
    caption: 'A successful blink proves the entire end-to-end development pipeline from RTL compiler to silicon execution.',
    takeaway: 'THE FULL HARDWARE PIPELINE IS VALIDATED',
    tag: 'PIPELINE VERIFIED'
  },
  {
    id: 'NOW_REPLACE',
    title: 'NOW REPLACE THE BLINKER',
    eyebrow: 'STAGE 12 / 14 • SCALING UP THE CIRCUIT',
    caption: 'The workflow does not change. We swap the 24-bit counter circuit with a parallel MAC matrix computation engine.',
    takeaway: 'SAME FPGA • SAME TOOLS • MASSIVE AI CIRCUIT',
    tag: 'UPGRADE TO AI'
  },
  {
    id: 'AI_TARGET',
    title: 'THE REAL TARGET: DIGIT RECOGNIZER',
    eyebrow: 'STAGE 13 / 14 • WORKSHOP TARGET',
    caption: 'The blinker was the hardware sanity check. The actual target is 784-input MAC array classifying handwritten digits.',
    takeaway: 'BLINK → PARALLEL MAC → AI ACCELERATOR',
    tag: 'NEURAL HARDWARE'
  },
  {
    id: 'HANDOFF',
    title: 'FIRST TEST PASSED • READY FOR AI',
    eyebrow: 'STAGE 14 / 14 • HANDOFF TO SLIDE 16',
    caption: 'Hardware setup validated, synthesis pipeline validated, flashing validated. Now let us build the AI hardware engine!',
    takeaway: 'MODEL → MAC → RTL → FPGA',
    tag: 'NEXT: AI ACCELERATOR'
  }
];

export const FIRST_FPGA_BREADCRUMBS = [
  { id: 'WHY_BLINK', label: '01 WHY BLINK' },
  { id: 'RTL_CONCEPT', label: '02 CONCEPT' },
  { id: 'VERILOG', label: '03 VERILOG' },
  { id: 'CLOCK', label: '04 CLOCK' },
  { id: 'SYNTHESIS', label: '05 SYNTH' },
  { id: 'PLACE_ROUTE', label: '06 P&R' },
  { id: 'BITSTREAM', label: '07 BITS' },
  { id: 'PROGRAM', label: '08 FLASH' },
  { id: 'CONFIGURED', label: '09 CONFIGURED' },
  { id: 'LED', label: '10 LED' },
  { id: 'WHAT_PROVED', label: '11 PROVED' },
  { id: 'NOW_REPLACE', label: '12 SWAP' },
  { id: 'AI_TARGET', label: '13 AI' },
  { id: 'HANDOFF', label: '14 HANDOFF' }
];
