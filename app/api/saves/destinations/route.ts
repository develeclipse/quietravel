import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

// GET saved destinations for current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const saved = await prisma.savedDestination.findMany({
      where: { userId: session.user.id },
      include: {
        destination: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(saved.map((s) => s.destination));
  } catch (error) {
    console.error("Error fetching saved destinations:", error);
    return NextResponse.json({ error: "Failed to fetch saved destinations" }, { status: 500 });
  }
}

// POST - Save destination
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { destinationId } = await request.json();

    if (!destinationId) {
      return NextResponse.json({ error: "destinationId required" }, { status: 400 });
    }

    // Check if already saved
    const existing = await prisma.savedDestination.findUnique({
      where: {
        userId_destinationId: {
          userId: session.user.id,
          destinationId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ message: "Already saved", saved: true });
    }

    // Save it
    await prisma.savedDestination.create({
      data: {
        userId: session.user.id,
        destinationId,
      },
    });

    // Update user stats
    await updateUserStats(session.user.id);

    return NextResponse.json({ message: "Destination saved", saved: true });
  } catch (error) {
    console.error("Error saving destination:", error);
    return NextResponse.json({ error: "Failed to save destination" }, { status: 500 });
  }
}

// DELETE - Unsave destination
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { destinationId } = await request.json();

    if (!destinationId) {
      return NextResponse.json({ error: "destinationId required" }, { status: 400 });
    }

    await prisma.savedDestination.deleteMany({
      where: {
        userId: session.user.id,
        destinationId,
      },
    });

    // Update user stats
    await updateUserStats(session.user.id);

    return NextResponse.json({ message: "Destination unsaved", saved: false });
  } catch (error) {
    console.error("Error unsaving destination:", error);
    return NextResponse.json({ error: "Failed to unsave destination" }, { status: 500 });
  }
}

// Helper: Update user stats
async function updateUserStats(userId: string) {
  const savedCount = await prisma.savedDestination.count({
    where: { userId },
  });

  const savedDestinations = await prisma.savedDestination.findMany({
    where: { userId },
    include: {
      destination: {
        select: { quietScore: true },
      },
    },
  });

  const avgQuietScore =
    savedDestinations.length > 0
      ? savedDestinations.reduce((sum, s) => sum + s.destination.quietScore, 0) /
        savedDestinations.length
      : 0;

  // Determine level based on saved count
  let level = "Curioso Urbano";
  if (savedCount >= 10) level = "Esploratore Quiet";
  else if (savedCount >= 5) level = "Viaggiatore Consapevole";
  else if (savedCount >= 3) level = "Cercatore di Quiete";

  await prisma.userStats.upsert({
    where: { userId },
    update: {
      averageQuietScore: avgQuietScore,
      level,
    },
    create: {
      userId,
      averageQuietScore: avgQuietScore,
      level,
    },
  });

  // Check achievements
  await checkAchievements(userId, savedCount);
}

// Helper: Check and unlock achievements
async function checkAchievements(userId: string, savedCount: number) {
  const achievements = await prisma.achievement.findMany();

  for (const achievement of achievements) {
    const req = JSON.parse(achievement.requirement);

    let shouldUnlock = false;

    if (req.type === "savedDestinations" && savedCount >= req.count) {
      shouldUnlock = true;
    }

    if (shouldUnlock) {
      await prisma.userAchievement.upsert({
        where: {
          userId_achievementId: {
            userId,
            achievementId: achievement.id,
          },
        },
        update: {
          progress: savedCount,
          isCompleted: true,
        },
        create: {
          userId,
          achievementId: achievement.id,
          progress: savedCount,
          isCompleted: true,
        },
      });
    }
  }
}
