import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  gettingStarted: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/welcome',
        'getting-started/photo-workflow',
        'getting-started/content-studio',
        'getting-started/edit-mode',
        'getting-started/asana',
      ],
    },
  ],
  amyGuide: [
    {
      type: 'category',
      label: "Amy's Guide — Inn & Bar",
      collapsed: false,
      items: [
        'amy/overview',
        'amy/bar-inventory',
        'amy/show-night-checklist',
      ],
    },
  ],
  tracyGuide: [
    {
      type: 'category',
      label: "Tracy's Guide — Business & Finance",
      collapsed: false,
      items: [
        'tracy/overview',
        'tracy/compliance',
        'tracy/financial-dashboards',
      ],
    },
  ],
  jpGuide: [
    {
      type: 'category',
      label: "JP's Guide — Shows & Programming",
      collapsed: false,
      items: [
        'jp/overview',
        'jp/booking-acts',
      ],
    },
  ],
};

export default sidebars;
