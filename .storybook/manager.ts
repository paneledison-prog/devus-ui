import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Devus UI',
    brandUrl: 'https://devus.space',
    colorPrimary: '#0485f7',
    colorSecondary: '#0485f7',
    fontBase: '"Inter", system-ui, sans-serif',
  }),
});
