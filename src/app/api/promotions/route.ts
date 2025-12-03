import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { adaPromotions } from "@/db/schema";

//POST une/des promo
export async function POST(req: Request){
    const body = await req.json();
    await  db.insert(adaPromotions).values(body);
    return NextResponse.json({ok: "true"})

}

