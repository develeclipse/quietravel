import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";

// Fallback to static JSON when DB is not available
const STATIC_DESTINATIONS = process.env.NODE_ENV === "production" 
  ? (() => {
      try {
        const filePath = path.join(process.cwd(), "public", "destinations.json");
        if (fs.existsSync(filePath)) {
          return JSON.parse(fs.readFileSync(filePath, "utf-8"));
        }
      } catch (e) {
        console.error("Error loading static destinations:", e);
      }
      return null;
    })()
  : null;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get("region");
    const minQuietScore = searchParams.get("minQuietScore");
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");

    // Try database first
    try {
      const destinations = await prisma.destination.findMany({
        where: {
          ...(region && { region }),
          ...(minQuietScore && { quietScore: { gte: parseInt(minQuietScore) } }),
          ...(featured === "true" && { featured: true }),
        },
        orderBy: { quietScore: "desc" },
        take: limit ? parseInt(limit) : undefined,
        include: {
          _count: { select: { pois: true, tours: true } },
        },
      });
      return NextResponse.json(destinations);
    } catch (dbError) {
      console.warn("DB not available, using static data:", dbError);
      
      // Fallback to static JSON
      if (STATIC_DESTINATIONS) {
        let results = [...STATIC_DESTINATIONS];
        
        if (region) {
          results = results.filter((d: any) => d.region === region);
        }
        if (minQuietScore) {
          results = results.filter((d: any) => d.quietScore >= parseInt(minQuietScore));
        }
        if (featured === "true") {
          results = results.filter((d: any) => d.featured);
        }
        
        results.sort((a: any, b: any) => b.quietScore - a.quietScore);
        if (limit) {
          results = results.slice(0, parseInt(limit));
        }
        
        return NextResponse.json(results);
      }
      
      throw dbError;
    }
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 });
  }
}
