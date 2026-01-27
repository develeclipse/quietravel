import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ destinations: [], pois: [] });
    }

    const searchTerm = query.trim().toLowerCase();

    // Search destinations
    const destinations = await prisma.destination.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { subtitle: { contains: searchTerm, mode: "insensitive" } },
          { region: { contains: searchTerm, mode: "insensitive" } },
          { province: { contains: searchTerm, mode: "insensitive" } },
          { description: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
      take: 10,
      orderBy: {
        quietScore: "desc",
      },
    });

    // Search POIs
    const pois = await prisma.pOI.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { type: { contains: searchTerm, mode: "insensitive" } },
          { description: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
      take: 10,
      include: {
        destination: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        quietScore: "desc",
      },
    });

    return NextResponse.json({ destinations, pois });
  } catch (error) {
    console.error("Error searching:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
