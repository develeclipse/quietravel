import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get("region");
    const minQuietScore = searchParams.get("minQuietScore");
    const featured = searchParams.get("featured");

    const destinations = await prisma.destination.findMany({
      where: {
        ...(region && { region }),
        ...(minQuietScore && { quietScore: { gte: parseInt(minQuietScore) } }),
        ...(featured === "true" && { featured: true }),
      },
      orderBy: {
        quietScore: "desc",
      },
      include: {
        _count: {
          select: {
            pois: true,
            tours: true,
          },
        },
      },
    });

    return NextResponse.json(destinations);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 });
  }
}
