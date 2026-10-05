import { useState } from 'react';
import { PhoneFrame } from '../PhoneFrame';
import { BlurredPhoto, StickerCanvas, StickerHomeBar, StickerSheet, StickerStatusBar } from '../Stickers';

/** "Sticker picker": switch packs, tap stickers, close the sheet (it slides away) and tap the photo to bring it back. */
export function StickerPickerExample() {
  const [open, setOpen] = useState(true);
  return (
    <PhoneFrame bare height={692}>
      <StickerCanvas>
        <BlurredPhoto sheetOpen={open} onOpen={() => setOpen(true)} />
        <StickerStatusBar />
        <StickerSheet open={open} onClose={() => setOpen(false)} />
        <StickerHomeBar />
      </StickerCanvas>
    </PhoneFrame>
  );
}
