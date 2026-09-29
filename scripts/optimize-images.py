"""Regenerate public image variants: python -m pip install Pillow; python scripts/optimize-images.py."""
from pathlib import Path
from PIL import Image, ImageOps
import json

root = Path(__file__).resolve().parents[1]
output = root / 'public' / 'images'
output.mkdir(exist_ok=True)
manifest = {}
for source in sorted((root / 'assets' / 'originals').glob('*')):
    if source.suffix.lower() not in ('.jpg', '.jpeg', '.png'):
        continue
    with Image.open(source) as raw:
        original = ImageOps.exif_transpose(raw).convert('RGB')
        variants = []
        for bound in (640, 1280):
            photo = original.copy()
            photo.thumbnail((bound, bound))
            target = output / f'{source.stem}-{bound}.webp'
            photo.save(target, 'WEBP', quality=82, method=6)
            variants.append(f'/images/{target.name} {photo.width}w')
        manifest[f'/images/{source.stem}-1280.webp'] = ', '.join(variants)
(root / 'src' / 'data' / 'imageVariants.json').write_text(json.dumps(manifest, indent=2)+'\n', encoding='utf-8')
