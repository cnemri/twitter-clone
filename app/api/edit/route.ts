import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function PATCH(request: Request) {
  try {
    const { currentUser } = await serverAuth();
    const { name, username, bio, profileImage, coverImage } =
      await request.json();
    if (!name || !username) {
      throw new Error("Missing fields");
    }
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { name, username, bio, profileImage, coverImage },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    NextResponse.json(
      { error: `Couldn't edit user - error: ${error}` },
      { status: 500 }
    );
  }
}
