from PIL import Image
from pathlib import Path

root = Path(r"E:/Projects/DP Jewels/Website/DP-Jewels-website")
src_master = root / "src/assets/favicons/android-chrome-512x512.png"
out_dirs = [root / "src/assets/favicons", root / "public"]

img = Image.open(src_master).convert("RGBA")
alpha = img.getchannel("A")
bbox = alpha.getbbox()
if bbox is None:
    raise RuntimeError("Master favicon has no visible pixels")

# Aggressively crop transparent padding around artwork.
cropped = img.crop(bbox)

# Compose into square canvas with small safe margin so art occupies ~86% (within requested 80-90%).
def render(size: int, margin_ratio: float = 0.07):
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    inner = int(round(size * (1 - 2 * margin_ratio)))
    fitted = cropped.resize((inner, inner), Image.Resampling.LANCZOS)
    offset = ((size - inner) // 2, (size - inner) // 2)
    canvas.paste(fitted, offset, fitted)
    return canvas

outputs = {
    "favicon-16x16.png": 16,
    "favicon-32x32.png": 32,
    "apple-touch-icon.png": 180,
    "android-chrome-192x192.png": 192,
    "android-chrome-512x512.png": 512,
}

rendered = {name: render(sz) for name, sz in outputs.items()}

# ICO with multiple standard sizes.
ico_sizes = [(16,16), (32,32), (48,48)]
ico_img = render(48)

for out_dir in out_dirs:
    out_dir.mkdir(parents=True, exist_ok=True)
    for name, im in rendered.items():
        im.save(out_dir / name)
    ico_img.save(out_dir / "favicon.ico", sizes=ico_sizes)

print("Regenerated favicon package in src/assets/favicons and public")
