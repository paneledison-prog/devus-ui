"""Cut a subject out of a flat-gray Stitch image and give it a white sticker outline.

Usage: python cutout.py in.jpg out.png [--size 360] [--outline 7] [--tol 12]

Stitch cannot return transparent images, so ask it for the subject on "a pure flat solid light-gray (#d0d0d0)
background with no shadow", then remove that background here: flood fill from the image border over pixels close
to the border color, smooth the mask, crop to the subject, add a white outline (dilated mask) and a soft shadow-free edge.
"""
import argparse
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi

ap = argparse.ArgumentParser()
ap.add_argument('src'); ap.add_argument('dst')
ap.add_argument('--size', type=int, default=360)
ap.add_argument('--outline', type=int, default=7)
ap.add_argument('--tol', type=float, default=12)
a = ap.parse_args()

im = Image.open(a.src).convert('RGB')
px = np.asarray(im).astype(np.float32)
h, w, _ = px.shape
border = np.concatenate([px[0], px[-1], px[:, 0], px[:, -1]])
bg = np.median(border, axis=0)
dist = np.sqrt(((px - bg) ** 2).sum(axis=2))
cand = dist < a.tol                      # looks like background
lab, _ = ndi.label(cand)
edge_labels = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
bgmask = np.isin(lab, list(edge_labels))  # background that touches the border
subject = ~bgmask
# Enclosed background (the hole of a handle, a ring) must stay transparent; small speckles inside the subject stay.
enc, ne = ndi.label(cand & ~bgmask)
for i in range(1, ne + 1):
    if (enc == i).sum() > 1200:
        subject &= ~(enc == i)
subject = ndi.binary_opening(subject, iterations=1)
lab2, n = ndi.label(subject)
if n > 1:                                 # keep the biggest blobs (a sticker may have several parts)
    sizes = ndi.sum(subject, lab2, range(1, n + 1))
    keep = [i + 1 for i, s in enumerate(sizes) if s > 0.02 * subject.sum()]
    subject = np.isin(lab2, keep)
alpha = Image.fromarray((subject * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8))

rgba = im.convert('RGBA'); rgba.putalpha(alpha)
ys, xs = np.where(subject)
pad = a.outline + 4
box = (max(xs.min() - pad, 0), max(ys.min() - pad, 0), min(xs.max() + pad, w), min(ys.max() + pad, h))
rgba = rgba.crop(box); alpha_c = alpha.crop(box)
grown = Image.fromarray((ndi.binary_dilation(np.asarray(alpha_c) > 100, iterations=a.outline) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1))
out = Image.new('RGBA', rgba.size, (255, 255, 255, 0))
white = Image.new('RGBA', rgba.size, (255, 255, 255, 255)); white.putalpha(grown)
out = Image.alpha_composite(out, white)
out = Image.alpha_composite(out, rgba)
out.thumbnail((a.size, a.size), Image.LANCZOS)
out.save(a.dst)
print('saved', a.dst, out.size)
