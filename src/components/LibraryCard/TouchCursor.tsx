import { useEffect, useRef, type RefObject } from 'react';

/**
 * Replaces the mouse cursor with a round "finger" touch indicator while the pointer is over the phone,
 * so mobile screens feel like they are used by touch. Shrinks while pressed. Mouse and pen only (real touch input is left alone).
 */
export function TouchCursor({ stage }: { stage: RefObject<HTMLElement | null> }) {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = stage.current;
    const el = dot.current;
    if (!host || !el) return;
    let raf = 0;
    let x = 0;
    let y = 0;

    const show = (on: boolean) => {
      el.dataset.on = String(on);
      host.classList.toggle('is-touch-cursor', on);
      if (!on) el.dataset.down = 'false';
    };
    const place = () => { raf = 0; el.style.transform = `translate(${x}px, ${y}px)`; };
    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch') { show(false); return; }
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(place);
      show(!!(e.target as Element).closest?.('.app-phone'));
    };
    const down = (e: PointerEvent) => { if (e.pointerType !== 'touch' && (e.target as Element).closest?.('.app-phone')) el.dataset.down = 'true'; };
    const up = () => { el.dataset.down = 'false'; };
    const leave = () => show(false);

    host.addEventListener('pointermove', move);
    host.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    host.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    return () => {
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      host.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', leave);
      host.classList.remove('is-touch-cursor');
      if (raf) cancelAnimationFrame(raf);
    };
  }, [stage]);

  return <div ref={dot} className="ui-touch-cursor" aria-hidden="true" data-on="false" data-down="false" />;
}
