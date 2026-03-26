import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Outsider Economics',
  tagline: 'What happens when the economy works for the people who actually live here.',
  favicon: 'img/favicon.ico',

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
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Outsider Economics',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'volume1',
          position: 'left',
          label: 'Vol. 1: Field Manual',
        },
        {
          type: 'docSidebar',
          sidebarId: 'volume2',
          position: 'left',
          label: 'Vol. 2: Playbook',
        },
        {
          type: 'docSidebar',
          sidebarId: 'volume3',
          position: 'left',
          label: 'Vol. 3: What Happens Next',
        },
        {
          type: 'docSidebar',
          sidebarId: 'corridor',
          position: 'left',
          label: 'The Corridor',
        },
        {
          href: 'https://measurablybetter.life',
          label: 'Measurably Better',
          position: 'right',
        },
        {
          href: 'https://deepsouthdirectory.com',
          label: 'Deep South Directory',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'The Books',
          items: [
            { label: 'Vol. 1: Field Manual', to: '/volume-1/intro' },
            { label: 'Vol. 2: Playbook', to: '/volume-2/intro' },
            { label: 'Vol. 3: What Happens Next', to: '/volume-3/intro' },
          ],
        },
        {
          title: 'The Proof',
          items: [
            { label: 'Measurably Better', href: 'https://measurablybetter.life' },
            { label: 'Deep South Directory', href: 'https://deepsouthdirectory.com' },
            { label: 'Big Muddy', href: 'https://bigmuddytouring.com' },
          ],
        },
        {
          title: 'Connect',
          items: [
            { label: 'Buy on Amazon', href: '#' },
            { label: 'Substack', href: '#' },
            { label: 'Twitter', href: '#' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Chase Tuthill Pierson · Hillbilly Dreams, Inc. · Natchez, Mississippi`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
