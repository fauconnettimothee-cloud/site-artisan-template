# Capture le site en desktop et en mobile, DIRECTEMENT depuis le fichier local
# (protocole file://) — c'est exactement ce que voit quelqu'un qui double-clique
# sur index.html. Sert de preuve que le site marche sans serveur.
from playwright.sync_api import sync_playwright
import pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
URL = (ROOT / "index.html").as_uri()
OUT = ROOT / "tasks"

errors = []

with sync_playwright() as p:
    b = p.chromium.launch()

    for name, w, h, full in [("apercu-desktop", 1440, 900, True),
                             ("apercu-mobile", 390, 844, True)]:
        ctx = b.new_context(viewport={"width": w, "height": h},
                            device_scale_factor=2,
                            is_mobile=(w < 500))
        page = ctx.new_page()
        page.on("console", lambda m: errors.append(m.type + ": " + m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append("pageerror: " + str(e)))
        page.goto(URL, wait_until="load")
        page.wait_for_timeout(1200)
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")   # declenche les apparitions
        page.wait_for_timeout(1400)
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(600)
        page.screenshot(path=str(OUT / f"{name}.png"), full_page=full)
        print("capture :", name)

        if name == "apercu-desktop":
            print("  titre onglet :", page.title())
            print("  H1           :", page.inner_text("h1")[:70])
            print("  prestations  :", page.locator(".serv__it").count())
            print("  chantiers    :", page.locator(".work__it").count())
            print("  villes       :", page.locator(".zone__list li").count())
            print("  section avis :", "masquee" if page.locator("#avis").is_hidden() else "VISIBLE")
            print("  lien tel     :", page.get_attribute("#callbar", "href"))
        ctx.close()
    b.close()

if errors:
    print("\n!! ERREURS CONSOLE :")
    for e in errors:
        print("  ", e)
    sys.exit(1)
print("\nAucune erreur console. Le site fonctionne en double-clic, sans serveur.")
