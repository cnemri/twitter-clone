import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    const { currentUser } = await serverAuth();
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const updatedFollowingIds = [...(currentUser.followingIds || [])];
    if (updatedFollowingIds.includes(userId)) {
      throw new Error("Already following user");
    }
    updatedFollowingIds.push(userId);
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { followingIds: updatedFollowingIds },
    });
    try {
      await prisma.notification.create({
        data: {
          userId: userId,
          body: `${currentUser.username} followed you`,
        },
      });

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          hasNotification: true,
        },
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: `Couldn't trigger notification` },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Failed to follow user - error: ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = await request.json();
    const { currentUser } = await serverAuth();
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const updatedFollowingIds = [...(currentUser.followingIds || [])];

    const index = updatedFollowingIds.indexOf(userId);
    if (index === -1) {
      throw new Error("Not following user");
    }
    updatedFollowingIds.splice(index, 1);
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { followingIds: updatedFollowingIds },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Failed to unfollow user - error: ${error}` },
      { status: 500 }
    );
  }
}
