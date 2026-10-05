"""Generate image assets with the Stitch MCP over HTTP, one prompt per image, in parallel.

Setup:   set STITCH_API_KEY (never commit it) and STITCH_PROJECT (a Stitch project id).
Usage:   python stitch_assets.py prompts.json out_dir [attempt] [name ...]
         prompts.json is {"name": "prompt", ...}. Each result is saved as out_dir/<name>.<attempt>.jpg.
Then:    python stitch_assets.py --sheet out_dir contact.png     (labelled contact sheet of the latest attempts)

Stitch answers a prompt with a list of "screens". A prompt that asks for "only a square photograph" makes Stitch
create a screen of type IMAGE (a 512px JPEG, the real asset) plus a DESIGN screen (an HTML page that frames it).
This script downloads the IMAGE screen and falls back to the DESIGN screenshot.
"""
import json, os, re, sys, glob, urllib.request
from concurrent.futures import ThreadPoolExecutor

URL = 'https://stitch.googleapis.com/mcp'


def call(tool, args):
    key = os.environ['STITCH_API_KEY']
    body = json.dumps({'jsonrpc': '2.0', 'id': 1, 'method': 'tools/call', 'params': {'name': tool, 'arguments': args}}).encode()
    req = urllib.request.Request(URL, data=body, headers={'Content-Type': 'application/json', 'Accept': 'application/json, text/event-stream', 'X-Goog-Api-Key': key})
    with urllib.request.urlopen(req, timeout=600) as r:
        d = json.load(r)
    if 'error' in d:
        raise RuntimeError(json.dumps(d['error']))
    return ''.join(c.get('text', '') for c in d['result'].get('content', []))


def generate(name, prompt, out_dir, attempt):
    try:
        data = json.loads(call('generate_screen_from_text', {'projectId': os.environ['STITCH_PROJECT'], 'deviceType': 'MOBILE', 'prompt': prompt}))
    except Exception as e:  # "The service is currently unavailable." is common: just retry
        return f'FAIL {name}: {str(e)[:100]}'
    screens = data['outputComponents'][0]['design']['screens']
    img = [s for s in screens if s.get('screenType') == 'IMAGE']
    pick = img[0] if img else screens[-1]
    path = os.path.join(out_dir, f'{name}.{attempt}.jpg')
    urllib.request.urlretrieve(pick['screenshot']['downloadUrl'], path)
    return f"OK {name} {'IMAGE' if img else 'DESIGN-screenshot'} {path}"


def sheet(out_dir, dst):
    from PIL import Image, ImageDraw
    latest = {}
    for f in glob.glob(os.path.join(out_dir, '*.jpg')):
        m = re.match(r'(.+)\.(\d+)\.jpg$', os.path.basename(f))
        if m and (m.group(1) not in latest or int(m.group(2)) > latest[m.group(1)][0]):
            latest[m.group(1)] = (int(m.group(2)), f)
    S, cols = 240, 4
    items = sorted(latest.items())
    im = Image.new('RGB', (cols * S, ((len(items) + cols - 1) // cols) * (S + 18)), 'white')
    d = ImageDraw.Draw(im)
    for i, (n, (a, f)) in enumerate(items):
        t = Image.open(f).convert('RGB'); t.thumbnail((S, S))
        x, y = (i % cols) * S, (i // cols) * (S + 18)
        im.paste(t, (x + (S - t.width) // 2, y + 18)); d.text((x + 4, y + 3), f'{n}.{a}', fill='black')
    im.save(dst)


if __name__ == '__main__':
    if sys.argv[1] == '--sheet':
        sheet(sys.argv[2], sys.argv[3]); sys.exit(0)
    prompts = json.load(open(sys.argv[1], encoding='utf8'))
    out_dir = sys.argv[2]; attempt = sys.argv[3] if len(sys.argv) > 3 else '1'
    names = sys.argv[4:] or list(prompts)
    os.makedirs(out_dir, exist_ok=True)
    with ThreadPoolExecutor(8) as ex:
        for line in ex.map(lambda n: generate(n, prompts[n], out_dir, attempt), names):
            print(line, flush=True)
