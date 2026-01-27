"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export function SaveDestinationButton({ destinationId }: { destinationId: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if saved on mount
  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/saves/check?destinationId=${destinationId}`)
        .then((res) => res.json())
        .then((data) => setIsSaved(data.saved))
        .catch(console.error);
    }
  }, [session, destinationId]);

  const handleToggle = async () => {
    // Require login
    if (status === "unauthenticated") {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (!session?.user?.id) return;

    setIsLoading(true);

    try {
      const method = isSaved ? "DELETE" : "POST";
      const res = await fetch("/api/saves/destinations", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destinationId }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsSaved(data.saved);
      }
    } catch (error) {
      console.error("Error toggling save:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className="card-shadow font-sans font-semibold flex items-center justify-center gap-2"
      style={{
        height: "48px",
        backgroundColor: isSaved ? "#7C5FBA" : "#FFFFFF",
        border: isSaved ? "1px solid #7C5FBA" : "1px solid #E5E5E0",
        borderRadius: "24px",
        fontSize: "14px",
        color: isSaved ? "#FFFFFF" : "#1A1A1A",
        opacity: isLoading ? 0.6 : 1,
        cursor: isLoading ? "not-allowed" : "pointer",
        transition: "all 0.2s",
      }}
    >
      <Heart
        style={{
          width: "18px",
          height: "18px",
          fill: isSaved ? "#FFFFFF" : "none",
        }}
      />
      {isSaved ? "Salvata" : "Salva"}
    </button>
  );
}
