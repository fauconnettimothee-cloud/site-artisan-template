# Site vitrine pour artisan du bâtiment

Un site d'une page, prêt à remplir. Pas de logiciel à installer, pas d'abonnement,
pas de compte à créer. Tu double-cliques sur `index.html` et le site s'ouvre.

---

## En 3 étapes

### 1. Regarde à quoi ça ressemble
Double-clique sur **`index.html`**. Le site s'ouvre dans ton navigateur avec un
contenu d'exemple. C'est la coquille que tu vas remplir.

### 2. Mets tes textes
Ouvre **`contenu.js`** avec le Bloc-notes (clic droit → Ouvrir avec → Bloc-notes),
ou avec n'importe quel éditeur de texte. Tu remplaces le texte entre les
guillemets `" "`. C'est le seul fichier à modifier.

Sauvegarde (Ctrl+S), puis actualise la page dans le navigateur (F5).

**Tu n'as pas envie d'écrire les textes ?** Ouvre `PROMPT.md`, copie le prompt
qu'il contient, colle-le dans Claude. Il te pose les questions et remplit
le fichier pour toi.

### 3. Mets tes photos
Dans le dossier **`images/`**, remplace les images d'attente par les tiennes,
**en gardant exactement les mêmes noms de fichiers** :

| Fichier | Ce qu'il faut mettre |
|---|---|
| `hero.jpg` | Ton plus beau chantier terminé, en pleine lumière. C'est la première image que le visiteur voit. |
| `artisan.jpg` | Toi, en tenue de travail, sur un chantier. Pas en costume, pas de photo d'identité. |
| `chantier-1.jpg` à `chantier-4.jpg` | Quatre chantiers finis. Un téléphone récent suffit : lumière du jour, photo prise droite, pièce rangée. |

Les photos verticales rendent mieux que les horizontales, sauf pour `hero.jpg`.

---

## Le formulaire de contact

Par défaut, le site affiche uniquement le téléphone — c'est ce qui marche le
mieux pour un artisan, la plupart des clients appellent.

Pour ajouter un formulaire qui t'envoie les demandes par email :
1. Va sur **formspree.io**, crée un compte gratuit.
2. Crée un formulaire, ils te donnent une adresse du type
   `https://formspree.io/f/xxxxxxx`.
3. Colle cette adresse dans `contenu.js`, ligne `formulaire_url`.

Le formulaire apparaît tout seul.

---

## Mettre le site en ligne

Le site est constitué de simples fichiers : n'importe quel hébergeur l'accepte.
Le plus simple et gratuit : **Netlify Drop** — va sur `app.netlify.com/drop`,
glisse le dossier entier dans la page, et le site est en ligne en dix secondes.

Pour un vrai nom de domaine (`mon-entreprise.fr`, environ 12 € par an), tu peux
l'acheter chez OVH ou Gandi et le brancher ensuite. Le site fonctionne
indépendamment : tu peux changer d'hébergeur quand tu veux, les fichiers
t'appartiennent.

---

## Deux règles à ne pas casser

**N'invente jamais un avis client.** Ni un nombre de chantiers, ni un label, ni
une certification. En France, un faux avis est une pratique commerciale
trompeuse (article L121-2 du code de la consommation), et les clients les
repèrent immédiatement. Le fichier est prévu pour ça : tant que la liste
`avis` est vide, la section n'apparaît pas du tout sur le site.

**Complète les mentions légales.** Ouvre `mentions.html` et remplace les
mentions entre crochets. C'est obligatoire pour tout site professionnel
en France.

---

## Ça ne marche plus

Si la page devient blanche ou affiche un message d'erreur après une
modification, c'est presque toujours dans `contenu.js` :
- une virgule effacée en fin de ligne,
- un guillemet `"` effacé,
- une apostrophe dans un texte : écris `l'artisan` normalement, ça fonctionne,
  mais ne remplace jamais les guillemets `"` par des apostrophes `'`.

Annule ta dernière modification (Ctrl+Z), sauvegarde, actualise.
