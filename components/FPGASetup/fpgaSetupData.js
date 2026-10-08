export const FPGA_SETUP_STAGES = [
  {
    id: 0,
    tag: "THE BOARD",
    eyebrow: "STAGE 01 / 13 • HARDWARE ARRIVAL",
    title: "THIS IS OUR FPGA",
    caption: "VSDSQUADRON FPGA MINI: LATTICE iCE40UP5K",
    narration: "Here is the actual hardware: the VSDSquadron FPGA Mini with the Lattice iCE40UP5K chip right at the center.",
    takeaway: "THE PHYSICAL FPGA DEVELOPMENT BOARD IS ON OUR DESK",
    callout: "VSDSQUADRON FPGA MINI"
  },
  {
    id: 1,
    tag: "ONBOARD",
    eyebrow: "STAGE 02 / 13 • INTEGRATED HARDWARE",
    title: "WHAT'S ON THE BOARD?",
    caption: "FPGA FABRIC + SPI FLASH + GPIO + ONBOARD USB INTERFACE",
    narration: "The board packages the iCE40UP5K FPGA, high-speed SPI Flash memory, 32 GPIO header pins, and an integrated USB interface.",
    takeaway: "PACKAGES THE FPGA AND ALL SUPPORTING SILICON INTO ONE BOARD",
    callout: "INTEGRATED SYSTEM"
  },
  {
    id: 2,
    tag: "ONE CABLE",
    eyebrow: "STAGE 03 / 13 • PHYSICAL LINK",
    title: "ONE USB CABLE",
    caption: "DIRECT CONNECTION: LAPTOP → BOARD",
    narration: "A single standard USB cable provides both the programming communication bus and the board-side power.",
    takeaway: "ONE USB CABLE FOR PROGRAMMING + COMMUNICATION",
    callout: "USB LINK"
  },
  {
    id: 3,
    tag: "ONBOARD FT232H",
    eyebrow: "STAGE 04 / 13 • NO DONGLE NEEDED",
    title: "THE PROGRAMMER IS ALREADY ON THE BOARD",
    caption: "NO EXTERNAL FT232H ADAPTER OR JTAG DONGLE REQUIRED",
    narration: "The onboard FT232H chip bridges USB to the FPGA SPI programming pins automatically. No external debugger or breakout is required.",
    takeaway: "NO EXTERNAL FT232H REQUIRED: PROGRAMMER IS BUILT-IN",
    callout: "NO EXTERNAL ADAPTER"
  },
  {
    id: 4,
    tag: "DATAFLOW",
    eyebrow: "STAGE 05 / 13 • TRANSMISSION",
    title: "WHAT DOES USB ACTUALLY DO?",
    caption: "BITSTREAM → USB → ONBOARD FT232H → iCE40UP5K",
    narration: "The toolchain sends the generated binary configuration stream over USB. The onboard FT232H translates packets directly into FPGA SRAM.",
    takeaway: "THE USB CABLE IS ENOUGH FOR OUR ENTIRE PIPELINE",
    callout: "STREAMING BITSTREAM"
  },
  {
    id: 5,
    tag: "POWER & DATA",
    eyebrow: "STAGE 06 / 13 • DUAL FUNCTION",
    title: "POWER + DATA",
    caption: "SIMULTANEOUS POWER DELIVERY & HIGHSPEED DATA",
    narration: "The USB connection provides both the operating board power and the high-speed data path for flashing bitstreams and UART telemetry.",
    takeaway: "USB DELIVERS BOTH WORKSHOP POWER AND PROGRAMMING DATA",
    callout: "POWER + DATA"
  },
  {
    id: 6,
    tag: "SEND STREAM",
    eyebrow: "STAGE 07 / 13 • FLASHING",
    title: "SEND THE BITSTREAM",
    caption: "STREAMING CONFIGURATION DATA INTO HARDWARE",
    narration: "A bitstream packet travels from the laptop, through the onboard FT232H, and into the iCE40UP5K configuration SRAM.",
    takeaway: "PACKET TRANSFERS HARDWARE DEFINITION TO SILICON",
    callout: "FLASHING BITSTREAM"
  },
  {
    id: 7,
    tag: "CONFIGURED",
    eyebrow: "STAGE 08 / 13 • ACTIVE SILICON",
    title: "THE FPGA IS NOW CONFIGURED",
    caption: "EMPTY FABRIC TRANSFORMS INTO YOUR CUSTOM CIRCUIT",
    narration: "The switch matrix nodes close and LUT memory cells configure. The FPGA physically morphs into your digital circuit.",
    takeaway: "YOUR DIGITAL CIRCUIT EXISTS INSIDE THE PHYSICAL FPGA",
    callout: "HARDWARE CONFIGURED"
  },
  {
    id: 8,
    tag: "FIRST TEST",
    eyebrow: "STAGE 09 / 13 • HARDWARE VALIDATION",
    title: "FIRST TEST: BLINK",
    caption: "VERIFY THE TOOLCHAIN & PROGRAMMING PATH",
    narration: "Before running complex AI math, we verify the end-to-end hardware toolchain with a simple clock counter blinking an LED.",
    takeaway: "IF BLINK WORKS → THE ENTIRE FPGA PIPELINE WORKS",
    callout: "VALIDATION: BLINK"
  },
  {
    id: 9,
    tag: "THEN AI",
    eyebrow: "STAGE 10 / 13 • UPGRADING CIRCUIT",
    title: "THEN WE REPLACE BLINK WITH AI",
    caption: "SAME BOARD, SAME USB CABLE → MORE POWERFUL CIRCUIT",
    narration: "Once the programming pipeline is proven, we swap the simple blink logic with our parallel MAC digit recognition accelerator.",
    takeaway: "SAME BOARD. SAME CABLE. MORE POWERFUL CIRCUIT.",
    callout: "UPGRADE TO AI"
  },
  {
    id: 10,
    tag: "COMPLETE SETUP",
    eyebrow: "STAGE 11 / 13 • FULL ARCHITECTURE",
    title: "OUR COMPLETE WORKSHOP SETUP",
    caption: "LAPTOP → USB → ONBOARD FT232H → iCE40UP5K → OUTPUT",
    narration: "Our entire laboratory setup: a laptop running open-source synthesis tools connected directly to the VSDSquadron FPGA Mini via USB.",
    takeaway: "LAPTOP → USB → ONBOARD FT232H → iCE40UP5K → OUTPUT",
    callout: "COMPLETE BENCHTOP SETUP"
  },
  {
    id: 11,
    tag: "HARDWARE READY",
    eyebrow: "STAGE 12 / 13 • BENCHTOP STATUS",
    title: "HARDWARE READY",
    caption: "NO EXTERNAL PROGRAMMER • USB IS ALL WE NEED",
    narration: "Everything is plugged in and ready. No dongles, no complex wiring, no external power bricks.",
    takeaway: "NO EXTERNAL PROGRAMMER. USB IS ENOUGH.",
    callout: "BOARD CONNECTED"
  },
  {
    id: 12,
    tag: "LET'S PROGRAM",
    eyebrow: "STAGE 13 / 13 • FIRST PROGRAM",
    title: "NOW LET'S PROGRAM IT",
    caption: "CONNECT → BUILD → PROGRAM → TEST",
    narration: "Now let's launch the toolchain, write the code, generate the bitstream, and watch our circuit come to life.",
    takeaway: "CONNECT → BUILD → PROGRAM → TEST",
    callout: "NEXT → FIRST FPGA PROGRAM"
  }
];

export const FPGA_SETUP_BREADCRUMBS = [
  { id: 0, label: "THE BOARD" },
  { id: 1, label: "ONBOARD" },
  { id: 2, label: "USB CABLE" },
  { id: 3, label: "FT232H" },
  { id: 4, label: "DATAFLOW" },
  { id: 5, label: "POWER/DATA" },
  { id: 6, label: "SENDING" },
  { id: 7, label: "CONFIGURED" },
  { id: 8, label: "BLINK" },
  { id: 9, label: "THEN AI" },
  { id: 10, label: "SETUP" },
  { id: 11, label: "READY" },
  { id: 12, label: "PROGRAM" }
];
