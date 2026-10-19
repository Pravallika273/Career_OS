/**
 * CareerOS Design System Tokens
 * Calm · Intelligent · Friendly · Premium · Modern · Human · Motivating
 */

export const COLOR_TOKENS = {
  // Brand & Core
  midnightInk: '#101828', // Primary text and deep foundation
  careerIndigo: '#5B5BD6', // Main brand accent
  indigoHover: '#4B4BC2',
  indigoLight: '#EEEDFC',
  lavenderMist: '#F0EEFF', // Gentle brand backing & secondary surfaces
  
  // Semantic Progress & Action
  freshMint: '#21B47A', // Progress & success
  mintLight: '#E8F8F1',
  mintHover: '#1B9A67',

  // Semantic Attention & Warning (used sparingly)
  softCoral: '#F26B5B', // Attention, warnings, human alerts
  coralLight: '#FDF0EE',
  coralHover: '#E05847',

  // Canvas & Neutrals
  warmCloud: '#F8F8F5', // Ambient background
  surface: '#FFFFFF', // Clean card surface
  surfaceSubtle: '#F4F3EF',
  
  // Borders & Dividers
  borderSubtle: '#E8E6DF',
  borderStrong: '#D3D0C6',

  // Typographic Tones
  textPrimary: '#101828',
  textSecondary: '#475467',
  textMuted: '#667085',
  textSubtle: '#98A2B3',
} as const;

export const TYPOGRAPHY = {
  fontSans: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontMono: '"JetBrains Mono", monospace',
} as const;

export const TRANSITIONS = {
  default: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
  fast: 'all 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
} as const;
