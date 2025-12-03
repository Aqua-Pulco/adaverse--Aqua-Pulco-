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
export async function GET(_: Request, {params}: Context){
    console.log("params->", await params)
    const {id} = await params
   
    const rows = await db.select().from(adaProjects).where(eq(adaProjects.id, Number(id)));
    return NextResponse.json(rows)
}
