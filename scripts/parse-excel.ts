import * as XLSX from "xlsx";

const workbook = XLSX.readFile("/tmp/quietravel.xlsx");
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

console.log("📊 Fogli disponibili:", workbook.SheetNames);
console.log("\n🔍 Primo foglio:", sheetName);
console.log("\n📋 Dati (prime 10 righe):\n");

const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
data.slice(0, 10).forEach((row: any, i) => {
  console.log(`Riga ${i}:`, row);
});

console.log(`\n✅ Totale righe: ${data.length}`);
