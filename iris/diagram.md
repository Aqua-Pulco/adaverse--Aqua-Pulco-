# UX DIAGRAM

```md
ETAPE 1 — PROJETS
──────────────────────────────────────────────────────────────────

[Home / Adaverse]
    |
    ├──> Promos filter / Projects filter   (interaction locale)
    |
    ├──> Liste des projets P1, P2, etc.
    |          |
    |          └──> Clic sur un projet
    |                    └──> Page ProjectDetail
    |                            |
    |                            └──> Retour Home
    |
    └──> Bouton “Créer un projet”
              └──> Modal Formulaire
                     |
                     └──> Submit → Home (nouveau projet visible)




ETAPE 2 — PROMOTIONS
──────────────────────────────────────────────────────────────────

[Home]
    |
    └──> Bouton “Promotions”
            |
            └──> Page PromotionsList
                   |
                   └──> Clic sur une promotion (ex: Promo X)
                          └──> Page PromoDetail
                                   |
                                   ├──> Voir liste des projets de cette promo
                                   └──> Voir liste des étudiants




ETAPE 3 — DASHBOARD / PROFIL
──────────────────────────────────────────────────────────────────

[PromoDetail]
    |
    └──> Clic sur un étudiant
           └──> Page StudentProfile (/dashboard)
                    |
                    ├──> Voir info perso / promo
                    ├──> Voir projets de l'étudiant
                    └──> Logout

```
<br>
<br>
<br>

# FRONT ARCHITECTURE DIAGRAM

FETCHS SERVEUR > serveur component<br>
AFFICHAGE des listes (GET)<br>

page deja remplie = rapidité

--------

FETCH CLIENT > client components<br>
CREATION MODIFICATION via interface (PUT PATCH DELETE)

attend la reponse = possibles clignotements de page

-------

```bash
ETAPE 1

[Home]  (Server Component)
   |
   ├── GET projects (S → DB)
   |
   ├── <ProjectCard /> (server, pas de fetch client)
   |
   └── "Créer projet" (C)
         |
         └── <ModalForm /> (C)
                 |
                 └── POST /api/projects  (C → API → DB)
                         |
                         └── redirection / refresh  (S)


[ProjectDetail page]  (Server Component)
   |
   └── GET project by id (S → DB)


---
ETAPE 2

[PromotionsList] (S)
   |
   └── GET promos (S → DB)
       |
       └── clic promo
             |
             └── navigate → /promos/[id]


[PromoDetail] (S)
   |
   ├── GET promo info (S → DB)
   ├── GET projects belonging to promo (S → DB)
   └── GET students list (S → DB)


---
ETAPE 3

[StudentsList page] (S)
   |
   └── GET students of promo (S → DB)
        |
        └── clic étudiant → /students/[id]


[StudentProfile page] (S)
   |
   ├── GET student by id  (S → DB)
   ├── GET student projects (S → DB)
   └── LogoutButton (C)
         |
         └── POST logout (C → API)


```