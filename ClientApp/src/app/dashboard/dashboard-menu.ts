import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Overview',
    icon: 'nb-home',
    link: '/dashboard/overview',
    home: true,
  },
  {
    title: 'My Performance',
    icon: 'nb-bar-chart',
    link: '/dashboard/performance',
  },
  {
    title: 'STUDY',
    group: true,
  },
  {
    title: 'Learn',
    icon: 'nb-lightbulb',
    link: '/dashboard/learn',
  },
  {
    title: 'Build',
    icon: 'nb-edit',
    link: '/dashboard/build',
  },
  {
    title: 'COMMUNITY',
    group: true,
  },
  {
    title: 'Discussion Boards',
    icon: 'nb-grid-a-outline',
    link: '/dashboard/discussion-boards',
  },
  {
    title: 'Leaderboards',
    icon: 'nb-list',
    link: '/dashboard/leaderboards',
  },
  {
    title: 'MY ACCOUNT',
    group: true,
  },
  {
    title: 'Profile',
    icon: 'nb-person',
    link: '/dashboard/profile',
  },
  {
    title: 'Settings',
    icon: 'nb-gear',
    link: '/dashboard/settings',
  },
];
