import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const mark =
  '<svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
  '<defs><linearGradient id="dv" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">' +
  '<stop stop-color="#4DB2FF"/><stop offset=".55" stop-color="#0485F7"/><stop offset="1" stop-color="#0A52C9"/></linearGradient></defs>' +
  '<rect width="32" height="32" rx="9" fill="url(#dv)"/>' +
  '<path d="M11.5 4.5H18a9 9 0 0 1 0 18h-6.5z" fill="#fff" fill-opacity=".35"/>' +
  '<path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 8H15a9 9 0 0 1 0 18H8.5V8Zm4 4v10H15a5 5 0 0 0 0-10h-2.5Z" fill="#fff"/></svg>';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: `<span style="display:inline-flex;align-items:center;gap:8px;font-weight:600">${mark}Devus UI</span>`,
    brandUrl: 'https://devus.space',
    colorPrimary: '#0485f7',
    colorSecondary: '#0485f7',
    fontBase: '"Inter", system-ui, sans-serif',
  }),
});
