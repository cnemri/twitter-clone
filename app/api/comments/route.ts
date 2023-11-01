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

    try {
      const post = await prisma.post.findUnique({
        where: { id: postId },
      });
      if (post?.userId) {
        await prisma.notification.create({
          data: {
            userId: post.userId,
            body: `${currentUser.username} replied to your tweet`,
          },
        });

        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: `Couldn't trigger notification` },
        { status: 500 }
      );
    }

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Couldn't post comment - error: ${error}` },
      { status: 500 }
    );
  }
}
