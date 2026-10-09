export const HIGHWAY_STAGES = [
  {
    id: 'entry',
    label: 'ENTRY FROM MEMORY',
    kicker: 'THE FOUNDATION',
    title: 'COMPUTE & MEMORY LINK',
    subtitle: 'Slide 05 established that compute needs memory. But how does that data actually move?',
    tag: 'LINK'
  },
  {
    id: 'single_link',
    label: 'SINGLE DATA LINK',
    kicker: 'THE SIMPLEST PATH',
    title: 'THE BASIC DATA LINK',
    subtitle: 'At the simplest physical level, silicon components exchange data across an electrical trace.',
    tag: 'POINT-TO-POINT'
  },
  {
    id: 'data_lanes',
    label: 'MULTIPLE LANES',
    kicker: 'SCALING THROUGHPUT',
    title: 'PARALLEL DATA HIGHWAY',
    subtitle: 'One lane is a bottleneck. High-performance systems multiply parallel lanes to increase bandwidth.',
    tag: 'MULTI-LANE'
  },
  {
    id: 'pcie',
    label: 'PCIe INTERCONNECT',
    kicker: 'SYSTEM-LEVEL BUS',
    title: 'PCIe (PERIPHERAL COMPONENT INTERCONNECT)',
    subtitle: 'The universal serial backbone connecting GPUs, CPUs, NVMe SSDs, and network adapters across a motherboard.',
    tag: 'SYSTEM-LEVEL'
  },
  {
    id: 'gpu_to_gpu',
    label: 'GPU ↔ GPU DEMAND',
    kicker: 'ACCELERATOR COOPERATION',
    title: 'WHEN ACCELERATORS MUST TALK',
    subtitle: 'Modern AI models do not fit on a single chip. GPUs must exchange weights, gradients, and activations continuously.',
    tag: 'PEER-TO-PEER'
  },
  {
    id: 'nvlink',
    label: 'NVLINK',
    kicker: 'DEDICATED GPU FABRIC',
    title: 'NVIDIA NVLINK INTERCONNECT',
    subtitle: 'Bypassing PCIe bottlenecks with up to 1.8 TB/s bidirectional accelerator-to-accelerator bandwidth.',
    tag: 'HIGH-SPEED FABRIC'
  },
  {
    id: 'multi_gpu',
    label: 'ACCELERATOR MESH',
    kicker: 'SCALING THE CLUSTER',
    title: 'MULTI-GPU COMMUNICATION MESH',
    subtitle: 'Connecting 4, 8, or more GPUs into a single unified shared-memory domain.',
    tag: 'ALL-TO-ALL MESH'
  },
  {
    id: 'noc',
    label: 'ON-CHIP NoC',
    kicker: 'INSIDE SILICON',
    title: 'NoC (NETWORK-ON-CHIP)',
    subtitle: 'Zooming inside the silicon die: high-speed packet-switched routing connecting compute cores, caches, and memory controllers.',
    tag: 'INSIDE CHIP'
  },
  {
    id: 'network',
    label: 'DATA CENTER NETWORK',
    kicker: 'BETWEEN SERVERS',
    title: 'ETHERNET & INFINIBAND FABRICS',
    subtitle: 'Scaling out across racks and data centers through high-throughput optical switches and low-latency RDMA.',
    tag: 'CLUSTER SCALE'
  },
  {
    id: 'three_level_view',
    label: 'THE 4 TIERS',
    kicker: 'HIERARCHICAL SCOPE',
    title: 'WHERE DATA MOVES: THE 4 TIERS',
    subtitle: 'NoC (Inside Chip) → NVLink (Between GPUs) → PCIe (Between Devices) → Network (Between Machines).',
    tag: 'TAXONOMY'
  },
  {
    id: 'data_fabric',
    label: 'UNIFIED FABRIC',
    kicker: 'SYSTEM ARCHITECTURE',
    title: 'THE COMPLETE DATA FABRIC',
    subtitle: 'Compute creates the intelligence. Interconnect moves it across the machine.',
    tag: 'FULL FABRIC'
  },
  {
    id: 'highway',
    label: 'THE DATA HIGHWAY',
    kicker: 'CORE TAKEAWAY',
    title: 'COMPUTE IS ONLY AS FAST AS DATA MOVEMENT',
    subtitle: 'More compute means more data. The interconnect is the true lifeline of modern AI.',
    tag: 'HIGHWAY'
  },
  {
    id: 'blackwell_teaser',
    label: 'NEXT: BLACKWELL',
    kicker: 'WHAT HAPPENS WHEN WE SCALE?',
    title: 'WHAT HAPPENS WHEN WE SCALE THIS?',
    subtitle: 'Take 72 Blackwell GPUs, 5,184 NVLink cables, and liquid cooling: The NVL72 Supercomputer.',
    tag: 'TEASER'
  }
];

export const INTERCONNECT_TIERS = [
  {
    id: 'noc',
    name: 'NoC (NETWORK-ON-CHIP)',
    scope: 'Inside a Single Chip',
    bandwidth: '~10 - 20 TB/s (Crossbar/Mesh)',
    latency: '< 5 ns',
    tech: 'On-Die Packet Switched Routers',
    role: 'Routes packets between CPU/GPU cores, L2/L3 caches, and memory controllers on the silicon die.',
    color: '#38BDF8',
    icon: 'noc'
  },
  {
    id: 'nvlink',
    name: 'NVLINK',
    scope: 'Between AI Accelerators (GPU-to-GPU)',
    bandwidth: '900 GB/s - 1.8 TB/s per GPU',
    latency: '~50 - 100 ns',
    tech: 'High-speed differential copper traces / NVLink Switch',
    role: 'Enables GPUs to read/write directly to peer GPU memory with shared address space at memory-like speeds.',
    color: '#60A5FA',
    icon: 'nvlink'
  },
  {
    id: 'pcie',
    name: 'PCIe (Gen 5 / Gen 6)',
    scope: 'Between Components on Motherboard',
    bandwidth: '64 - 128 GB/s (x16 slot)',
    latency: '~150 - 300 ns',
    tech: 'Motherboard PCB traces, Root Complex',
    role: 'Connects host CPU to GPUs, high-speed NVMe storage drives, and network interface cards (NICs).',
    color: '#22D3EE',
    icon: 'pcie'
  },
  {
    id: 'network',
    name: 'ETHERNET / INFINIBAND',
    scope: 'Between Server Racks / Data Center',
    bandwidth: '400 Gb/s - 800 Gb/s (50 - 100 GB/s) per port',
    latency: '~1 - 3 µs (RDMA)',
    tech: 'Optical Transceivers, Spine-Leaf Switches',
    role: 'Clusters tens of thousands of servers together into supercomputing clusters like xAI Colossus or NVL72 pods.',
    color: '#A855F7',
    icon: 'network'
  }
];
