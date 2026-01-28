import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cities } = body;

    if (!cities || !Array.isArray(cities)) {
      return NextResponse.json({ error: "Missing cities array" }, { status: 400 });
    }

    console.log(`📥 Import di ${cities.length} città...`);

    let imported = 0;
    let skipped = 0;
    let failed = 0;

    for (const city of cities) {
      try {
        const slug = city.slug || city.comune_nome
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        await prisma.destination.upsert({
          where: { slug },
          update: {},
          create: {
            slug,
            name: city.comune_nome,
            subtitle: `Comune quiet ${city.prov_norm}`,
            region: city.REGIONE,
            province: city.prov_norm || city.REGIONE,
            description: city.description || `${city.comune_nome} è un comune ${city.REGIONE?.toLowerCase()} con un eccellente Quiet Score di ${city.QUIET_SCORE}.`,
            quietScore: Math.round(parseFloat(city.QUIET_SCORE) * 10),
            featured: false,
          },
        });
        imported++;
      } catch (e: any) {
        if (e.code === "P2002") {
          skipped++;
        } else {
          console.error(`Errore ${city.comune_nome}:`, e.message);
          failed++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      imported,
      skipped,
      failed,
      total: cities.length,
    });
  } catch (error: any) {
    console.error("Import error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    ready: true,
    info: "POST with { cities: [...] } to import cities from Excel data",
  });
}
