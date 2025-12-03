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