import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
    NextResponse.json(
      { error: `Couldn't get users - error: ${error}` },
      { status: 500 }
    );
  }
}
