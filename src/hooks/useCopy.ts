import { useCallback, useEffect, useRef, useState } from 'react';

/** Copies text to the clipboard and exposes a short-lived "copied" key for feedback. */
export function useCopy(resetMs = 1600) {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(async (text: string, key = 'default') => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for insecure contexts / denied permission.
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(key);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(null), resetMs);
  }, [resetMs]);

  return { copied, copy };
}
