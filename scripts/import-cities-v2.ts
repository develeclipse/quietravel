import * as fs from "fs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});
pool.on("connect", (client) => {
  client.query("SET search_path TO quiettravel");
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

interface CityData {
  year: string;
  COD_PROV: string;
  prov_norm: string;
  REGIONE: string;
  codice_istat_comune: string;
  comune_nome: string;
  POP_RES: string;
  KM2_COM_TERR: string;
  QUIET_SCORE: string;
}

async function main() {
  console.log("📂 Caricamento dati città...");

  const data = JSON.parse(fs.readFileSync("/tmp/cities-data.json", "utf-8"));
  const cities: CityData[] = data.cities;

  console.log(`✅ ${cities.length} città caricate`);

  const quietCities = cities.filter((city) => {
    const qScore = parseFloat(city.QUIET_SCORE);
    const pop = parseInt(city.POP_RES || "0");
    return !isNaN(qScore) && qScore >= 8 && pop >= 3000 && city.comune_nome;
  });

  console.log(`🎯 ${quietCities.length} città quiet trovate (Q-Score >= 8/10, pop >= 3000)`);

  quietCities.sort((a, b) => parseFloat(b.QUIET_SCORE) - parseFloat(a.QUIET_SCORE));

  const top100 = quietCities.slice(0, 100);

  console.log(`\n📋 Top 10 città quiet:`);
  top100.slice(0, 10).forEach((city, i) => {
    console.log(`${i + 1}. ${city.comune_nome} (${city.REGIONE}) - Q-Score: ${city.QUIET_SCORE}`);
  });

  console.log(`\n💾 Preparazione dati per import...`);

  const toImport = top100.map((city, index) => {
    const slug = city.comune_nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return {
      slug,
      name: city.comune_nome,
      subtitle: `Comune quiet ${city.prov_norm}`,
      region: city.REGIONE,
      province: city.prov_norm || city.REGIONE,
      description: `${city.comune_nome} è un comune ${city.REGIONE.toLowerCase()} con un eccellente Quiet Score di ${
        city.QUIET_SCORE
      }, ideale per chi cerca tranquillità e autenticità. Con ${parseInt(city.POP_RES || "0").toLocaleString()} abitanti, offre un'esperienza lontana dal turismo di massa.`,
      quietScore: Math.round(parseFloat(city.QUIET_SCORE) * 10),
      featured: index < 20,
    };
  });

  console.log(`📥 Import di ${toImport.length} città con createMany...`);

  try {
    const result = await prisma.destination.createMany({
      data: toImport,
      skipDuplicates: true,
    });

    console.log(`\n✅ Import completato!`);
    console.log(`  📥 ${result.count} città importate`);
    console.log(`  ⏭️  ${toImport.length - result.count} saltate (già esistenti)`);
  } catch (error: any) {
    console.error("❌ Errore durante l'import:", error.message);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("❌ Errore fatale:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
