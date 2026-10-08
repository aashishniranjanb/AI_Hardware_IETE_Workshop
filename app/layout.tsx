// Self-hosted fonts (offline-safe): same family names as before ('Inter', 'Space Grotesk').
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';
import './tokens.css';
import './globals.css';
import './ui.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = { title: 'AI Hardware — IETE Club', description: 'Interactive AI Hardware workshop web deck' };
export const viewport: Viewport = { themeColor: '#05070B' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
