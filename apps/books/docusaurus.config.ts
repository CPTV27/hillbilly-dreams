import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Outsider Economics',
  tagline: 'A toolkit for building local economies that work for the people who actually live here.',
  favicon: 'img/cover-v1.png',

  future: {
    v4: true,
  },

  url: 'https://outsidereconomics.com',
  baseUrl: '/',

  organizationName: 'CPTV27',
  projectName: 'hillbilly-dreams',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/outsider-economics-social.jpg',
    metadata: [
      { name: 'theme-color', content: '#C4441A' },
    ],
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Outsider Economics',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'philosophy',
          position: 'left',
          label: 'Philosophy',
        },
        {
          type: 'docSidebar',
          sidebarId: 'toolkit',
          position: 'left',
          label: 'Toolkit',
        },
        {
          type: 'docSidebar',
          sidebarId: 'caseStudies',
          position: 'left',
          label: 'Case Studies',
        },
        {
          type: 'docSidebar',
          sidebarId: 'resources',
          position: 'left',
          label: 'Resources',
        },
        {
          href: 'https://deepsouthdirectory.com',
          label: 'Deep South Directory',
          position: 'right',
        },
        {
          href: 'https://bigmuddytouring.com',
          label: 'Big Muddy',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            { label: 'What Is Outsider Economics?', to: '/philosophy/what-is-outsider-economics' },
            { label: 'The Toolkit', to: '/toolkit/the-task-board' },
            { label: 'Case Studies', to: '/case-studies' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'Grants & Funding', to: '/resources/grants-and-funding' },
            { label: 'Organizations', to: '/resources/organizations' },
            { label: 'Legal Frameworks', to: '/resources/legal-frameworks' },
            { label: 'Technology Tools', to: '/resources/technology-tools' },
          ],
        },
        {
          title: 'See the Proof',
          items: [
            { label: 'Deep South Directory', href: 'https://deepsouthdirectory.com' },
            { label: 'Big Muddy', href: 'https://bigmuddytouring.com' },
            { label: 'Measurably Better', href: 'https://measurablybetter.life' },
          ],
        },
      ],
      copyright: `\u00a9 ${new Date().getFullYear()} Chase Tuthill Pierson \u00b7 Hillbilly Dreams, Inc. \u00b7 Natchez, Mississippi`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
