"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function SignInPage() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        name: name.trim(),
        redirect: false,
      });

      if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        alert("Errore durante l'accesso");
      }
    } catch (error) {
      console.error("SignIn error:", error);
      alert("Errore durante l'accesso");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background: "linear-gradient(135deg, #E8F5F0 0%, #E0F0FA 100%)",
      }}
    >
      {!mounted ? (
        <div style={{ width: "64px", height: "64px", borderRadius: "20px", background: "linear-gradient(135deg, #7C5FBA 0%, #9B7FD9 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Sparkles style={{ width: "32px", height: "32px", color: "#FFFFFF" }} />
        </div>
      ) : (
      <div
        className="w-full max-w-md"
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "32px",
          padding: "40px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Logo / Icon */}
        <div
          style={{
            width: "64px",
            height: "64px",
            margin: "0 auto 24px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #7C5FBA 0%, #9B7FD9 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Sparkles style={{ width: "32px", height: "32px", color: "#FFFFFF" }} />
        </div>

        <h1
          className="font-serif font-bold text-center mb-2"
          style={{ fontSize: "28px", color: "#1A1A1A" }}
        >
          Benvenuto in QuieTravel
        </h1>

        <p
          className="font-sans text-center mb-8"
          style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: "20px" }}
        >
          Inizia il tuo viaggio verso destinazioni autentiche e tranquille
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "24px" }}>
            <label
              htmlFor="name"
              className="font-sans font-medium block mb-2"
              style={{ fontSize: "14px", color: "#1A1A1A" }}
            >
              Come ti chiami?
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Il tuo nome"
              disabled={isLoading}
              className="w-full font-sans"
              style={{
                height: "52px",
                padding: "0 20px",
                backgroundColor: "#F5F5F0",
                border: "1px solid #E5E5E0",
                borderRadius: "16px",
                fontSize: "15px",
                color: "#1A1A1A",
                outline: "none",
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            className="btn-gradient w-full font-sans font-semibold"
            style={{
              height: "52px",
              borderRadius: "16px",
              fontSize: "15px",
              color: "#FFFFFF",
              border: "none",
              opacity: isLoading || !name.trim() ? 0.5 : 1,
              cursor: isLoading || !name.trim() ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Accesso in corso..." : "Inizia l'avventura"}
          </button>
        </form>

        <p
          className="font-sans text-center mt-6"
          style={{ fontSize: "12px", color: "#9B9B9B", lineHeight: "18px" }}
        >
          Accedendo accetti di salvare le tue preferenze di viaggio per offrirti la migliore
          esperienza quiet
        </p>
      </div>
      )}
    </div>
  );
}
