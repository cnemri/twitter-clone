import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    let posts;
    if (userId) {
      posts = await prisma.post.findMany({
        where: {
          userId,
        },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      posts = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Could not fetch posts. error - ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { currentUser } = await serverAuth();
    const { body } = await request.json();
    const post = await prisma.post.create({
      data: {
        body,
        userId: currentUser.id,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Could not fetch posts. error - ${error}` },
      { status: 500 }
    );
  }
}
