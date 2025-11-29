// POST

import { NextResponse } from "next/server";
import {db} from "@/db/drizzle";
import {studentProjects} from "@/db/schema";


export async function POST(req: Request){
    const body = await req.json();
    await db.insert(studentProjects).values(body);
    return NextResponse.json({ok: true})
}

//NEXT FORMULAIRE !! 