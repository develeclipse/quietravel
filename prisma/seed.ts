import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

// Setup connection pool  
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
});

// Set search_path to quiettravel schema
pool.on("connect", (client) => {
  client.query("SET search_path TO quiettravel");
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Crea achievements
  const achievements = await Promise.all([
    prisma.achievement.upsert({
      where: { slug: "first-save" },
      update: {},
      create: {
        slug: "first-save",
        name: "Prima Scoperta",
        description: "Salva la tua prima città",
        icon: "⭐",
        requirement: JSON.stringify({ type: "savedDestinations", count: 1 }),
      },
    }),
    prisma.achievement.upsert({
      where: { slug: "quiet-explorer" },
      update: {},
      create: {
        slug: "quiet-explorer",
        name: "Cercatore di Quiete",
        description: "Salva 3 città e pianifica 2 viaggi",
        icon: "🌿",
        requirement: JSON.stringify({ type: "savedDestinations", count: 3, trips: 2 }),
      },
    }),
  ]);

  // Crea destinazioni reali
  const maratea = await prisma.destination.upsert({
    where: { slug: "maratea" },
    update: {},
    create: {
      slug: "maratea",
      name: "Maratea",
      subtitle: "Perla del Tirreno",
      region: "Basilicata",
      province: "Potenza",
      description:
        "Costa lucana tra Campania e Calabria. Cristo Redentore, spiagge selvagge, cucina di mare autentica. Un borgo marinaro dove la quiete incontra il mare cristallino.",
      quietScore: 78,
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      lat: 39.9986,
      lng: 15.7142,
      featured: true,
    },
  });

  const cefalu = await prisma.destination.upsert({
    where: { slug: "cefalu" },
    update: {},
    create: {
      slug: "cefalu",
      name: "Cefalù",
      subtitle: "Sicilia normanna",
      region: "Sicilia",
      province: "Palermo",
      description:
        "Borgo marinaro con Duomo normanno, spiaggia dorata e Lavatoio medievale. Un angolo di paradiso dove storia e mare si fondono.",
      quietScore: 65,
      imageUrl: "https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?w=800&q=80",
      lat: 38.0389,
      lng: 14.0227,
      featured: true,
    },
  });

  const urbino = await prisma.destination.upsert({
    where: { slug: "urbino" },
    update: {},
    create: {
      slug: "urbino",
      name: "Urbino",
      subtitle: "Gioiello rinascimentale",
      region: "Marche",
      province: "Pesaro e Urbino",
      description:
        "Città ideale del Rinascimento, Palazzo Ducale e atmosfera universitaria tranquilla. Un museo a cielo aperto immerso nelle colline marchigiane.",
      quietScore: 82,
      imageUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
      lat: 43.7263,
      lng: 12.6363,
      featured: true,
    },
  });

  const castelmezzano = await prisma.destination.upsert({
    where: { slug: "castelmezzano" },
    update: {},
    create: {
      slug: "castelmezzano",
      name: "Castelmezzano",
      subtitle: "Borgo tra le rocce",
      region: "Basilicata",
      province: "Potenza",
      description:
        "Uno dei borghi più belli d'Italia, incastonato tra le Dolomiti Lucane. Natura selvaggia e pace assoluta.",
      quietScore: 91,
      imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80",
      lat: 40.5294,
      lng: 15.9956,
      featured: true,
    },
  });

  const sperlonga = await prisma.destination.upsert({
    where: { slug: "sperlonga" },
    update: {},
    create: {
      slug: "sperlonga",
      name: "Sperlonga",
      subtitle: "Borgo bianco sul mare",
      region: "Lazio",
      province: "Latina",
      description:
        "Casette bianche arroccate sulla scogliera, spiagge dorate e un mare cristallino. La Grotta di Tiberio racconta storie antiche.",
      quietScore: 70,
      imageUrl: "https://images.unsplash.com/photo-1598974357801-cbf027647dca?w=800&q=80",
      lat: 41.2575,
      lng: 13.4333,
      featured: false,
    },
  });

  // Aggiungi POI per Maratea
  await prisma.pOI.createMany({
    data: [
      {
        name: "Cristo Redentore",
        type: "Cultura",
        description: "Statua monumentale alta 21 metri che domina il golfo",
        quietScore: 85,
        lat: 39.9920,
        lng: 15.7250,
        destinationId: maratea.id,
        imageUrl: "https://images.unsplash.com/photo-1565362367988-9b0e1e95fb53?w=800&q=80",
      },
      {
        name: "Spiaggia Nera",
        type: "Natura",
        description: "Caletta con sabbia vulcanica e acque cristalline",
        quietScore: 88,
        lat: 39.9850,
        lng: 15.7180,
        destinationId: maratea.id,
      },
      {
        name: "Antico Borgo",
        type: "Cultura",
        description: "Centro storico medievale con vicoli suggestivi",
        quietScore: 79,
        lat: 40.0010,
        lng: 15.7160,
        destinationId: maratea.id,
      },
    ],
  });

  // Aggiungi POI per Urbino
  await prisma.pOI.createMany({
    data: [
      {
        name: "Palazzo Ducale",
        type: "Arte",
        description: "Capolavoro rinascimentale, dimora dei Duchi di Montefeltro",
        quietScore: 80,
        lat: 43.7260,
        lng: 12.6365,
        destinationId: urbino.id,
        imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      },
      {
        name: "Casa di Raffaello",
        type: "Arte",
        description: "Museo nella casa natale del grande pittore",
        quietScore: 75,
        lat: 43.7270,
        lng: 12.6360,
        destinationId: urbino.id,
      },
      {
        name: "Orto Botanico",
        type: "Natura",
        description: "Giardino universitario con piante rare e vista panoramica",
        quietScore: 90,
        lat: 43.7255,
        lng: 12.6370,
        destinationId: urbino.id,
      },
    ],
  });

  // Crea tour esempio
  await prisma.tour.create({
    data: {
      name: "Maratea Slow Experience",
      description: "Un giorno tra mare, natura e spiritualità",
      duration: "Giornata intera",
      radius: 8,
      mood: ["natura", "benessere", "cultura"],
      destinationId: maratea.id,
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    },
  });

  console.log("✅ Seed completato!");
  console.log(`📍 Destinazioni: 5`);
  console.log(`🗺️  POI: 6`);
  console.log(`🎯 Achievement: 2`);
  console.log(`🚶 Tour: 1`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
