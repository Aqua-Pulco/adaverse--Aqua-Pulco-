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
   
    const rows = await db.select().from(adaProjects).where(eq(adaProjects.id, Number(params.id)));
    return NextResponse.json(rows)
}
