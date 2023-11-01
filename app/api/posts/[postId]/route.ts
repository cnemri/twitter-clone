import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params;
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Could not fetch post. error - ${error}` },
      { status: 500 }
    );
  }
}
