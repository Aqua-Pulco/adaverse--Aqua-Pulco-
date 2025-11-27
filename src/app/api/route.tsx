
import { db } from "@/db/drizzle";
// import { tableTypescript } from "@/db/schema";
import { eq } from "drizzle-orm";
import { request } from "http";

// lire
export async function GET() {
  return Response.json({message: "Premier test de route ✌"})
}

//créer
export async function POST(request: Request) {
  const body = await request.json()
  return Response.json({recu: body})
}


//modifier
export async function PUT(request: Request) {
  const body = await request.json();
  return Response.json({update: body});
}

//supprimer

export async function DELETE() {
  return Response.json({deleted: true});
}