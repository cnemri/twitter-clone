import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: NextRequest) {
  try {
    const { currentUser } = await serverAuth();
    const { body } = await request.json();
    const searchParams = request.nextUrl.searchParams;
    const postId = searchParams.get("postId");

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        postId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Couldn't post comment - error: ${error}` },
      { status: 500 }
    );
  }
}
