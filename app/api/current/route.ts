import { NextResponse } from "next/server";
import serverAuth from "@/libs/serverAuth";

export async function GET(request: Request) {
  try {
    const { currentUser } = await serverAuth();
    return NextResponse.json(currentUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Couldn't get current user - error: ${error}` },
      { status: 500 }
    );
  }
}
