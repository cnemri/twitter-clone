import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid user id");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const followersCount = await prisma.user.count({
      where: { followingIds: { has: userId } },
    });

    return NextResponse.json({ ...user, followersCount }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Couldn't get user - error: ${error}` },
      { status: 500 }
    );
  }
}
