import * as fs from 'fs';
const data = JSON.parse(fs.readFileSync('/tmp/cities-data.json', 'utf-8'));
const cities = data.cities.filter(c => parseFloat(c.QUIET_SCORE) >= 8 && parseInt(c.POP_RES||'0') >= 3000 && c.comune_nome);
cities.sort((a,b) => parseFloat(b.QUIET_SCORE) - parseFloat(a.QUIET_SCORE));
const testCity = cities[0];
console.log('Test city:', testCity.comune_nome, 'Q:', testCity.QUIET_SCORE);
