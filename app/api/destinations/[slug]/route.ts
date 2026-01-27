import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  try {
    const destination = await prisma.destination.findUnique({
      where: { slug: params.slug },
      include: {
        pois: {
          orderBy: {
            quietScore: "desc",
          },
        },
        tours: true,
        _count: {
          select: {
            savedDestinations: true,
          },
        },
      },
    });

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    return NextResponse.json(destination);
  } catch (error) {
    console.error("Error fetching destination:", error);
    return NextResponse.json({ error: "Failed to fetch destination" }, { status: 500 });
  }
}
