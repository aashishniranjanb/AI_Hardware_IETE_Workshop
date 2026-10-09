"use client";
import React from 'react';
import { AlertTriangle, Cpu, Globe, HardDrive, HelpCircle, Pause, Plug, Zap } from 'lucide-react';

// Maps the emoji/glyphs used in scene data to consistent line icons
// (emoji render differently on every OS / projector laptop).
const GLYPHS = {
  '▦': Cpu,
  '💾': HardDrive,
  '⚡': Zap,
  '🔌': Plug,
  '🌐': Globe,
  '⚠️': AlertTriangle,
  '⚠': AlertTriangle,
  '❓': HelpCircle,
  '⏸': Pause,
};

export function GlyphIcon({ glyph, size = 18, strokeWidth = 1.8, className = 'glyph-icon', ...rest }) {
  const Icon = GLYPHS[glyph];
  if (!Icon) return glyph ?? null;
  return <Icon size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" {...rest} />;
}

/** Inline icon for running text (sits on the text baseline). */
export function InlineIcon({ glyph, size = 15 }) {
  return <GlyphIcon glyph={glyph} size={size} className="inline-icon" />;
}
