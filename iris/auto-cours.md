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

**nota bene raccourcis ne : trfc**
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

# route GET [dynamique]

```bash
src/app/api/projects/[id]/route.ts
```
```ts
export async function GET(_, { params }) {
  const project = await db
    .select()
    .from(adaProjects)
    .where(eq(adaProjects.id, Number(params.id)));

  if (project.length === 0)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(project[0]);
}
```
retenir 
# NEXT donne :
```ts
export async function GET(request, context) {}
```
- ***request*** = l’objet Request (URL, headers, body, methode http…)

- ***context*** = un objet fourni par Next contenant : params (comme : [id], [slug] etc.) <br> 

>***context.params REPRESENTE UNIQUEMENT LES PARAMETRES URL***


quand quelqu'un appelle :
```bash
 /api/projects/12
```
next construit un objet :
```tsx
const context = {
  params: {
    id: "12"
  },
  // plus tard peut-être d'autres champs…
}

```
ca donne :
```ts
GET(req, { params: { id: "12" } })
```
>  ### _
>signifie : ***passe*** cet argument <br>
>*(placeholder qui signifie : ignore cette variable)*

et donc l'écriture :
```ts
GET(_, {params}) 

```
équivaut à :<br>

GET(~~request~~, context)<br>

autrement dit: <br>
{params} = context.params <br>
detructuration de context pour obtenir params




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

# PATCH[id]

PATCH = mise à jour **partielle** ≠ PUT
> on ne remplace pas toute la ligne, on change **uniquement certains champs**.
<br>


```ts
import {eq, sql} from "drizzle-orm"


export async function PATCH (_req:Request, {params}:Context){

    const {id} = await params;

await db.update(table).set({ colonne: valeur }).where(eq(table.id, id));
return NextResponse.json({ok: true});

}
```
<br>

Obligatoire : `.where()` n’existe pas tant que `.set()` n’a pas été appelé.<br><br>


### Drizzle : `new Date()`<br>

vs
### SQL : sql `NOW()`<br>



| Forme         |  date  générée  | Particularité          |
| ------------- | ------------------------ | ---------------------- |
| `new Date()`  | Serveur Next.js          | temps appli (API) |
| `sql\`NOW()`` | Serveur PostgreSQL       | temps de la db (PostgreSQL) |

<br>

<br>


# route PUT
modifie toute la ligne (entrée complète)
```tsx
export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json(); // doit contenir toutes les colonnes nécessaires

  await db
    .update(maTable)
    .set(body)
    .where(eq(maTable.id, Number(id)));

  return NextResponse.json({ ok: true });
}
```

# route DELETE
supprime
```tsx
export async function DELETE(_req, { params }) {
  const { id } = params;

  await db
    .delete(maTable)
    .where(eq(maTable.id, Number(id)));

  return NextResponse.json({ ok: true });
}
```

<br>
<br>
<br>


# Les codes ERREUR HTTP

| Code    | Nom                   | Quand l’utiliser                           |
| ------- | --------------------- | ------------------------------------------ |
| **400** | Bad Request           | Le body manque, les champs sont incorrects |
| **404** | Not Found             | L’élément n’existe pas dans la DB          |
| **409** | Conflict              | Contrainte violée (slug déjà pris)         |
| **422** | Unprocessable Entity  | Le body JSON est invalide                  |
| **500** | Internal Server Error | Une erreur interne Drizzle / SQL           |

<br>

## Outils NextResponse
envoyer une erreur
```ts
return NextResponse.json({ error: "message" }, { status: 400 });
```


<br>
<br>
<br>



---

# TYPAGE

### typer variable

**1)** nom<br>
**2)** : type<br>
**3)** = valeur<br><br>

### typer fonction

**1)** nom<br>
**2)** (valeur entrée/params : type) <br>
**3)** (params) : type valeur sortie {...} (return)<br><br>

---

### *RÈGLES DE CASSE*

**→ les types primitifs : toujours en minuscules**

```
string
number
boolean
```

**→ les custom types : toujours en PascalCase**

```
type User = { name: string }
type Project = { slug: string }
type Context = { params: { id: string } }
```
---

<br>

### typer les objets / CUSTOM TYPE (réutilisable)

**1)** type NomType = {<br>
clef1: type;<br>
clef2: type;<br>
etc.<br>
}<br><br>*ou*<br><br>

**2)** interface NomType {<br>
clef1: type;<br>
clef2: type;<br>
etc.<br>
}<br>

---

<br>

### typer un composant

*mix entre typer fonction et typer objet*<br>

> **ATTENTION :** params ≠ props<br>

**1)** type TrucProps = {<br>
param1: type;<br>
param2: type;<br>
...<br>
}<br>

```tsx
export async function Truc({param1,param2}:TrucProps){
    ...
    return ...
}
```

---

<br>

### typer un HOOK

retenir :

> ### typer toutes les v. potentielles / valeur initiale / *<*chevrons*>*

```tsx
const [truc, setTruc] = useState<type>(valeurs);

<NomType[]> // = tableau
<NomType{}> // = objet ...
```

---



