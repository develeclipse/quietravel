import * as fs from "fs";
import fetch from "node-fetch";

const API_URL = "http://localhost:3000/api/destinations/import";

async function main() {
  console.log("📂 Caricamento dati città...");

  const data = JSON.parse(fs.readFileSync("/tmp/cities-data.json", "utf-8"));
  const cities = data.cities;

  console.log(`✅ ${cities.length} città caricate`);

  // Filtra città quiet
  const quietCities = cities.filter((city) => {
    const qScore = parseFloat(city.QUIET_SCORE);
    const pop = parseInt(city.POP_RES || "0");
    return !isNaN(qScore) && qScore >= 8 && pop >= 3000 && city.comune_nome;
  });

  console.log(`🎯 ${quietCities.length} città quiet da importare`);

  // Prendi le prime 50 per test
  const toImport = quietCities.slice(0, 50).map((city) => ({
    comune_nome: city.comune_nome,
    prov_norm: city.prov_norm,
    REGIONE: city.REGIONE,
    POP_RES: city.POP_RES,
    QUIET_SCORE: city.QUIET_SCORE,
  }));

  console.log(`\n💾 Import di ${toImport.length} città in corso...`);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cities: toImport }),
    });

    const result = await res.json();

    if (result.success) {
      console.log(`\n✅ Import completato!`);
      console.log(`  📥 ${result.imported} importate`);
      console.log(`  ⏭️  ${result.skipped} già esistenti`);
      console.log(`  ❌ ${result.failed} fallite`);
    } else {
      console.error("❌ Errore:", result.error);
    }
  } catch (e: any) {
    console.error("❌ Errore chiamata API:", e.message);
    console.log("\n💡 Assicurati che il server sia in esecuzione con: pnpm dev");
  }
}

main();
