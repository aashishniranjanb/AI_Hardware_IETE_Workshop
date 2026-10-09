import React from 'react';
import { Activity, BatteryCharging, Brain, Cpu, Eye, Mic, Radio, Thermometer, Cog, MemoryStick } from 'lucide-react';

// One icon per subsystem, used everywhere Chitti's subsystems appear.
const ICONS = {
  vision: Eye,
  audio: Mic,
  compute: Cpu,
  memory: MemoryStick,
  communication: Radio,
  thermal: Thermometer,
  power: BatteryCharging,
  actuation: Cog,
  sensors: Activity,
  brain: Brain,
};

export function SubsystemIcon({ id, size = 16 }) {
  const Icon = ICONS[id] || Cpu;
  return <Icon size={size} strokeWidth={1.8} className="subsystem-icon" aria-hidden="true" />;
}
