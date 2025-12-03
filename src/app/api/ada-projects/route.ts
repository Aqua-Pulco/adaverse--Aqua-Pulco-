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

