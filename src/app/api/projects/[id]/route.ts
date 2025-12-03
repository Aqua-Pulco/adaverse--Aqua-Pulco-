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