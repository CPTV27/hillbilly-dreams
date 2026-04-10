import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'The Big Muddy Manual',
  tagline: 'How we run this place — step by step.',
  favicon: 'img/cover-v1.png',

  future: {
    v4: true,
  },

  url: 'https://manual.bigmuddytouring.com',
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
    metadata: [
      { name: 'theme-color', content: '#C4441A' },
    ],
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Big Muddy Manual',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'gettingStarted',
          position: 'left',
          label: 'Getting Started',
        },
        {
          type: 'docSidebar',
          sidebarId: 'amyGuide',
          position: 'left',
          label: "Amy's Guide",
        },
        {
          type: 'docSidebar',
          sidebarId: 'tracyGuide',
          position: 'left',
          label: "Tracy's Guide",
        },
        {
          type: 'docSidebar',
          sidebarId: 'setup',
          position: 'left',
          label: 'Machine Setup',
        },
        {
          type: 'docSidebar',
          sidebarId: 'howTo',
          position: 'left',
          label: 'How Do I...?',
        },
        {
          type: 'docSidebar',
          sidebarId: 'referenceTools',
          position: 'left',
          label: 'Reference',
        },
        {
          href: 'https://bigmuddytouring.com/admin',
          label: 'Admin Dashboard',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Quick Links',
          items: [
            { label: 'Photo Workflow', to: '/getting-started/photo-workflow' },
            { label: 'Content Studio', to: '/getting-started/content-studio' },
            { label: 'Using Asana', to: '/getting-started/asana' },
          ],
        },
        {
          title: 'Role Guides',
          items: [
            { label: "Amy \u2014 Inn & Bar", to: '/amy/overview' },
            { label: "Tracy \u2014 Business & Finance", to: '/tracy/overview' },
            { label: "JP \u2014 Shows & Programming", to: '/jp/overview' },
            { label: 'How Do I...?', to: '/how-to/make-a-poster' },
          ],
        },
        {
          title: 'Big Muddy',
          items: [
            { label: 'Main Site', href: 'https://bigmuddytouring.com' },
            { label: 'Media Vault', href: 'https://bigmuddytouring.com/admin/media' },
          ],
        },
      ],
      copyright: `\u00a9 ${new Date().getFullYear()} Hillbilly Dreams, Inc. \u00b7 Internal Use Only`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
