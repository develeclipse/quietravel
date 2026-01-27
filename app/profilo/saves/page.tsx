import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ArrowLeft, Leaf, MapPin } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function SavesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth/signin?callbackUrl=/profilo/saves");
  }

  const savedDestinations = await prisma.savedDestination.findMany({
    where: { userId: session.user.id },
    include: {
      destination: {
        include: {
          _count: {
            select: { pois: true },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen px-6 pt-4 pb-24">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <Link
          href="/profilo"
          className="w-10 h-10 flex items-center justify-center bg-white rounded-full"
          style={{ border: "1px solid #E5E5E0" }}
        >
          <ArrowLeft style={{ width: "20px", height: "20px", color: "#1A1A1A" }} />
        </Link>
        <div>
          <h1 className="font-serif font-bold" style={{ fontSize: "24px", color: "#1A1A1A" }}>
            Le mie destinazioni
          </h1>
          <p className="font-sans" style={{ fontSize: "14px", color: "#6B6B6B" }}>
            {savedDestinations.length} {savedDestinations.length === 1 ? "città salvata" : "città salvate"}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {savedDestinations.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 20px",
              borderRadius: "50%",
              backgroundColor: "rgba(124, 95, 186, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MapPin style={{ width: "40px", height: "40px", color: "#7C5FBA" }} />
          </div>
          <h2 className="font-serif font-semibold mb-2" style={{ fontSize: "20px", color: "#1A1A1A" }}>
            Nessuna destinazione salvata
          </h2>
          <p className="font-sans mb-6" style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: "20px" }}>
            Inizia a esplorare e salva le destinazioni che ti piacciono
          </p>
          <Link
            href="/ispirazioni"
            className="btn-gradient font-sans font-semibold inline-block"
            style={{
              padding: "14px 32px",
              borderRadius: "24px",
              fontSize: "15px",
              color: "#FFFFFF",
              textDecoration: "none",
            }}
          >
            Scopri destinazioni
          </Link>
        </div>
      )}

      {/* Saved Destinations List */}
      {savedDestinations.length > 0 && (
        <div className="space-y-4">
          {savedDestinations.map((saved) => (
            <Link
              key={saved.id}
              href={`/destinazioni/${saved.destination.slug}`}
              className="block"
              style={{ textDecoration: "none" }}
            >
              <div
                className="card-shadow"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  border: "1px solid #F0F0EB",
                  padding: "20px",
                  display: "flex",
                  gap: "16px",
                }}
              >
                {/* Image placeholder */}
                {saved.destination.imageUrl ? (
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "16px",
                      backgroundImage: `url(${saved.destination.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, #E8F5F0 0%, #E0F0FA 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin style={{ width: "32px", height: "32px", color: "#7C5FBA" }} />
                  </div>
                )}

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div>
                      <h3 className="font-sans font-semibold mb-1" style={{ fontSize: "18px", color: "#1A1A1A" }}>
                        {saved.destination.name}
                      </h3>
                      <p className="font-sans" style={{ fontSize: "13px", color: "#6B6B6B" }}>
                        {saved.destination.subtitle || saved.destination.region}
                      </p>
                    </div>

                    {/* Quiet Score Badge */}
                    <div
                      className="score-gradient flex items-center gap-1"
                      style={{
                        padding: "6px 10px",
                        borderRadius: "16px",
                      }}
                    >
                      <Leaf style={{ width: "14px", height: "14px", color: "#FFFFFF" }} />
                      <span className="font-sans font-bold" style={{ fontSize: "14px", color: "#FFFFFF" }}>
                        {saved.destination.quietScore}
                      </span>
                    </div>
                  </div>

                  <p className="font-sans" style={{ fontSize: "13px", color: "#6B6B6B", lineHeight: "18px" }}>
                    {saved.destination._count.pois} luoghi • Salvata il{" "}
                    {new Date(saved.createdAt).toLocaleDateString("it-IT", {
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
