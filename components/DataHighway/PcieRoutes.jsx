import React, { useLayoutEffect, useRef, useState } from 'react';
import { ConnectionPath } from './ConnectionPath';

/**
 * PCIe topology routes measured from the live layout: every device connects
 * to the shared backbone bar; two example transfers travel device → backbone
 * → device along those real routes:
 *   NVMe SSD → backbone → HOST CPU   (storage read into the host)
 *   400G NIC → backbone → AI GPU     (network data into the accelerator)
 */
export function PcieRoutes() {
  const [geo, setGeo] = useState(null);
  // Own anchor: a parent's ref is not attached yet when a child's layout effect runs.
  const anchorRef = useRef(null);

  useLayoutEffect(() => {
    const root = anchorRef.current?.parentElement;
    if (!root) return;
    const measure = () => {
      const box = root.getBoundingClientRect();
      const zoom = parseFloat(getComputedStyle(root).zoom) || 1;
      const rel = (el) => {
        const r = el.getBoundingClientRect();
        // getBoundingClientRect is in zoomed px; convert to the container's own units
        return {
          cx: (r.left + r.width / 2 - box.left) / zoom,
          top: (r.top - box.top) / zoom,
          bottom: (r.bottom - box.top) / zoom,
        };
      };
      const top = [...root.querySelectorAll('.pcie-root-top .dh-data-node')].map(rel);
      const dev = [...root.querySelectorAll('.pcie-devices-row .dh-data-node')].map(rel);
      const bar = root.querySelector('.pcie-bus-bar');
      if (top.length < 2 || dev.length < 3 || !bar) return;
      const b = rel(bar);
      // Ride along the bar's lower edge so the route never strikes through its label.
      const busY = b.bottom - 7;
      const [cpu, gpu] = top;
      const [nvme, nic] = dev;
      setGeo({
        w: box.width / zoom,
        h: box.height / zoom,
        stubs: [...top.map((n) => `M ${n.cx} ${n.bottom} L ${n.cx} ${b.top}`), ...dev.map((n) => `M ${n.cx} ${n.top} L ${n.cx} ${b.bottom}`)],
        routes: [
          { id: 'pcie-nvme-cpu', d: `M ${nvme.cx} ${nvme.top} L ${nvme.cx} ${busY} L ${cpu.cx} ${busY} L ${cpu.cx} ${cpu.bottom}`, color: '#94A3B8' },
          { id: 'pcie-nic-gpu', d: `M ${nic.cx} ${nic.top} L ${nic.cx} ${busY} L ${gpu.cx} ${busY} L ${gpu.cx} ${gpu.bottom}`, color: '#22D3EE' },
        ],
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  if (!geo) return <span ref={anchorRef} hidden />;
  return (
    <>
    <span ref={anchorRef} hidden />
    <svg className="pcie-routes-svg" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
      {geo.stubs.map((d, i) => (
        <path key={i} d={d} className="pcie-stub" />
      ))}
      {geo.routes.map((r, i) => (
        <ConnectionPath key={r.id} id={r.id} d={r.d} color={r.color} width={3} speed="slow" bidirectional={false} delay={0.9 + i * 0.8} />
      ))}
    </svg>
    </>
  );
}
