import { useState, type ReactNode } from 'react';
import './Avatar.css';

export interface AvatarProps { src?: string; alt?: string; fallback?: string; size?: 'sm' | 'md' | 'lg' }

export function Avatar({ src, alt = '', fallback, size = 'md' }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`ui-avatar ui-avatar--${size}`}>
      {src && !failed ? <img src={src} alt={alt} onError={() => setFailed(true)} /> : fallback}
    </span>
  );
}

export function AvatarGroup({ children }: { children: ReactNode }) {
  return <span className="ui-avatar-group">{children}</span>;
}
