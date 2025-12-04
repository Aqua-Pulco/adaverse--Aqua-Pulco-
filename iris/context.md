
project tree
```bash
➜  adaverse_iris git:(work) ✗ tree -I 'node_modules'
.
├── README.md
├── drizzle.config.ts
├── eslint.config.mjs
├── iris
│   ├── auto-cours.md
│   ├── context.md
│   └── instructions.md
├── migrations
│   ├── 0000_numerous_mandroid.sql
│   └── meta
│       ├── 0000_snapshot.json
│       └── _journal.json
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   └── promo-pictures
│       ├── Fatoumata-Kebe.jpg
│       ├── Frances-Bilas-Spence.jpg
│       ├── Frida-Kahlo.jpg
│       └── Grace-Hopper.jpg
├── src
│   ├── app
│   │   ├── (front)
│   │   │   ├── ada-projects
│   │   │   │   ├── [slug]
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── projects
│   │   │   │   ├── [slug]
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── promotions
│   │   │       ├── [slug]
│   │   │       │   └── page.tsx
│   │   │       └── page.tsx
│   │   └── api
│   │       ├── ada-projects
│   │       │   ├── [id]
│   │       │   │   └── route.ts
│   │       │   ├── ada-projects.json
│   │       │   ├── route.ts
│   │       │   └── test_adaProjects.http
│   │       ├── projects
│   │       │   ├── [id]
│   │       │   │   └── route.ts
│   │       │   ├── route.ts
│   │       │   └── test_projects.http
│   │       └── promotions
│   │           ├── [id]
│   │           │   └── route.ts
│   │           ├── route.ts
│   │           └── test_promotions.http
│   ├── components
│   │   ├── Button.tsx
│   │   ├── FloatingButton.tsx
│   │   └── Navbar.tsx
│   └── db
│       ├── drizzle.ts
│       └── schema.ts
└── tsconfig.json

23 directories, 43 files

```
<br>
<br>


# FRONT

global.css
```css
@import "tailwindcss";

```



layout.tsx
```tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingButton from "@/components/FloatingButton";



export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">

        <Navbar />

        <FloatingButton>Click me</FloatingButton>

        {children}


      </body>
    </html >
  );
}
```

Home page.tsx
```tsx
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-blue-500 text-zinc-300">
      
      <h1 > HOME PAGE</h1>

    </div>
  );
}
``` 

promotions page.tsx
```tsx
export default function Promotion() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-blue-500 text-zinc-300">

            <h1 className="text-4xl font-bold">PAGE PROMOTIONS</h1>

            <div className="flex flex-row">

            </div>

        </div>
    );
}
```
promotions/[slug] page.tsx
```tsx
//empty
```

projects page.tsx
```tsx
export default function Projets() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-blue-500 text-zinc-300">

            <h1 className="text-4xl font-bold">PAGE PROJETS</h1>

            <div className="flex flex-row">

            </div>

        </div>
    );
}
```
projects/[slug] page.tsx
```tsx
//empty
```


ada-projects page.tsx
```tsx
export default function AdaProjects() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-blue-500 text-zinc-300">

            <h1 className="text-4xl font-bold">ADA PROJECTS</h1>

            <div className="flex flex-row">

            </div>

        </div>
    );
}
```
ada-projects/[slug] page.tsx
```tsx
//empty
```

src/components/button.tsx
```tsx
type Props = {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;  
}

export default function Button({onClick, children, disabled }: Props) {

    return (
        <button onClick={onClick} disabled={disabled}>{children}</button>
    )


}
```
src/components/FloatingButton.tsx
```tsx
"use client"
import { usePathname } from "next/navigation"

type Props = {
    
    children?: React.ReactNode;
}

export default function FloatingButton({children}:Props) {
    const pathname = usePathname()
    if (pathname === '/') {
        return (
            <button className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 flex justify-center items-center w-40 h-12 rounded-xl bg-white text-blue-900 hover:bg-transparent hover:border-amber-50 hover:border-2 hover:text-white" onClick={() => console.log("clicked")}> {children} </button>
        )
    } else {
        return null
    }
}

```

src/components/Navbar.tsx
```tsx
import Link from 'next/link'

const Navbar = () => {
    return (
        <header className="w-full bg-blue-600 text-white">
            <div className='flex justify-between p-4'>

            <div className="font-bold text-xl">
                <Link className="hover:text-blue-200" href={"/"}>LOGO</Link>
            </div>

            <nav>
                <ul className="flex gap-4 align-items-center" >
                    <li className="hover:text-blue-200"><Link href={"/promotions"}>Promotions</Link></li>
                    <li className="hover:text-blue-200"><Link href={"/ada-projects"}>Ada projects</Link></li>
                    <li className="hover:text-blue-200"><Link href={"/projects"}>Projects</Link></li>
                </ul>
            </nav>

            </div>
        </header>

    )

}

export default Navbar
```





# BACK

db/drizzle.ts
```ts
import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/neon-http';

config({ path: ".env" });

export const db = drizzle(process.env.DATABASE_URL!);

```

db/schema.ts
```ts
import { integer, text, pgTable, timestamp, serial, date } from "drizzle-orm/pg-core";

export const adaProjects = pgTable("ada_projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  projectName: text("project_name").notNull(),
  description: text("description"),
  imageUrl: text("image_url")
});


export const adaPromotions = pgTable("ada_promotions", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  promotionName: text("promotion_name").notNull(),
  imageUrl: text("image_url"),
  startDate: date("start_date").notNull(),
  bio: text("bio"),
});

export const studentProjects = pgTable("student_projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  imageUrl: text("image_url"),
  title: text("title").notNull(),
  githubUrl: text("github_url").notNull(),
  projectUrl: text("project_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
  promoId: integer("promo_id").references(()=> adaPromotions.id).notNull(),
  adaProjectId: integer("ada_project_id").references(()=> adaProjects.id).notNull(),

});
```


../src/app/api/ada-projects/route.ts
```tsx
import { NextResponse } from "next/server";
import { db } from "@/db/drizzle"
import { adaProjects } from "@/db/schema";


// POST ada project
export async function POST(req: Request) {
    const body = await req.json();
    console.log(body)
    if (!body) {
        return NextResponse.json({
            error: "no body has been sent",
            status: 400
        })
    }

    await db.insert(adaProjects).values(body);
    return NextResponse.json({ ok: true, message: "ada project created" })
}

// GET all ada projects
export async function GET() {
    const rows = await db.select().from(adaProjects);
    return NextResponse.json(rows)
}
```


../src/app/api/ada-projects/[id]/route.ts
```tsx
import { NextResponse } from "next/server"
import {db} from "@/db/drizzle"
import { adaProjects } from "@/db/schema"
import { eq } from "drizzle-orm";

type Context ={
    params: {
        id: string
    },
}


// GET all ada projects
export async function GET(_req: Request, {params}: Context){
    console.log("params->", await params)
    const {id} = await params
   
    const rows = await db.select().from(adaProjects).where(eq(adaProjects.id, Number(id)));
    return NextResponse.json(rows)
}
```

../src/app/api/projects/route.ts
```tsx
// POST

import { NextResponse } from "next/server";
import {db} from "@/db/drizzle";
import {studentProjects} from "@/db/schema";

// POST projects
export async function POST(req: Request){
    const body = await req.json();
    await db.insert(studentProjects).values(body);
    return NextResponse.json({ok: true})
}

// GET all projects
export async function GET(){
    const rows = await db.select().from(studentProjects);
    return NextResponse.json(rows);
}
```

../src/app/api/projects/[id]/route.ts
```tsx
import { NextResponse } from "next/server";
import {db} from "@/db/drizzle"
import { studentProjects } from "@/db/schema";
import { eq } from "drizzle-orm";

type Context = {
    params: {
        id: string;
    },
}

export async function GET (req_:Request, {params}:Context){

    const {id} = await params;

    const rows = await db.select().from(studentProjects).where(eq(studentProjects.id, Number(id)));
    return NextResponse.json(rows)
}
```

../src/app/api/promotions/route.ts
```tsx
import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { adaPromotions } from "@/db/schema";

//POST une/des promo
export async function POST(req: Request){
    const body = await req.json();
    await  db.insert(adaPromotions).values(body);
    return NextResponse.json({ok: "true"})

}


// GET all promos
export async function GET(){
    const rows = await db.select().from(adaPromotions)
    return NextResponse.json(rows)
}

```

../src/app/api/promotions/[id]/route.ts
```tsx
import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { adaPromotions } from "@/db/schema";
import { eq } from "drizzle-orm";

type Context = {
    params: {
        id: string;
    },
}

export async function GET(req_: Request, { params }: Context) {

    const { id } = await params;
    const rows = await db.select().from(adaPromotions).where(eq(adaPromotions.id, Number(id)));
    return NextResponse.json(rows);
}
```




