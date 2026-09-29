export const PROJECT = {
  name: 'DWARKAMAI',
  tagline: 'A HOME ABOVE THE ORDINARY.',
  developer: 'DARPAN CONSTRUCTIONS',
  location: {
    area: 'SAWANTWADI',
    district: 'SINDHUDURG',
    state: 'MAHARASHTRA',
    coordinates: {
      lat: '15.896685',
      lng: '73.820534',
    },
  },
  facts: [
    { number: '01', label: '01.13', unit: 'ACRES', description: 'Total development area' },
    { number: '02', label: '04', unit: 'BUILDINGS', description: 'Residential blocks' },
    { number: '03', label: '01 & 02', unit: 'BHK', description: 'Unit configurations' },
    { number: '04', label: '467–823', unit: 'SQ.FT.', description: 'Carpet area range' },
    { number: '05', label: 'APR 2027', unit: 'COMPLETION', description: 'Expected possession' },
    { number: '06', label: 'P52900016701', unit: 'RERA', description: 'Registration number' },
  ],
  residences: [
    { type: '01 BHK', area: '467 SQ.FT.', note: 'onwards' },
    { type: '02 BHK', area: '823 SQ.FT.', note: 'onwards' },
  ],
  contact: {
    phones: ['9422436090', '9890968845'],
    rera: 'P52900016701',
  },
  nav: [
    { number: '01', label: 'PROJECT', href: '#project' },
    { number: '02', label: 'ARCHITECTURE', href: '#architecture' },
    { number: '03', label: 'RESIDENCES', href: '#residences' },
    { number: '04', label: 'LOCATION', href: '#location' },
  ],
} as const;
