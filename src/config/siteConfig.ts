export type VisualCategory = 'thermal' | 'progression' | 'glamour' | 'team' | 'logo';

export interface VisualAsset {
  id: string;
  category: VisualCategory;
  label: string;
  description?: string;
  src: string;
  alt: string;
}

export interface BudgetRange {
  id: string;
  label: string;
  hint?: string;
}

export const siteConfig = {
  brand: {
    name: 'SkyHigh Imaging',
    shortName: 'SKYHIGH',
    legalName: 'SkyHigh Imaging',
    tagline:
      'Advanced drone inspection services for commercial construction, industrial facilities, and infrastructure projects.',
    location: {
      city: 'San Francisco',
      region: 'Bay Area',
      coordinates: {
        lat: '37.7749° N',
        lng: '122.4194° W',
      },
      serviceRadiusLabel: 'Greater San Francisco Bay Area',
    },
  },
  hero: {
    headline: 'PRECISION FROM ABOVE.',
    subheading:
      'Advanced drone inspection services for commercial construction, industrial facilities, and infrastructure projects.',
    badge: 'FAA Part 107 Certified',
    video: {
      src: '/placeholder-video.mp4',
      poster: '/placeholder-poster.jpg',
    },
  },
  visuals: {
    heroVideoNote:
      'Replace /placeholder-video.mp4 with a cinematic construction/industrial hero video from Nicholas.',
    topPhotos: [
      {
        id: 'thermal',
        category: 'thermal',
        label: 'Thermal Proof',
        description: 'Thermal imaging that reveals failures before they shut a site down.',
        src: '',
        alt: 'Thermal drone capture of an industrial roof.',
      },
      {
        id: 'progression',
        category: 'progression',
        label: 'Progression Capture',
        description: 'Recurring progression shots documenting every phase of construction.',
        src: '',
        alt: 'Construction progression imagery from above.',
      },
      {
        id: 'glamour',
        category: 'glamour',
        label: 'Cinematic Range',
        description: 'High-altitude, cinematic aerials that sell the scale of the project.',
        src: '',
        alt: 'Glamour aerial shot at sunset.',
      },
      {
        id: 'team',
        category: 'team',
        label: 'On-Site Presence',
        description: 'You and the gear on-site to build trust with security-conscious clients.',
        src: '',
        alt: 'Pilot and drone equipment on an active job site.',
      },
      {
        id: 'logo',
        category: 'logo',
        label: 'Brand Mark',
        description: 'Logo lockup used across hero, nav, and proposal PDFs.',
        src: '',
        alt: 'Nicholas drone inspection logo.',
      },
    ] as VisualAsset[],
  },
  business: {
    serviceAreas: ['San Francisco', 'Oakland', 'San Jose', 'Bay Area industrial corridor'],
    serviceRadiusCopy:
      'Serving commercial and industrial clients across the Greater Bay Area.',
    certifications: [
      {
        id: 'faa-107',
        label: 'FAA Part 107 Certified',
        shortLabel: 'FAA Part 107',
        highlight: true,
      },
      {
        id: 'liability',
        label: '$1M General Liability',
        shortLabel: '$1M Liability',
        highlight: true,
      },
      {
        id: 'osha-10',
        label: 'OSHA 10 Trained',
        shortLabel: 'OSHA 10',
        highlight: false,
      },
    ],
  },
  leadFiltering: {
    excludedJobTypes: [
      'Residential real estate photo-only shoots under $500k',
      'Lost pet searches',
      'Weddings and personal events',
      'One-off homeowner roof inspections',
    ],
    minEngagement: 1500,
    minEngagementLabel: '$1,500+',
    budgetRanges: [
      {
        id: 'range-1',
        label: '$1,500 – $5,000',
        hint: 'Single-site inspections and small portfolios.',
      },
      {
        id: 'range-2',
        label: '$5,000 – $15,000',
        hint: 'Multi-visit construction progression and thermal work.',
      },
      {
        id: 'range-3',
        label: '$15,000 – $50,000',
        hint: 'Large sites, industrial campuses, and LiDAR mapping.',
      },
      {
        id: 'range-4',
        label: '$50,000+',
        hint: 'Program-level or multi-site inspection contracts.',
      },
    ] as BudgetRange[],
  },
  contact: {
    leadEmail: 'ops@skyhigh.io',
    phoneNumber: '+1 (555) 123-4567',
    showPhoneProminently: true,
    addressLines: ['1234 Innovation Blvd', 'San Francisco, CA 94105'],
    projectTypes: [
      { id: 'industrial', label: 'Industrial' },
      { id: 'residential', label: 'Residential' },
      { id: 'government', label: 'Government' },
    ],
    timeframes: [
      { id: 'urgent', label: '< 1 Week' },
      { id: 'standard', label: '1-2 Weeks' },
      { id: 'flexible', label: 'Flexible' },
    ],
  },
  social: {
    linkedin: '#',
    twitter: '#',
    instagram: '#',
  },
  meta: {
    copyrightYear: '2024',
  },
} as const;

export type SiteConfig = typeof siteConfig;
