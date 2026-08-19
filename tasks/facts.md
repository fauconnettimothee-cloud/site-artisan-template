# Faits — template site artisan

- 2026-08-19 · Repo GitHub PUBLIC : https://github.com/fauconnettimothee-cloud/site-artisan-template
- 2026-08-19 · Démo en ligne (GitHub Pages, branche master, racine) : https://fauconnettimothee-cloud.github.io/site-artisan-template/
- 2026-08-19 · Origine : template GHL "Repair/General Contracting-003-1.2.w" du sous-compte "Sites pour coachs & thérapeutes" (app.shiney.ai, location OH0fVmfdXXdjvnMz7en3). Seule la direction artistique a été reprise — aucun code GHL réutilisé.
- 2026-08-19 · Le template GHL d'origine contenait 346 projets / 932 clients / témoignage "Jone Doe" : tout fictif, écarté volontairement.
- 2026-08-19 · Contrainte technique tenue : aucun fetch, aucun module ES → le site fonctionne en double-clic (protocole file://). Vérifié avec Playwright, zéro erreur console.
- 2026-08-19 · Destinataire : le meilleur ami de Tim, qui le passe à son artisan (contrepartie : un prix sur des travaux).
- 2026-08-19 · Template GHL reproduit fidelement : jaune #FBBE3F, boutons radius 100px, police Nunito, fonds #000/#282A23/#F2F2F2. 11 photos du template GHL recuperees via interception reseau Playwright (le HTML seul n'en montrait que 2 — elles sont chargees en JS).
- 2026-08-19 · Section AVANT/APRES ajoutee : balayage AUTOMATIQUE en boucle (9 s) + prise en main a la souris/au doigt. Inspiration = homedeco.app (video de Tim). Si `avant` est vide, filtre CSS grayscale(.92) brightness(.52) sur la meme image.
- 2026-08-19 · Quiz interactif 4 questions a points, 3 resultats par seuil (0/7/13), barre de progression, CTA telephone. Se masque si `questions: []`.
- 2026-08-19 · Effets du repertoire Notion appliques : Ken Burns hero infini 26 s, parallaxe JS sur les 2 bandes photo (jamais position:fixed — piege Cecile), reveal IntersectionObserver, tuiles hover-zoom, barre de progression de lecture, compteurs animes.
