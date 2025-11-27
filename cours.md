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
## CREATION TABLES

# import des constructeurs

pgTable, integer etc... from import auto


# créer un objet typescript representant ma table

    ```tsx
    export const nom_de_variable_Table = pgTable("nom_de_table", { ... })
    ```

# declarer les id de table
systematique pour les id:

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

#   REGLE
    Si le constructeur s’écrit comme une fonction “générique” (integer, varchar, boolean, json)…
    - les parenthèses sont vides
    - Drizzle déduit le nom de la propriété TypeScript

    Si le constructeur ressemble à un type SQL pur (text, serial, uuid, timestamp)…
    - tu dois nommer la colonne avec ("nom") dans la parenthèse
    - Drizzle ne peut pas inférer


# Foreign key
```tsx

foreignKeyColumn: typeDuConstructeur("nom_sql").references(() => autreTable.colonne)

```

### nota bene raccourcis react : trfc ... 

## ROUTES NEXT

# (nom_de_dossier)
nom de dossier regroupant une fonction (AUTH)
sous dossier "connexion" "inscription" ...
AUTH n'apparait pas ds l'url mais 
    /connexion
    /inscription


# [PARAM] routes dynamiques

    lorsqu'on veut ouvrir une page differente pour un nombre considerables de projets
    on crée une route [id] qui va afficher le projet en fonction de l'id
    ou une route [slug] qui va afficher le projet en fonction du slug ...

forme: 'trfc'

```tsx

    props: {
        params: {
            id: string
        }
    }

    export default function Page({params}: props) {
        console.log(params.id)
        return <div>{params.id}</div>
        // ou return <div>{params.slug}</div>
    }
```

# ROUTES BACK - CRUD



    creer dossier suivant :
    app/api/.../route.ts 

```tsx
export async function GET(request: Request) {
    const { id } = await request.json();
}
export async function POST(request: Request) {
    const { name, description } = await request.json();
}
export async function PUT(request: Request) {
     const { id, name, description } = await request.json();
}
export async function DELETE(request: Request) {
    const { id } = await request.json();
}

```