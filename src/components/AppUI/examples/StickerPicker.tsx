import { PhoneFrame } from '../PhoneFrame';
import { BlurredPhoto, StickerCanvas, StickerHomeBar, StickerSheet, StickerStatusBar } from '../Stickers';

/** "Sticker picker": the camera photo blurred behind a white sheet with three sticker packs, four stickers, a "stickers" title and a close button. */
export function StickerPickerExample() {
  return (
    <PhoneFrame bare height={692}>
      <StickerCanvas>
        <BlurredPhoto />
        <StickerStatusBar />
        <StickerSheet />
        <StickerHomeBar />
      </StickerCanvas>
    </PhoneFrame>
  );
}
