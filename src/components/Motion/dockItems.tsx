import type { DockItem } from './Motion';

const S = ({ d }: { d: string }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>;

/** Sample items for the MagneticDock demo (generic line icons). */
export const dockItems: DockItem[] = [
  { id: 'home', label: 'Home', icon: <S d="M4 11 12 4l8 7v9h-5v-5H9v5H4Z" /> },
  { id: 'search', label: 'Search', icon: <S d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm9 2-4-4" /> },
  { id: 'mail', label: 'Mail', icon: <S d="M4 6h16v12H4ZM4 7l8 6 8-6" /> },
  { id: 'cal', label: 'Calendar', icon: <S d="M5 5h14v15H5ZM5 10h14M9 3v4M15 3v4" /> },
  { id: 'chat', label: 'Chat', icon: <S d="M5 5h14v10H10l-5 4Z" /> },
  { id: 'gear', label: 'Settings', icon: <S d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /> },
];
