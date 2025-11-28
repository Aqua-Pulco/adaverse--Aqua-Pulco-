# schema général

```
PROJECT ROOT (RACINE)
│
├── next.config.ts        ← réglages du compilateur Next
├── package.json          ← dépendances, scripts npm
│
├── .env                  ← secrets (ex: DATABASE_URL)
│
│
├── drizzle.config.ts     ← ⭐ CONFIG DU CLI DRIZZLE
│                               utilisé dans le TERMINAL
│
├── drizzle/              ← ⭐ MIGRATIONS (générées)
│   ├── migrations/       ← fichiers SQL
│   └── meta/             ← snapshots (mémoire du schéma)
│
└── src/
    │
    ├── app/              ← ROUTER NEXT (pages, API, layouts)
    │   ├── page.tsx      ← composants serveur ou client
    │   ├── api/          ← ⭐ RUNTIME SERVEUR
    │   │   └── ...       ← où on fait db.select(), etc.
    │   └── ...            
    │
    ├── db/
    │   ├── schema.ts     ← ⭐ TON SCHÉMA (tables)
    │   └── drizzle.ts    ← ⭐ CONNEXION À NEON (runtime)
    │
    └── components/       ← composants React (client)
    └── ...
```
<br>
<br>
<br>
<br>
<br>
<br>


# CREATION TABLES

### import des constructeurs

pgTable, integer etc... from import auto


### créer un objet typescript representant ma table

```tsx
export const nom_de_variable_Table = pgTable("nom_de_table", { ... })
```

______
### declarer les id de table
systematique pour les id :

```tsx
{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
}
```
ou, plus simple :

```tsx
{
    id: serial("id").primaryKey(),
}
```

>    certains constructeurs **devinent** le nom (la clef),
>    d'autres pas, d'où le **("id")** ou le **()**

###   REGLE
-    Si le constructeur s’écrit comme une fonction “générique” (integer, varchar, boolean, json)…
    <br>les parenthèses sont vides
    <br>→ Drizzle déduit le nom de la propriété TypeScript

-    Si le constructeur ressemble à un type SQL pur (text, serial, uuid, timestamp)…
    <br>tu dois nommer la colonne avec ("nom") dans la parenthèse
    <br>→ Drizzle ne peut pas inférer

________
### Foreign key
```tsx

foreignKeyColumn: typeDuConstructeur("nom_sql").references(() => autreTable.colonne)

```
_________
### Publier les tables 
pour connaitre les commandes :
>npm run

nous on va utiliser :
> **db:generate** & **db:push**

le premier génère la table le second crée les tables sur Neon<br>
c'est comme une sorte de ***git data.***
>**db:generate** = git add. + git commit = historique<br>on peut y acceder avant/apres publication si pb<br>
(dossier drizzle > migrations > meta)

>**db:push** = git push = MAJ REELE dans la db = execute le SQL.



<br>

__________

**nota bene raccourcis react : trfc ...**
__________

<br>
<br>
<br>
<br>


# LES ROUTES NEXT

### ***Dans l'arborescence :***
    @/nom_dossier/page.tsx
    @/api/nom_dossier/route.tsx
    = une page front / une route back
    = une URL
pour la partie composants:

>**"use client"** = composant exécuté dans le navigateur
>→ useState, useEffect, onClick, formulaires

>**Sans "use client"** = composant exécuté côté serveur
>→ plus rapide, peut fetcher directement la DB
_________

<br>

# SYNTAXES
### /(nom_de_dossier)
(AUTH) = nom de dossier regroupant une fonction :<br>
"connexion", "inscription" ... = sous dossiers. <br>
AUTH n'apparait pas ds l'url mais 
<br>    /connexion
<br>    /inscription



### / [PARAMS] (routes dynamiques)
    lorsqu'on veut ouvrir une page differente pour un nombre considerables de projets
    on crée une route [id] qui va afficher le projet en fonction de l'id présente ds la db
    ou une route [slug] qui va afficher le projet en fonction du slug associé ds la db...
    etc.

"params" est une **fonction standard** fournie par Next<br>
Next détecte les crochets [ ] et comprend :<br>
“Cette route est dynamique → elle a un paramètre d’URL”<br>
***"params"*** est la clef que Next utilise pour te passer la valeur du dossier [***truc***].

```tsx
    props: 
    { params: { id: string }};

    export default function Page({params}: props) {
        console.log(params.id)
        return <div>{params.id}</div>
        // ou return <div>{params.slug}</div>
    }
```
on peut empiler les segments dynamiques mais jamais les cumuler au meme endroit:
>   src/app/projects/[***promo***]/[***slug***]/page.tsx

Next fournit :

```tsx
params = {
  promo: "frida",
  slug: "ada-quiz"
}
```


<br>
<br>

## ROUTES BACK - CRUD
<br>

- 1 qu'est ce que l'utilisateur veut faire ? 
- 2 quelle donnée est concernée ? 
- 3 quelle méthode HTTP ? (GET/POST/PUT/DELETE)

    **1 action utilisateur = 1 route API = 1 fichier route.ts**

<br>

### Route statique 
    src/app/api/mon-action/route.ts

quand le front effectue une requète à telle adresse,
<br> 
le fichier *route.ts* de *mon-action* va lui répondre.

<br>

### Route dynamique

    src/app/api/mon-action/[slug]/route.ts

quand le front effectue une requete à telle adresse:

>/api/mon-action/ada-quiz
<br> 

Le back répond selon le slug reçu :
>src/app/api/mon-action/[slug]/route.ts
<br>
ici le slug reçu est  ***ada-quiz***



<br>
<br>
<br>
<br>

# les imports basiques

```tsx
import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { maTable } from "@/db/schema";

```
<br>
<br>

____
<br>


**NextResponse :** outil pour fabriquer une réponse HTTP

    → NextResponse.json(...)

***“voilà du JSON”***

    → NextResponse.error()
***“voilà une erreur”***

    → NextResponse.json({ ok: true })
***“ok j’ai reçu ton formulaire"* pour un post**

____
<br>
<br>

```tsx
import {db} from "@/db/drizzle"
```
***"db"*** est la porte qui te permet de parler a ta base de données Néon
<br>
@/db/drizzle = lien avec Neon 
<br>

```tsx
    db.select().from(table) // lire
    db.insert(table).values({...}) // créer
    db.update(table).set({...}).where(eq(table.id, id)) // modif
    db.delete(table).where(eq(table.id, id)) // supprimer
    .where(eq(table.slug, params.slug)) // filter
    .where(and(eq(...), eq(...))) // combiner
    .orderBy(table.createdAt) // classer
    .limit(10).offset(20) // paginer
```
----
<br>
<br>

```tsx
import { eq } from "drizzle-orm"
```

C’est un opérateur de comparaison. Il sert a faire des conditions SQL.
<br>

    eq() = égalité
    gt() = greater than
    lt() = less than
    and() = ET
    or() = OU
<br>
exemple d'usage :

```tsx
.where(eq(maTable.slug, params.slug))
```

<br>
<br>
<br>

# route GET
Lire

```tsx
export async function GET(){
    const rows = await db.select().from(maTable);
    return NextResponse.json(rows);
}
```

va demander **(GET)**<br>
à la **db** toute les lignes de cette table (rows),<br >
**fais moi un paquet JSON**,<br>
renvoie le a *icelle* qui a fait la demande (***NextResponse***)

<br>
<br>

# route POST
créer

```tsx
export async function POST(req: Request){
    const body = await req.json();
    await db.insert(maTable).values(body)
    return NextResponse.json({ok:true});
}
```
explication
```tsx 
const body = await req.json()
```
1) le front envoie un formulaire, un paquet req.json()
au back, qui l'ouvre.

```tsx
await db.insert(maTable).values(body);
```
2) le back va ranger ce paquet dans sa base :

```tsx
return NextResponse.json({ ok: true });
```
3) puis le back confirme quelque chose au front
ici : j'ai bien rangé le paquet

<br>
<br>

# route GET avec SLUG
lire specifique info
```tsx
import {NextResponse} from "next/server"
import {db} from "@/db/drizzle" 
import {maTable} from "@/db/schema"
import {eq} from "drizzle-orm"

export async function GET(_req, { params }) {
  const row = await db.select().from(maTable).where(eq(maTable.slug, params.slug));
  return NextResponse.json(row[0]);
}

```
1) je recois une URL avec un slug
<br>
    → http://localhost:3000/api/quiz/ada-quiz
<br>
    (par ex. "ada-quiz")

2) je vais chercher dans la base de donnée
<br>
    → le slug = params.slug

3) je renvoie la ligne qui correspond au slug en JSON

<br>

# route PUT
modifie
```tsx

```

# route DELETE
supprime
```tsx

```

