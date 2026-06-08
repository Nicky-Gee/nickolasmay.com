export const projects = [
  {
    slug:        'tourism-noosa',
    title:       'Tourism Noosa',
    category:    'Tourism',
    client:      'Tourism Noosa',
    services:    'Film Production · Photography',
    year:        '2024',
    location:    'Noosa, QLD',
    description: 'A cinematic campaign capturing the essence of Noosa — its hinterland, waterways, and unhurried coastal culture.',
    aspect:      '3/2',
  },
  {
    slug:        'elysian-retreat',
    title:       'Elysian Retreat',
    category:    'Hospitality',
    client:      'Elysian Retreat',
    services:    'Film Production · Photography',
    year:        '2024',
    location:    'Whitsundays, QLD',
    description: 'Brand film and photography for an award-winning luxury eco-resort in the Great Barrier Reef.',
    aspect:      '3/2',
  },
  {
    slug:        'mirage-whitsundays',
    title:       'Mirage Whitsundays',
    category:    'Hospitality',
    client:      'Mirage Whitsundays',
    services:    'Film Production',
    year:        '2023',
    location:    'Whitsundays, QLD',
    description: 'Launch film for a new resort development set against the Whitsunday Islands.',
    aspect:      '3/2',
  },
  {
    slug:        'finca-la-torre',
    title:       'Finca La Torre',
    category:    'Lifestyle',
    client:      'Finca La Torre',
    services:    'Photography',
    year:        '2023',
    location:    'Málaga, Spain',
    description: 'Editorial photography for a boutique Spanish olive oil estate and winery.',
    aspect:      '3/2',
  },
  {
    slug:        'ingenia-lifestyle-drift',
    title:       'Ingenia Lifestyle Drift',
    category:    'Lifestyle',
    client:      'Ingenia Communities',
    services:    'Film Production · Social Media',
    year:        '2024',
    location:    'Queensland, Australia',
    description: 'Social-first lifestyle campaign for a national residential communities brand.',
    aspect:      '3/2',
  },
  {
    slug:        'kakadu-tourism',
    title:       'Kakadu Tourism',
    category:    'Tourism',
    client:      'Kakadu Tourism',
    services:    'Film Production · Photography',
    year:        '2022',
    location:    'NT, Australia',
    description: 'Campaign work across the World Heritage-listed Kakadu National Park.',
    aspect:      '3/2',
  },
  {
    slug:        'cavan',
    title:       'Cavan',
    category:    'Campaign',
    client:      'Cavan',
    services:    'Photography · Branding',
    year:        '2023',
    location:    'Sunshine Coast, QLD',
    description: 'Brand identity photography for a premium Sunshine Coast property development.',
    aspect:      '3/2',
  },
]

export const filmProjects = [
  { slug: 'nm-reel-2024', title: 'NM Reel 2024',     vimeoId: '1034885005', aspect: '16/9' },
  { slug: 'tourism-noosa-film',  title: 'Tourism Noosa',   vimeoId: '1034885005', aspect: '16/9' },
  { slug: 'elysian-film',        title: 'Elysian Retreat', vimeoId: '1034885005', aspect: '16/9' },
  { slug: 'mirage-film',         title: 'Mirage Whitsundays', vimeoId: '1034885005', aspect: '16/9' },
]

export const portraitImages = Array.from({ length: 9 }, (_, i) => ({
  id:     i,
  label:  `Portrait ${i + 1}`,
  aspect: i % 3 === 0 ? '2/3' : i % 3 === 1 ? '3/4' : '4/5',
}))

export const eatDrinkImages = Array.from({ length: 9 }, (_, i) => ({
  id:     i,
  label:  `Eat & Drink ${i + 1}`,
  aspect: i % 2 === 0 ? '4/3' : '2/3',
}))

export const CATEGORIES = ['ALL', 'TOURISM', 'LIFESTYLE', 'HOSPITALITY', 'CAMPAIGN']
