import fs from 'fs';

const data = JSON.parse(fs.readFileSync('/tmp/cities-data.json', 'utf-8'));
const cities = data.cities;

console.log('Totale città da importare:', cities.length);

// Create batches
const batchSize = 100;
const batches = [];

for (let i = 0; i < cities.length; i += batchSize) {
  const batch = cities.slice(i, i + batchSize).map(c => ({
    comune_nome: c.comune_nome,
    prov_norm: c.prov_norm,
    REGIONE: c.REGIONE,
    POP_RES: c.POP_RES,
    QUIET_SCORE: c.QUIET_SCORE,
    description: `${c.comune_nome} è un comune ${c.REGIONE?.toLowerCase() || 'italiano'}.`
  }));
  batches.push(batch);
}

console.log('Batch creati:', batches.length);
console.log('Primo batch:', batches[0].length, 'città');

// Save all batches
for (let i = 0; i < batches.length; i++) {
  fs.writeFileSync(`/tmp/all-cities-batch-${i+1}.json`, JSON.stringify({ cities: batches[i] }, null, 2));
}

console.log(`\n${batches.length} file batch salvati in /tmp/`);
console.log('Pronto per import con:');
console.log('  curl -X POST -H "Content-Type: application/json" -d @/tmp/all-cities-batch-1.json http://localhost:3000/api/destinations/import');
