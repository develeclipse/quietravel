import * as fs from "fs";
import fetch from "node-fetch";

const API_URL = "http://localhost:3000/api/destinations/import";

async function main() {
  console.log("📂 Caricamento dati...");
  const data = JSON.parse(fs.readFileSync("/tmp/cities-data.json", "utf-8"));
  const cities = data.cities;

  const quietCities = cities.filter((city) => {
    const qScore = parseFloat(city.QUIET_SCORE);
    const pop = parseInt(city.POP_RES || "0");
    return !isNaN(qScore) && qScore >= 8 && pop >= 3000 && city.comune_nome;
  });

  quietCities.sort((a, b) => parseFloat(b.QUIET_SCORE) - parseFloat(a.QUIET_SCORE));

  console.log(`🎯 ${quietCities.length} città quiet da importare`);
  console.log(`\n🚀 Import batch inizializzato...`);
  console.log(`Ora chiama:`);
  console.log(`curl -X POST -H "Content-Type: application/json" -d @/tmp/batch-1.json ${API_URL}`);
  console.log(`\nPer importare batch di città.`);

  // Salva batch per import manuale
  fs.writeFileSync("/tmp/batch-1.json", JSON.stringify({
    cities: quietCities.slice(0, 100).map((c) => ({
      comune_nome: c.comune_nome,
      prov_norm: c.prov_norm,
      REGIONE: c.REGIONE,
      POP_RES: c.POP_RES,
      QUIET_SCORE: c.QUIET_SCORE,
    })),
  }, null, 2));
  console.log(`\n💾 Salvato batch-1.json (100 città) in /tmp/`);

  fs.writeFileSync("/tmp/batch-2.json", JSON.stringify({
    cities: quietCities.slice(100, 200).map((c) => ({
      comune_nome: c.comune_nome,
      prov_norm: c.prov_norm,
      REGIONE: c.REGIONE,
      POP_RES: c.POP_RES,
      QUIET_SCORE: c.QUIET_SCORE,
    })),
  }, null, 2));
  console.log(`💾 Salvato batch-2.json (100 città) in /tmp/`);
}

main();
