import * as fs from 'fs';

const data = JSON.parse(fs.readFileSync('/tmp/cities-data.json', 'utf-8'));
const cities = data.cities;

const quietCities = cities.filter(c => {
  const q = parseFloat(c.QUIET_SCORE);
  const p = parseInt(c.POP_RES || '0');
  return !isNaN(q) && q >= 8 && p >= 3000 && c.comune_nome;
}).sort((a,b) => parseFloat(b.QUIET_SCORE) - parseFloat(a.QUIET_SCORE));

console.log(`Total quiet cities: ${quietCities.length}`);

// Generate batch files for remaining cities (skip first 200 already imported)
const start = 200;
const batchSize = 100;

for (let i = 0; i < 10; i++) {
  const batchNum = i + 3;
  const batchCities = quietCities.slice(start + (i * batchSize), start + ((i + 1) * batchSize));
  
  if (batchCities.length === 0) break;
  
  const batch = {
    cities: batchCities.map(c => ({
      comune_nome: c.comune_nome,
      prov_norm: c.prov_norm,
      REGIONE: c.REGIONE,
      POP_RES: c.POP_RES,
      QUIET_SCORE: c.QUIET_SCORE,
    }))
  };
  
  fs.writeFileSync(`/tmp/batch-${batchNum}.json`, JSON.stringify(batch, null, 2));
  console.log(`Batch ${batchNum}: ${batchCities.length} cities`);
}
