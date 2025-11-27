
import { db } from "@/db/drizzle";
// import { tableTypescript } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function GET() {
  return Response.json({message: "Premier test de route ✌"})
}