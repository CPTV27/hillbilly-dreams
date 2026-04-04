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
  howTo: [
    {
      type: 'category',
      label: 'How Do I...?',
      collapsed: false,
      items: [
        'how-to/make-a-poster',
        'how-to/write-an-article',
        'how-to/add-photos-to-article',
        'how-to/create-social-post',
        'how-to/create-radio-promo',
        'how-to/respond-to-review',
        'how-to/check-arrivals',
        'how-to/update-room-availability',
        'how-to/add-business-to-directory',
        'how-to/onboard-new-client',
        'how-to/update-a-listing',
        'how-to/update-the-website',
        'how-to/upload-content',
        'how-to/find-a-photo',
        'how-to/schedule-a-show',
        'how-to/promote-a-show',
        'how-to/ask-delta-dawn',
        'how-to/what-can-delta-dawn-do',
      ],
    },
  ],
  referenceTools: [
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: ['reference/tool-registry'],
    },
  ],
};

export default sidebars;
