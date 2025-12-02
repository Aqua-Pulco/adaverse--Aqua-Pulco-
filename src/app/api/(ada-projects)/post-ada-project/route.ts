import { NextResponse } from "next/server"; 
import {db} from "@/db/drizzle"
import { adaProjects } from "@/db/schema";

export async function POST(req:Request) {
    const body = await req.json();
    await db.insert(adaProjects).values(body);
    return NextResponse.json({ok:true, message: "ada project created"})
}