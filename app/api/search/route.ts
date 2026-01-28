import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";

// Load static destinations for fallback
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ destinations: [], pois: [] });
    }

    const searchTerm = query.trim().toLowerCase();

    try {
      // Try database first
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
        orderBy: { quietScore: "desc" },
      });

      return NextResponse.json({ destinations, pois: [] });
    } catch (dbError) {
      // Fallback to static JSON
      if (STATIC_DESTINATIONS) {
        const results = STATIC_DESTINATIONS.filter((d: any) =>
          d.name.toLowerCase().includes(searchTerm) ||
          d.region?.toLowerCase().includes(searchTerm) ||
          d.subtitle?.toLowerCase().includes(searchTerm)
        ).slice(0, 10);

        return NextResponse.json({ destinations: results, pois: [] });
      }
      throw dbError;
    }
  } catch (error) {
    console.error("Error searching:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
