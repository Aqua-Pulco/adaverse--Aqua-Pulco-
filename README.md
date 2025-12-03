/promotions                   ← liste de toutes les promotions
/promotions/[slug]            ← page d’une promo (bio + projets)

/ada-projects                 ← liste projets Ada
/ada-projects/[slug]          ← page d’un projet Ada (catégorie)

/projects                     ← liste projets étudiants (optionnel)
/projects/[slug]              ← page d’un projet étudiant
---

# ✅ TODO A — Mise en place du projet

### 1. Initialiser le projet local

* [X] Créer dossier local (`adaverse-iris` par ex.)
* [X] `npx create-next-app@latest --typescript`
* [X] Choisir Tailwind, TypeScript, ESLint, React Compiler, `src/` YES
* [X] Vérifier le projet tourne : `npm run dev`

### 2. Git

* [X] Créer un repo GitHub `adaverse-[pseudo]`
* [X] Relier ton dossier :
  `git remote add origin <url-du-repo>`
* [X] Faire un premier commit (+ push)
* [X] Créer **2 branches** :
  `main` (versions stables)
  `work` (branche de ravail)

### 3. Neon

* [X] Créer un projet Neon
* [X] Copier la connection string
* [X] Mettre dans `.env` :

  ```
  DATABASE_URL="la-string-neon"
  ```

### 4. Installer Drizzle

* [X] `npm install drizzle-orm drizzle-kit neon-serverless`
* [X] Créer dossier `src/db` (app)
* [X] Créer `src/db/schema.ts` (creation tables)
* [X] Créer `src/db/drizzle.ts` (connexion à Neon)
* [X] Créer `drizzle.config.ts` (CLI)

À ce stade, tu as une **base propre**, solide, prête.

---

# ✅ TODO B — Base de données (Neon + Drizzle)

### 1. Définir ton schéma

Créer **3 tables** dans `schema.ts` :

* [X] `adaProjects` (liste des projets du programme Ada)
* [X] `promotions` (Frida, Ada 2025, etc.)
* [X] `studentProjects` (les projets envoyés via le formulaire)

### 2. Créer migrations

* [X] `npx drizzle-kit generate`
* [X] `npx drizzle-kit push` → envoie sur Neon
* [X] Vérifier sur Neon que les tables sont là

### 3. Seed SQL

Dans `/drizzle/seeds` :

* [ ] Un fichier `1-promotions.sql`

* [ ] Un fichier `2-ada-projects.sql`

* [ ] Un fichier `3-publish.sql` (UPDATE avec date publication)

* [ ] Exécuter les seeds via Neon Dashboard ou `psql`

Une fois ça fait → ta base est **vivante**, peuplée, testable.

---

# ✅ TODO C — Implémentation des fonctionnalités (front + back)

### 1. API routes (backend)

Créer un dossier `src/app/api/` :

* [X] `/api/post-project` → POST
  enregistre un projet envoyé depuis le formulaire
* [ ] `/api/published-projects` → GET
  renvoie tous les projets où `publishedAt` n’est pas null
* [ ] `/api/project/[slug]` → GET
  renvoie un projet par slug

### 2. Front — Page d’accueil

* [ ] Afficher tous les projets publiés
* [ ] Groupés par projet Ada
* [ ] Trier par date de publication (desc)
* [ ] Afficher image GitHub (`thumbnail.png`) ou image par défaut
* [ ] Bouton “Proposer un projet” dans le header

### 3. Popup + Formulaire

* [ ] Créer un composant `ProjectDialog.tsx`
* [ ] Champs : titre, GitHub, démo, promo, projet Ada
* [ ] Validation (si champs vides → message d’erreur)
* [ ] Form action → envoie vers `/api/post-project`

### 4. Page de détail d’un projet

* [ ] Route dynamique : `src/app/projects/[slug]/page.tsx`
* [ ] Récupérer avec params.slug
* [ ] Afficher tout : titre, image, promo, dates, liens

### 5. Navigation

* [ ] Logo → page d’accueil
* [ ] Cartes → pages de détail
* [ ] Link de Next → navigation client

À ce stade → **site complet fonctionnel**, évaluable en soutenance.

---

# ✅ TODO D — Déploiement sur Vercel

### 1. Déploiement initial

* [ ] Connecter ton repo GitHub à Vercel
* [ ] Déployer la branche `stable`

### 2. Environnement

* [ ] Ajouter la variable `DATABASE_URL` dans Vercel → **exactement** la même que dans `.env`

### 3. Tests

* [ ] Tester la page d’accueil
* [ ] Tester la popup
* [ ] Tester la création d’un projet
* [ ] Tester la page de détail

### 4. Déployer la branche bonus quand prête

* [ ] Ajouter les bonus uniquement après validation stable
* [ ] Pousser la branche `bonus`
* [ ] Déployer une Preview branch sur Vercel

---


