const videoLibrary = {
  categories: [
    {
      id: 'historical-news',
      name: 'Historical News',
      featured: [
        {
          name: 'Major Historical Events',
          href: '#',
          thumbnailSrc: '/video_images/b1.jpg',
          description: 'Archive of significant news coverage from 1960-2000',
        },
        {
          name: 'Landmark Broadcasts',
          href: '#',
          thumbnailSrc: '/video_images/b2.jpg',
          description: 'Collection of pioneering broadcast moments',
        },
      ],
      sections: [
        {
          id: 'decades',
          name: 'News by Decade',
          items: [
            { name: '1960s Coverage', href: '#' },
            { name: '1970s Reports', href: '#' },
            { name: '1980s Archives', href: '#' },
            { name: '1990s Collection', href: '#' },
          ],
        },
        {
          id: 'categories',
          name: 'Historical Categories',
          items: [
            { name: 'Political Milestones', href: '#' },
            { name: 'Space Exploration', href: '#' },
            { name: 'Cultural Moments', href: '#' },
            { name: 'Sports History', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'educational',
      name: 'Educational Archives',
      featured: [
        {
          name: 'Science & Nature Series',
          href: '#',
          thumbnailSrc: '/video_images/b3.jpg',
          description: 'Classic educational programming from our science division',
        },
        {
          name: 'Historical Documentaries',
          href: '#',
          thumbnailSrc: '/video_images/b4.jpg',
          description: 'In-depth historical documentaries from 1970-1990',
        },
      ],
      sections: [
        {
          id: 'subjects',
          name: 'Subject Areas',
          items: [
            { name: 'Science Programs', href: '#' },
            { name: 'History Series', href: '#' },
            { name: 'Arts & Culture', href: '#' },
            { name: 'Technical Education', href: '#' },
          ],
        },
        {
          id: 'special-collections',
          name: 'Special Collections',
          items: [
            { name: 'Educational Series', href: '#' },
            { name: 'Instructional Videos', href: '#' },
            { name: 'Documentary Specials', href: '#' },
          ],
        },
      ],
    },
  ],
  // Updated filters to match the historical theme
  filters: [
    {
      id: 'decade',
      name: 'Decade',
      options: [
        { value: '1970s', label: '1970s' },
        { value: '1980s', label: '1980s' },
        { value: '1990s', label: '1990s' }
      ]
    },
    {
      id: 'format',
      name: 'Original Format',
      options: [
        { value: '16mm Film', label: '16mm Film' },
        { value: 'U-matic', label: 'U-matic' },
        { value: 'Betacam', label: 'Betacam' }
      ]
    },
    {
      id: 'type',
      name: 'Program Type',
      options: [
        { value: 'Scientific Documentary', label: 'Scientific' },
        { value: 'Cultural Documentary', label: 'Cultural' },
        { value: 'Industrial Documentary', label: 'Industrial' },
        { value: 'Wildlife Documentary', label: 'Wildlife' }
      ]
    }
  ],
  videos: [
    {
      id: 1,
      title: "Moon Landing Special Coverage (1969)",
      href: '#',
      duration: '2:15:00',
      description: 'Complete original broadcast coverage of the Apollo 11 moon landing, including pre-launch interviews and live commentary.',
      type: 'Historical News',
      thumbnailSrc: '/video_images/v1.png',
      metadata: {
        date: '1969-07-20',
        views: 125000,
        format: '16mm Film',
        tags: ['space', 'historical', 'apollo program'],
        transcript: 'Partial transcript available',
        embeddings: 'Vector ID: apollo_11_coverage',
        preservation: 'Digitized from original 16mm film reels'
      }
    },
    {
      id: 2,
      title: "Understanding DNA (1973)",
      href: '#',
      duration: '28:15',
      description: 'Educational series exploring the fundamental concepts of DNA and genetic science, featuring pioneering animations.',
      type: 'Educational',
      thumbnailSrc: '/video_images/v2.png',
      metadata: {
        date: '1973-03-15',
        views: 89000,
        format: 'U-matic',
        tags: ['science', 'education', 'genetics'],
        transcript: 'Full transcript available',
        embeddings: 'Vector ID: dna_education_1973',
        preservation: 'Restored from U-matic tape'
      }
    },
    {
      id: 3,
      title: "Fall of the Berlin Wall (1989)",
      href: '#',
      duration: '1:45:30',
      description: 'Live coverage of the historic fall of the Berlin Wall, including on-location reporting and citizen interviews.',
      type: 'Historical News',
      thumbnailSrc: '/video_images/v3.jpg',
      metadata: {
        date: '1989-11-09',
        views: 210000,
        format: 'Betacam',
        tags: ['historical', 'cold war', 'germany'],
        transcript: 'Full transcript available',
        embeddings: 'Vector ID: berlin_wall_1989',
        preservation: 'Digitized from Betacam master tape'
      }
    },
    {
      id: 4,
      title: "Exploring the Deep Ocean (1985)",
      href: '#',
      duration: '52:00',
      description: 'Groundbreaking documentary series on deep-sea exploration, featuring rare footage of deep-ocean creatures.',
      type: 'Educational',
      thumbnailSrc: '/video_images/v4.jpeg',
      metadata: {
        date: '1985-06-22',
        views: 145000,
        format: 'Betacam',
        tags: ['science', 'ocean', 'documentary'],
        transcript: 'Full transcript available',
        embeddings: 'Vector ID: deep_ocean_1985',
        preservation: 'Restored from original Betacam tapes'
      }
    },
    {
      id: 5,
      title: "Computer Revolution (1982)",
      href: '#',
      duration: '45:00',
      description: 'Special report on the emerging personal computer revolution, featuring interviews with tech pioneers.',
      type: 'Documentary',
      thumbnailSrc: '/video_images/v5.jpeg',
      metadata: {
        date: '1982-09-30',
        views: 167000,
        format: 'U-matic',
        tags: ['technology', 'history', 'computers'],
        transcript: 'Full transcript available',
        embeddings: 'Vector ID: computer_rev_1982',
        preservation: 'Digitized from U-matic tape'
      }
    }
  ]
};

export default videoLibrary;