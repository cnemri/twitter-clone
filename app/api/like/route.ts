import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

const fetchData = async (request: Request) => {
  const { postId } = await request.json();
  const { currentUser } = await serverAuth();
  if (!postId || typeof postId !== "string") {
    throw new Error("Invalid ID");
  }
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });
  if (!post) {
    throw new Error("Post not found");
  }
  const updatedLikeIds = [...(post.likeIds || [])];
  return { currentUser, postId, updatedLikeIds };
};

export async function POST(request: Request) {
  try {
    const { currentUser, postId, updatedLikeIds } = await fetchData(request);
    if (updatedLikeIds.includes(currentUser?.id)) {
      throw new Error("Already liked post");
    }
    updatedLikeIds.push(currentUser.id);
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { likeIds: updatedLikeIds },
    });
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Couldn't like post - error: ${error}` },
      { status: 500 }
    );
  }
}
export async function DELETE(request: Request) {
  try {
    const { currentUser, postId, updatedLikeIds } = await fetchData(request);
    const index = updatedLikeIds.indexOf(currentUser.id);
    if (index === -1) {
      throw new Error("Not liked post");
    }
    updatedLikeIds.splice(index, 1);
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { likeIds: updatedLikeIds },
    });
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Couldn't unlike post - error: ${error}` },
      { status: 500 }
    );
  }
}
