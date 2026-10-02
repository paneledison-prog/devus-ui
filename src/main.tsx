import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { App } from './app/App';
import { TemplatePage } from './app/TemplatePage';

// ?template=<slug> renders a single template full-window (used by "Open in new tab").
const templateSlug = new URLSearchParams(window.location.search).get('template');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {templateSlug ? <TemplatePage slug={templateSlug} /> : <App />}
  </StrictMode>,
);
