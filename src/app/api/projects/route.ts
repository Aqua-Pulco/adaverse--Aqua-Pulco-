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