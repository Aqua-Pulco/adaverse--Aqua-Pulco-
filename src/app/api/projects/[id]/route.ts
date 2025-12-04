import { NextResponse } from "next/server";
import {db} from "@/db/drizzle"
import { studentProjects } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

type Context = {
    params: {
        id: string;
    },
}

export async function GET (_req:Request, {params}:Context){

    const {id} = await params;

    const rows = await db.select().from(studentProjects).where(eq(studentProjects.id, Number(id)));
    return NextResponse.json(rows)
}


export async function PATCH (_req:Request, {params}:Context){

    const {id} = await params;

    await db.update(studentProjects).set({publishedAt: sql`NOW()`}).where(eq(studentProjects.id, Number(id)));
    return NextResponse.json({ok: true});
}