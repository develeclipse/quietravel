-- CreateTable
CREATE TABLE "qt_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qt_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qt_destinations" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subtitle" TEXT,
    "region" TEXT NOT NULL,
    "province" TEXT,
    "description" TEXT,
    "quietScore" INTEGER NOT NULL DEFAULT 0,
    "imageUrl" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qt_destinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qt_pois" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "quietScore" INTEGER NOT NULL DEFAULT 0,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT,
    "address" TEXT,
    "openingHours" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "destinationId" TEXT NOT NULL,

    CONSTRAINT "qt_pois_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qt_tours" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "duration" TEXT NOT NULL,
    "radius" INTEGER NOT NULL DEFAULT 5,
    "mood" TEXT[],
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "destinationId" TEXT NOT NULL,

    CONSTRAINT "qt_tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qt_saved_destinations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,

    CONSTRAINT "qt_saved_destinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qt_saved_pois" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "poiId" TEXT NOT NULL,

    CONSTRAINT "qt_saved_pois_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qt_saved_tours" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "tourId" TEXT NOT NULL,

    CONSTRAINT "qt_saved_tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qt_user_stats" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'Curioso Urbano',
    "averageQuietScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalTrips" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "qt_user_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qt_achievements" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "qt_achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qt_user_achievements" (
    "id" TEXT NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,

    CONSTRAINT "qt_user_achievements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "qt_users_email_key" ON "qt_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "qt_destinations_slug_key" ON "qt_destinations"("slug");

-- CreateIndex
CREATE INDEX "qt_destinations_region_idx" ON "qt_destinations"("region");

-- CreateIndex
CREATE INDEX "qt_destinations_quietScore_idx" ON "qt_destinations"("quietScore");

-- CreateIndex
CREATE INDEX "qt_pois_type_idx" ON "qt_pois"("type");

-- CreateIndex
CREATE INDEX "qt_pois_quietScore_idx" ON "qt_pois"("quietScore");

-- CreateIndex
CREATE UNIQUE INDEX "qt_saved_destinations_userId_destinationId_key" ON "qt_saved_destinations"("userId", "destinationId");

-- CreateIndex
CREATE UNIQUE INDEX "qt_saved_pois_userId_poiId_key" ON "qt_saved_pois"("userId", "poiId");

-- CreateIndex
CREATE UNIQUE INDEX "qt_saved_tours_userId_tourId_key" ON "qt_saved_tours"("userId", "tourId");

-- CreateIndex
CREATE UNIQUE INDEX "qt_user_stats_userId_key" ON "qt_user_stats"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "qt_achievements_slug_key" ON "qt_achievements"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "qt_user_achievements_userId_achievementId_key" ON "qt_user_achievements"("userId", "achievementId");

-- AddForeignKey
ALTER TABLE "qt_pois" ADD CONSTRAINT "qt_pois_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "qt_destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qt_tours" ADD CONSTRAINT "qt_tours_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "qt_destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qt_saved_destinations" ADD CONSTRAINT "qt_saved_destinations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "qt_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qt_saved_destinations" ADD CONSTRAINT "qt_saved_destinations_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "qt_destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qt_saved_pois" ADD CONSTRAINT "qt_saved_pois_userId_fkey" FOREIGN KEY ("userId") REFERENCES "qt_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qt_saved_pois" ADD CONSTRAINT "qt_saved_pois_poiId_fkey" FOREIGN KEY ("poiId") REFERENCES "qt_pois"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qt_saved_tours" ADD CONSTRAINT "qt_saved_tours_userId_fkey" FOREIGN KEY ("userId") REFERENCES "qt_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qt_saved_tours" ADD CONSTRAINT "qt_saved_tours_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "qt_tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qt_user_stats" ADD CONSTRAINT "qt_user_stats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "qt_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qt_user_achievements" ADD CONSTRAINT "qt_user_achievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "qt_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qt_user_achievements" ADD CONSTRAINT "qt_user_achievements_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "qt_achievements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
