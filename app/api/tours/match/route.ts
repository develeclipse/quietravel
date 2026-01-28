import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Match destinations based on preferences
export async function POST(request: Request) {
  try {
    const { mood, duration, activities, region, budget } = await request.json();

    // Build query filters
    const where: any = {};

    // Filter by region if specified
    if (region && region !== "any") {
      where.region = region;
    }

    // Get matching destinations
    const destinations = await prisma.destination.findMany({
      where,
      include: {
        pois: activities?.length > 0
          ? {
              where: {
                type: { in: activities },
              },
            }
          : false,
        tours: true,
      },
      take: 20,
      orderBy: { quietScore: "desc" },
    });

    // Score and rank destinations based on preferences
    const scored = destinations.map((d: any) => {
      let score = d.quietScore;

      // Bonus for POI matches
      if (d.pois && d.pois.length > 0) {
        score += d.pois.length * 5;
      }

      // Bonus for tours
      if (d.tours && d.tours.length > 0) {
        score += 10;
      }

      return { ...d, matchScore: score };
    });

    // Sort by match score
    scored.sort((a: any, b: any) => b.matchScore - a.matchScore);

    // Generate tour suggestions
    const suggestions = scored.slice(0, 5).map((d) => ({
      destination: {
        id: d.id,
        name: d.name,
        slug: d.slug,
        region: d.region,
        quietScore: d.quietScore,
        imageUrl: d.imageUrl,
      },
      pois: d.pois?.slice(0, 3) || [],
      suggestedDuration: duration || "2-3 giorni",
      activities: activities || [],
      matchScore: d.matchScore,
    }));

    // Get available options for filters
    const regions = await prisma.destination.findMany({
      select: { region: true },
      distinct: ["region"],
      orderBy: { region: "asc" },
    });

    return NextResponse.json({
      success: true,
      suggestions,
      filters: {
        regions: regions.map((r) => r.region).filter(Boolean),
        moods: ["Relax", "Avventura", "Cultura", "Natura", "Food"],
        durations: ["1 giorno", "2-3 giorni", "4-7 giorni", "Settimana"],
        activities: ["Natura", "Cultura", "Food", "Spiaggia", "Montagna", "Arte"],
      },
    });
  } catch (error: any) {
    console.error("Tour match error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get available options for tour builder
export async function GET() {
  try {
    const regions = await prisma.destination.findMany({
      select: { region: true },
      distinct: ["region"],
      orderBy: { region: "asc" },
    });

    const stats = await prisma.destination.aggregate({
      _avg: { quietScore: true },
      _count: true,
    });

    return NextResponse.json({
      ready: true,
      regions: regions.map((r) => r.region).filter(Boolean),
      totalDestinations: stats._count,
      avgQuietScore: Math.round(stats._avg.quietScore || 0),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
