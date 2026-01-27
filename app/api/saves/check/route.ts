import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

// Check if destination is saved
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ saved: false });
    }

    const { searchParams } = new URL(request.url);
    const destinationId = searchParams.get("destinationId");

    if (!destinationId) {
      return NextResponse.json({ error: "destinationId required" }, { status: 400 });
    }

    const saved = await prisma.savedDestination.findUnique({
      where: {
        userId_destinationId: {
          userId: session.user.id,
          destinationId,
        },
      },
    });

    return NextResponse.json({ saved: !!saved });
  } catch (error) {
    console.error("Error checking saved status:", error);
    return NextResponse.json({ saved: false });
  }
}
