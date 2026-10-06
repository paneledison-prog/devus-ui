import a1 from './portraits/a1.webp';
import a2 from './portraits/a2.webp';
import a3 from './portraits/a3.webp';
import a4 from './portraits/a4.webp';
import a5 from './portraits/a5.webp';
import a6 from './portraits/a6.webp';
import a7 from './portraits/a7.webp';
import a8 from './portraits/a8.webp';
import me from './portraits/me.webp';
import team from './portraits/team.webp';

/** Portrait avatars (stylized 3D artwork supplied for the project, 192 px WebP). */
export const portraits = [a1, a2, a3, a4, a5, a6, a7, a8];
export const portraitMe = me;
export const portraitTeam = team;

/** The same face for the same name, spread evenly over the set. */
export function portraitFor(name: string) {
  let h = 2166136261;
  for (const ch of name) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  h ^= h >>> 15; h = Math.imul(h, 2246822507); h ^= h >>> 13;
  return portraits[(h >>> 0) % portraits.length];
}
