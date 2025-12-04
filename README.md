
---

# 🌐 ADAVERSE — TODO LIST

---

# 📘 TODO 0 — Cours / Notions cochables

## Drizzle / SQL

* [x] Schéma général du projet
* [x] Structure migrations Drizzle
* [x] CRUD Drizzle : select / insert / update / delete
* [ ] Seeds SQL

## Next.js — API Routes

* [x] GET statique
* [x] GET dynamique `[id]`
* [x] POST
* [x] PUT (entier)
* [x] DELETE
* [x] PATCH (partiel)
* [ ] PATCH publish `/api/projects/[id]/publish`

## Next.js — Architecture

* [x] Routes dynamiques `[slug]`
* [x] Notion de server component
* [x] Notion de client component
* [x] Diagramme UX
* [x] Diagramme architecture front/back

## Fetch (formes génériques)

* [ ] Fetch GET server component
* [ ] Fetch GET client component
* [ ] Fetch POST client
* [ ] Fetch PATCH client
* [ ] Fetch DELETE client

---

# ✅ TODO A — Mise en place du projet

* [x] Initialisation Next.js (`create-next-app`)
* [x] Git : repo + remote + branches main/work
* [x] Neon : base + DATABASE_URL
* [x] Drizzle : config + schema + drizzle.ts

---

# ✅ TODO B — Base de données

Dossier : `drizzle/seeds/`

* [ ] Créer `1-promotions.sql`
* [ ] Créer `2-ada-projects.sql`
* [ ] Créer `3-publish.sql`
* [ ] Exécuter les seeds dans Neon

---

# 🧱 TODO C — Backend (API)

Dossier : `src/app/api/...`

## Routes du projet

* [x] `/api/ada-projects` (GET, POST)
* [x] `/api/ada-projects/[id]` (GET)
* [x] `/api/promotions` (GET, POST)
* [x] `/api/promotions/[id]` (GET)
* [x] `/api/projects` (GET, POST)
* [x] `/api/projects/[id]` (GET)
* [ ] `/api/projects/[id]/` (PATCH)

---

# 🎨 TODO D — Pages Front (mobile-first)

### Home — `src/app/page.tsx`

* [ ] GET projets publiés (server component)
* [ ] Tri `publishedAt desc`
* [ ] Groupe par projet Ada
* [ ] Afficher image GitHub ou fallback
* [ ] Bouton “Proposer un projet”

### Promotions — `src/app/promotions/page.tsx`

* [ ] GET promotions

### Promotion Detail — `src/app/promotions/[slug]/page.tsx`

* [ ] GET promotion via slug
* [ ] Afficher bio
* [ ] Afficher projets publiés liés

### Ada Projects — `src/app/ada-projects/page.tsx`

* [ ] GET projets Ada

### Ada Project Detail — `src/app/ada-projects/[slug]/page.tsx`

* [ ] GET projets étudiants liés

### Projects (optionnel) — `src/app/projects/page.tsx`

* [ ] GET projets étudiants

### Project Detail — `src/app/projects/[slug]/page.tsx`

* [ ] GET projet via slug
* [ ] Afficher titre
* [ ] Afficher image
* [ ] Afficher promotion
* [ ] Afficher projet Ada
* [ ] Afficher dates
* [ ] Lien GitHub
* [ ] Lien démo

---

# 🧩 TODO E — Formulaire (popup)

Dossier : `src/components/ProjectDialog.tsx`

* [x] Créer le composant
* [ ] useState : titre
* [ ] useState : githubUrl
* [ ] useState : projectUrl
* [ ] useState : slug
* [ ] Select promotions — GET `/api/promotions`
* [ ] Select projets Ada — GET `/api/ada-projects`
* [ ] Validation des champs requis
* [ ] POST `/api/projects`
* [ ] Reset du formulaire
* [ ] Fermer la popup

---

# 🧭 TODO F — Navigation

* [ ] Logo → `<Link href="/">` dans `Navbar.tsx`
* [ ] Cartes projet → `<Link href="/projects/[slug]">`
* [ ] Navigation mobile-first

---

# 🚀 TODO G — Déploiement

* [ ] Connecter repo GitHub à Vercel
* [ ] Déployer branche `stable`
* [ ] Ajouter `DATABASE_URL` dans Vercel
* [ ] Tester Home
* [ ] Tester Popup
* [ ] Tester POST project
* [ ] Tester Project Detail
* [ ] Déployer branche `bonus`

---

