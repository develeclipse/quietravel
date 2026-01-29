import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";

const STATIC_DESTINATIONS = (() => {
  try {
    const filePath = path.join(process.cwd(), "public", "destinations.json");
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (e) {
    console.error("Error loading static destinations:", e);
  }
  return null;
})();

export async function POST(request: Request) {
  try {
    const { mood, duration, activities, region } = await request.json();

    try {
      const where: any = {};
      if (region && region !== "any") {
        where.region = region;
      }

      const destinations = await prisma.destination.findMany({
        where,
        include: {
          pois: activities?.length > 0
            ? { where: { type: { in: activities } } }
            : false,
          tours: true,
        },
        take: 20,
        orderBy: { quietScore: "desc" },
      });

      const scored = destinations.map((d: any) => {
        let score = d.quietScore;
        if (d.pois && d.pois.length > 0) score += d.pois.length * 5;
        if (d.tours && d.tours.length > 0) score += 10;
        return { ...d, matchScore: score };
      });

      scored.sort((a: any, b: any) => b.matchScore - a.matchScore);

      const suggestions = scored.slice(0, 5).map((d: any) => ({
        destination: {
          id: d.id, name: d.name, slug: d.slug, region: d.region,
          quietScore: d.quietScore, imageUrl: d.imageUrl,
        },
        pois: d.pois?.slice(0, 3) || [],
        suggestedDuration: duration || "2-3 giorni",
        activities: activities || [],
        matchScore: d.matchScore,
      }));

      const regions = await prisma.destination.findMany({
        select: { region: true },
        distinct: ["region"],
        orderBy: { region: "asc" },
      });

      return NextResponse.json({
        success: true,
        suggestions,
        filters: {
          regions: regions.map((r: any) => r.region).filter(Boolean),
          moods: ["Relax", "Avventura", "Cultura", "Natura", "Food"],
          durations: ["1 giorno", "2-3 giorni", "4-7 giorni", "Settimana"],
          activities: ["Natura", "Cultura", "Food", "Spiaggia", "Montagna", "Arte"],
        },
      });
    } catch (dbError) {
      console.warn("DB not available, using static data:", dbError);

      if (STATIC_DESTINATIONS) {
        let filtered = STATIC_DESTINATIONS;
        if (region && region !== "any") {
          filtered = filtered.filter((d: any) => d.region === region);
        }

        const scored = filtered.map((d: any) => ({
          ...d,
          matchScore: d.quietScore,
        })).sort((a: any, b: any) => b.quietScore - a.quietScore);

        const suggestions = scored.slice(0, 5).map((d: any) => ({
          destination: {
            id: d.id, name: d.name, slug: d.slug, region: d.region,
            quietScore: d.quietScore, imageUrl: d.imageUrl,
          },
          pois: [],
          suggestedDuration: duration || "2-3 giorni",
          activities: activities || [],
          matchScore: d.quietScore,
        }));

        const allRegions = [...new Set(STATIC_DESTINATIONS.map((d: any) => d.region))].filter(Boolean).sort();

        return NextResponse.json({
          success: true,
          suggestions,
          filters: {
            regions: allRegions,
            moods: ["Relax", "Avventura", "Cultura", "Natura", "Food"],
            durations: ["1 giorno", "2-3 giorni", "4-7 giorni", "Settimana"],
            activities: ["Natura", "Cultura", "Food", "Spiaggia", "Montagna", "Arte"],
          },
        });
      }
      throw dbError;
    }
  } catch (error: any) {
    console.error("Tour match error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allRegions = [...new Set(STATIC_DESTINATIONS?.map((d: any) => d.region))].filter(Boolean).sort();
    return NextResponse.json({
      ready: true,
      regions: allRegions,
      totalDestinations: STATIC_DESTINATIONS?.length || 0,
      avgQuietScore: 75,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
