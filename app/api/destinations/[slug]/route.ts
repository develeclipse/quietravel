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

export async function GET(request: Request, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  try {
    try {
      const destination = await prisma.destination.findUnique({
        where: { slug: params.slug },
        include: {
          pois: { orderBy: { quietScore: "desc" } },
          tours: true,
          _count: { select: { savedDestinations: true } },
        },
      });

      if (destination) {
        return NextResponse.json(destination);
      }
    } catch (dbError) {
      console.warn("DB not available, using static data:", dbError);
    }

    // Fallback to static JSON
    if (STATIC_DESTINATIONS) {
      const destination = STATIC_DESTINATIONS.find((d: any) => d.slug === params.slug);
      if (destination) {
        return NextResponse.json({
          ...destination,
          pois: [],
          tours: [],
          _count: { savedDestinations: 0 },
        });
      }
    }

    return NextResponse.json({ error: "Destination not found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching destination:", error);
    return NextResponse.json({ error: "Failed to fetch destination" }, { status: 500 });
  }
}
