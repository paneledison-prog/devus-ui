import { PhoneFrame } from '../PhoneFrame';
import { PackTabs, Placed, StickerCanvas, StickerHomeBar, StickerStatusBar, TrashChip, VideoCircle, stickers } from '../Stickers';

/** "Circle editor": a round video with two placed stickers (selection frames and count chips), a Pause label and the pack bar. */
export function CircleEditorExample() {
  return (
    <PhoneFrame bare height={692}>
      <StickerCanvas>
        <StickerStatusBar />
        <TrashChip x={53} y={86} />
        <p className="sk-pause">Pause</p>
        <VideoCircle />
        <Placed src={stickers.heart} frame={{ x: 6, y: 96, w: 150, h: 150, rot: -6 }} size={135} at={[68, 173]} chip="x9" chipAt={[99, 253]} />
        <TrashChip x={288} y={341} />
        <Placed src={stickers.egg} frame={{ x: 203, y: 348, w: 150, h: 140, rot: -3 }} size={118} at={[275, 426]} chip="x12" chipAt={[252, 510]} />
        <section className="sk-bar" aria-label="Sticker packs">
          <span className="sk-grab" aria-hidden="true" />
          <PackTabs className="sk-tabs--bar" />
        </section>
        <StickerHomeBar />
      </StickerCanvas>
    </PhoneFrame>
  );
}
