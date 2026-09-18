export interface ThemeTokens {
  name: string;
  primary: string; // Primary CTA, accents, highlights
  primaryForeground: string;
  secondary: string; // Hero panels, dark section fills
  secondaryForeground: string;
  minor: string; // Page background fill / Ivory
  background: string;
  foreground: string; // Body text / Ebony / Charcoal
  card: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  ring: string;
  badgeSale: string;
  badgeSuccess: string;
  badgeError: string;
  ebony: string;
}

export type ThemePresetKey =
  | 'luxury-purple-gold'
  | 'black-rose-gold'
  | 'soft-pink-plum'
  | 'emerald-luxury'
  | 'modern-monochrome'
  | 'purple-pink-gradient'
  | 'champagne-luxury';

export const themePresets: Record<ThemePresetKey, ThemeTokens> = {
  'luxury-purple-gold': {
    name: 'Luxury Purple & Gold',
    primary: '#5B21B6',
    primaryForeground: '#FFFFFF',
    secondary: '#1F2937',
    secondaryForeground: '#FAF7F2',
    minor: '#FAF7F2',
    background: '#FAF7F2',
    foreground: '#1F2937',
    card: '#FFFFFF',
    cardForeground: '#1F2937',
    muted: '#F3E8FF',
    mutedForeground: '#6B7280',
    accent: '#D4AF37',
    accentForeground: '#1F2937',
    border: '#E9D5FF',
    ring: '#5B21B6',
    badgeSale: '#DC2626',
    badgeSuccess: '#10B981',
    badgeError: '#EF4444',
    ebony: '#1F2937',
  },
  'black-rose-gold': {
    name: 'Black & Rose Gold',
    primary: '#B76E79',
    primaryForeground: '#FFFFFF',
    secondary: '#0F172A',
    secondaryForeground: '#F8F5F2',
    minor: '#F8F5F2',
    background: '#F8F5F2',
    foreground: '#0F172A',
    card: '#FFFFFF',
    cardForeground: '#0F172A',
    muted: '#F1F5F9',
    mutedForeground: '#9CA3AF',
    accent: '#F1D5DA',
    accentForeground: '#0F172A',
    border: '#E2E8F0',
    ring: '#B76E79',
    badgeSale: '#DC2626',
    badgeSuccess: '#10B981',
    badgeError: '#EF4444',
    ebony: '#0F172A',
  },
  'soft-pink-plum': {
    name: 'Soft Pink & Plum',
    primary: '#7E22CE',
    primaryForeground: '#FFFFFF',
    secondary: '#374151',
    secondaryForeground: '#F3D9E5',
    minor: '#FDF2F8',
    background: '#FDF2F8',
    foreground: '#374151',
    card: '#FFFFFF',
    cardForeground: '#374151',
    muted: '#F3D9E5',
    mutedForeground: '#6B7280',
    accent: '#E879F9',
    accentForeground: '#FFFFFF',
    border: '#FBCFE8',
    ring: '#7E22CE',
    badgeSale: '#DC2626',
    badgeSuccess: '#10B981',
    badgeError: '#EF4444',
    ebony: '#111827',
  },
  'emerald-luxury': {
    name: 'Emerald Luxury',
    primary: '#047857',
    primaryForeground: '#FFFFFF',
    secondary: '#334155',
    secondaryForeground: '#D1FAE5',
    minor: '#F0FDF4',
    background: '#F0FDF4',
    foreground: '#334155',
    card: '#FFFFFF',
    cardForeground: '#334155',
    muted: '#D1FAE5',
    mutedForeground: '#64748B',
    accent: '#D4AF37',
    accentForeground: '#1E293B',
    border: '#A7F3D0',
    ring: '#047857',
    badgeSale: '#DC2626',
    badgeSuccess: '#10B981',
    badgeError: '#EF4444',
    ebony: '#1E293B',
  },
  'modern-monochrome': {
    name: 'Modern Monochrome',
    primary: '#111827',
    primaryForeground: '#FFFFFF',
    secondary: '#374151',
    secondaryForeground: '#FFFFFF',
    minor: '#F3F4F6',
    background: '#FFFFFF',
    foreground: '#111827',
    card: '#FFFFFF',
    cardForeground: '#111827',
    muted: '#F3F4F6',
    mutedForeground: '#6B7280',
    accent: '#D1D5DB',
    accentForeground: '#111827',
    border: '#E5E7EB',
    ring: '#111827',
    badgeSale: '#DC2626',
    badgeSuccess: '#10B981',
    badgeError: '#EF4444',
    ebony: '#111827',
  },
  'purple-pink-gradient': {
    name: 'Purple & Pink Gradient',
    primary: '#6D28D9',
    primaryForeground: '#FFFFFF',
    secondary: '#1E293B',
    secondaryForeground: '#FCE7F3',
    minor: '#FAF5FF',
    background: '#FAF5FF',
    foreground: '#1E293B',
    card: '#FFFFFF',
    cardForeground: '#1E293B',
    muted: '#FCE7F3',
    mutedForeground: '#64748B',
    accent: '#EC4899',
    accentForeground: '#FFFFFF',
    border: '#DDD6FE',
    ring: '#6D28D9',
    badgeSale: '#DC2626',
    badgeSuccess: '#10B981',
    badgeError: '#EF4444',
    ebony: '#0F172A',
  },
  'champagne-luxury': {
    name: 'Champagne Luxury',
    primary: '#D4AF37',
    primaryForeground: '#121212',
    secondary: '#2A1A1F',
    secondaryForeground: '#FAF8F5',
    minor: '#FAF8F5',
    background: '#FAF8F5',
    foreground: '#121212',
    card: '#FFFFFF',
    cardForeground: '#121212',
    muted: '#F0EDE8',
    mutedForeground: '#7A6D5A',
    accent: '#F5EFE0',
    accentForeground: '#2A1A1F',
    border: '#E8E0D4',
    ring: '#D4AF37',
    badgeSale: '#DC2626',
    badgeSuccess: '#10B981',
    badgeError: '#EF4444',
    ebony: '#121212',
  },
};

/**
 * Single Configuration Point for Tenant Theme Customization
 * Switch preset key below to change entire tenant appearance across storefront.
 */
export const activeThemePreset: ThemePresetKey = 'champagne-luxury';

export const activeTheme: ThemeTokens = themePresets[activeThemePreset];
