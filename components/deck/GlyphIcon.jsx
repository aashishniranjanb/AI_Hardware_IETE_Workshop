"use client";
import React from 'react';
import {
  AlertTriangle, ArrowRight, BatteryCharging, Brain, Cable, CheckCircle2, CircuitBoard, Cpu, Globe, HardDrive,
  HelpCircle, LayoutGrid, Link2, MemoryStick, Network, Pause, Plug, Star, Zap,
} from 'lucide-react';

/*
 * One icon per concept across the whole deck (Lucide line icons).
 * Prefer the semantic keys; legacy emoji keys map onto the same icons so
 * older data still renders consistently.
 */
const ICONS = {
  // hardware concepts
  cpu: Cpu,
  gpu: LayoutGrid,
  npu: Brain,
  ai: Brain,
  fpga: CircuitBoard,
  memory: MemoryStick,
  storage: HardDrive,
  network: Network,
  internet: Globe,
  pcie: Plug,
  nvlink: Link2,
  noc: Cable,
  power: BatteryCharging,
  energy: Zap,
  // status / annotation
  warning: AlertTriangle,
  question: HelpCircle,
  paused: Pause,
  success: CheckCircle2,
  note: Star,
  next: ArrowRight,
  // legacy glyphs → same icons
  '▦': Cpu,
  '💾': HardDrive,
  '⚡': Zap,
  '🔌': Plug,
  '🌐': Globe,
  '⚠️': AlertTriangle,
  '⚠': AlertTriangle,
  '❓': HelpCircle,
  '⏸': Pause,
  '★': Star,
  '✓': CheckCircle2,
  '➔': ArrowRight,
};

export function GlyphIcon({ glyph, size = 18, strokeWidth = 1.8, className = 'glyph-icon', ...rest }) {
  const Icon = ICONS[glyph];
  if (!Icon) return glyph ?? null;
  return <Icon size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" {...rest} />;
}

/** Inline icon for running text (sits on the text baseline). */
export function InlineIcon({ glyph, size = 15 }) {
  return <GlyphIcon glyph={glyph} size={size} className="inline-icon" />;
}
