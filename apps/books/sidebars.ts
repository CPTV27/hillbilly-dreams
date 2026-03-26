import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  volume1: [
    {
      type: 'category',
      label: 'Vol. 1: A Field Manual',
      collapsed: false,
      items: [
        'volume-1/intro',
        {
          type: 'category',
          label: 'Part I: The Revolution Equation',
          items: [
            'volume-1/the-450000-secret',
            'volume-1/people-are-the-currency',
            'volume-1/the-extraction-trap',
          ],
        },
        {
          type: 'category',
          label: 'Part II: The Operating System',
          items: [
            'volume-1/the-task-board-economy',
            'volume-1/building-without-banks',
            'volume-1/the-federation-effect',
          ],
        },
        {
          type: 'category',
          label: 'Part III: Implementation',
          items: [
            'volume-1/getting-started',
            'volume-1/common-pitfalls',
            'volume-1/legal-frameworks',
            'volume-1/technology-tools',
          ],
        },
      ],
    },
  ],
  volume2: [
    {
      type: 'category',
      label: 'Vol. 2: The Playbook',
      collapsed: false,
      items: [
        'volume-2/intro',
        {
          type: 'category',
          label: 'Part I: Foundation',
          items: [
            'volume-2/the-450000-secret',
            'volume-2/the-extraction-trap',
            'volume-2/the-coordination-premium',
            'volume-2/time-is-the-only-currency',
            'volume-2/the-task-board',
          ],
        },
        {
          type: 'category',
          label: 'Part II: Building',
          items: [
            'volume-2/building-without-banks',
            'volume-2/federation-not-scale',
            'volume-2/the-first-90-days',
            'volume-2/what-kills-coordination-systems',
            'volume-2/the-off-switch',
          ],
        },
        {
          type: 'category',
          label: 'Part III: Scaling',
          items: [
            'volume-2/pod-types',
            'volume-2/shared-services-without-money',
            'volume-2/the-scaling-math',
            'volume-2/the-legal-reality',
            'volume-2/technology-sovereignty',
          ],
        },
        {
          type: 'category',
          label: 'Part IV: The Corridor',
          items: [
            'volume-2/the-fayette-experiment',
            'volume-2/the-clarksdale-creative-pod',
            'volume-2/the-natchez-porch-network',
            'volume-2/the-hundred-friend-economy',
          ],
        },
      ],
    },
  ],
  volume3: [
    {
      type: 'category',
      label: 'Vol. 3: What Happens Next',
      collapsed: false,
      items: [
        'volume-3/intro',
        'volume-3/the-porch-in-natchez',
        {
          type: 'category',
          label: 'Part I: The First Domino',
          items: [
            'volume-3/the-hotel-that-became-an-engine',
            'volume-3/the-directory',
            'volume-3/rise-up',
            'volume-3/the-20-revolution',
          ],
        },
        {
          type: 'category',
          label: 'Part II: The Corridor',
          items: [
            'volume-3/clarksdale',
            'volume-3/vicksburg',
            'volume-3/greenville',
            'volume-3/tupelo',
            'volume-3/oxford',
            'volume-3/the-other-nine',
          ],
        },
        {
          type: 'category',
          label: 'Part III: The Snowbird Circuit',
          items: [
            'volume-3/memphis-to-new-orleans',
            'volume-3/the-talent-search',
            'volume-3/franchising-joy',
          ],
        },
        {
          type: 'category',
          label: 'Part IV: The Infrastructure',
          items: [
            'volume-3/the-platform-nobody-sees',
            'volume-3/the-20-that-changed-the-plumbing',
            'volume-3/what-measurably-better-means',
          ],
        },
      ],
    },
  ],
  corridor: [
    {
      type: 'category',
      label: 'The Corridor',
      collapsed: false,
      items: [
        'corridor/intro',
        'corridor/natchez',
        'corridor/vicksburg',
        'corridor/clarksdale',
        'corridor/memphis',
        'corridor/new-orleans',
      ],
    },
  ],
};

export default sidebars;
