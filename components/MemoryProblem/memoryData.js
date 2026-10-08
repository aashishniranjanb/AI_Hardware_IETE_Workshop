export const MEMORY_LEVELS = [
  {
    id: 'cache',
    name: 'CACHE (SRAM)',
    capacity: 'MBs (e.g. 32MB - 128MB)',
    latency: '< 1 - 5 ns',
    bandwidth: '~10 - 20 TB/s (On-Die)',
    proximity: 'ON-CHIP (Inside Die)',
    color: '#38BDF8',
    summary: 'Extremely fast and ultra close, but physical silicon area strictly limits capacity.',
    badge: 'ULTRA FAST • ON-DIE'
  },
  {
    id: 'hbm',
    name: 'HBM3e (STACKED 3D)',
    capacity: 'Tens of GBs (e.g. 96GB - 288GB)',
    latency: '~50 - 80 ns',
    bandwidth: '3 - 8 TB/s (Wide Bus)',
    proximity: 'IN-PACKAGE (Interposer)',
    color: '#60A5FA',
    summary: 'Vertical 3D silicon through-silicon via (TSV) stacks wired via interposer directly next to GPU/NPU.',
    badge: 'MASSIVE BANDWIDTH • AI GOLD STANDARD'
  },
  {
    id: 'ram',
    name: 'SYSTEM RAM (DDR5)',
    capacity: 'Hundreds of GBs (e.g. 128GB - 2TB)',
    latency: '~70 - 120 ns',
    bandwidth: '~100 - 400 GB/s',
    proximity: 'OFF-PACKAGE (DIMM Sockets)',
    color: '#22D3EE',
    summary: 'Generous operating capacity across motherboard traces, but limited pin count limits raw bandwidth.',
    badge: 'LARGE CAPACITY • MOTHERBOARD'
  },
  {
    id: 'storage',
    name: 'STORAGE (NVMe SSD)',
    capacity: 'Terabytes to Petabytes',
    latency: '~10,000 - 50,000 ns (10-50 µs)',
    bandwidth: '~7 - 14 GB/s (PCIe Gen5)',
    proximity: 'OFF-BOARD (PCIe / Fabric)',
    color: '#94A3B8',
    summary: 'Massive persistent storage holding training datasets and model weights, but millions of times slower than on-die cache.',
    badge: 'PERSISTENT • BULK CAPACIOUS'
  }
];

export const MEMORY_STAGES = [
  {
    id: 'entry',
    label: 'COMPUTE ENGINE',
    kicker: 'RECAP FROM SLIDE 04',
    title: 'THE HUNGRY ENGINE',
    subtitle: 'The compute accelerator is powered up and ready to crunch trillions of operations.',
    status: 'ACTIVE'
  },
  {
    id: 'waiting',
    label: 'THE BOTTLENECK',
    kicker: 'THE FIRST SURPRISE',
    title: 'WAITING FOR DATA',
    subtitle: 'A fast processor cannot compute if the data stream dries up.',
    status: 'STARVED'
  },
  {
    id: 'where_is_data',
    label: 'DATA SOURCING',
    kicker: 'THE SEARCH',
    title: 'WHERE IS THE DATA?',
    subtitle: 'Data has to travel across physical distances through silicon and circuit boards.',
    status: 'SEARCHING'
  },
  {
    id: 'cache',
    label: 'LEVEL 1: CACHE',
    kicker: 'ON-CHIP MEMORY',
    title: 'L1 / L2 / L3 SRAM CACHES',
    subtitle: 'Tiny, blistering fast memory right next to the arithmetic units.',
    status: 'CACHE'
  },
  {
    id: 'ram',
    label: 'LEVEL 2: SYSTEM RAM',
    kicker: 'WORKING MEMORY',
    title: 'MAIN MEMORY (DDR5)',
    subtitle: 'Much more room for active programs, but separated by motherboard buses.',
    status: 'RAM'
  },
  {
    id: 'hbm',
    label: 'LEVEL 3: HBM3e',
    kicker: 'AI ACCELERATOR SECRET',
    title: 'HIGH-BANDWIDTH MEMORY',
    subtitle: '3D stacked silicon dies on an interposer providing thousands of parallel data lanes.',
    status: 'HBM'
  },
  {
    id: 'storage',
    label: 'LEVEL 4: STORAGE',
    kicker: 'PERSISTENT ARCHIVE',
    title: 'NVMe SSD & STORAGE POOL',
    subtitle: 'Where models and massive datasets sleep permanently.',
    status: 'STORAGE'
  },
  {
    id: 'hierarchy',
    label: 'THE FULL PYRAMID',
    kicker: 'CAPACITY VS LATENCY',
    title: 'THE MEMORY HIERARCHY',
    subtitle: 'Closer means faster and smaller. Farther means larger and slower.',
    status: 'HIERARCHY'
  },
  {
    id: 'bandwidth',
    label: 'BANDWIDTH LANES',
    kicker: 'THROUGHPUT METRIC',
    title: 'WHAT IS MEMORY BANDWIDTH?',
    subtitle: 'Bandwidth is the width of the highway feeding bytes into the compute core per second.',
    status: 'BANDWIDTH'
  },
  {
    id: 'waiting_game',
    label: 'INTERACTIVE DEMO',
    kicker: 'HANDS-ON SIMULATION',
    title: 'THE WAITING GAME',
    subtitle: 'Watch 20 parallel compute cores: starving on a single lane vs 100% busy on wide lanes.',
    status: 'GAME'
  },
  {
    id: 'system_performance',
    label: 'THE CRITICAL LESSON',
    kicker: 'ARCHITECTURAL TRUTH',
    title: 'COMPUTE ≠ SYSTEM PERFORMANCE',
    subtitle: 'Your chip can boast 1,000 TeraFLOPS, but if memory only delivers 10 GB/s, the chip sits idle.',
    status: 'TAKEAWAY'
  },
  {
    id: 'teaser',
    label: 'NEXT: INTERCONNECT',
    kicker: 'THE COMING CHALLENGE',
    title: 'SO HOW DO WE MOVE ALL THIS DATA?',
    subtitle: 'Enter the high-speed data highways: PCIe, NVLink, and Optical Fabrics.',
    status: 'TEASER'
  }
];
