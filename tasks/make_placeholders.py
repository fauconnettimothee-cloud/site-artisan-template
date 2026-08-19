# Génère les images d'attente du dossier images/.
# À relancer seulement si tu as effacé les placeholders par erreur.
from PIL import Image, ImageDraw, ImageFont
import os

DEST = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "images")
os.makedirs(DEST, exist_ok=True)

SPECS = [
    ("hero.jpg",       1920, 1080, "PHOTO D'ACCUEIL", "un chantier fini, en pleine lumiere"),
    ("artisan.jpg",     900, 1125, "TA PHOTO",        "en tenue de travail, sur un chantier"),
    ("chantier-1.jpg",  900, 1125, "CHANTIER 1",      "photo avant / apres"),
    ("chantier-2.jpg",  900, 1125, "CHANTIER 2",      "photo avant / apres"),
    ("chantier-3.jpg",  900, 1125, "CHANTIER 3",      "photo avant / apres"),
    ("chantier-4.jpg",  900, 1125, "CHANTIER 4",      "photo avant / apres"),
]

def font(size):
    for p in (r"C:\Windows\Fonts\arialbd.ttf", r"C:\Windows\Fonts\arial.ttf"):
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

for name, w, h, title, hint in SPECS:
    img = Image.new("RGB", (w, h), (42, 38, 34))
    d = ImageDraw.Draw(img)
    step = 46
    for i in range(-h, w, step):                       # hachures diagonales discretes
        d.line([(i, 0), (i + h, h)], fill=(52, 47, 42), width=2)
    d.rectangle([28, 28, w - 28, h - 28], outline=(217, 164, 65), width=3)
    f1, f2, f3 = font(max(26, w // 22)), font(max(15, w // 48)), font(max(13, w // 60))
    cx, cy = w // 2, h // 2
    d.text((cx, cy - 34), title, font=f1, fill=(217, 164, 65), anchor="mm")
    d.text((cx, cy + 16), hint, font=f2, fill=(163, 156, 146), anchor="mm")
    d.text((cx, cy + 52), f"remplace ce fichier : images/{name}", font=f3, fill=(120, 114, 106), anchor="mm")
    d.text((cx, h - 52), f"{w} x {h} px", font=f3, fill=(90, 85, 78), anchor="mm")
    img.save(os.path.join(DEST, name), quality=82)
    print("cree :", name)
