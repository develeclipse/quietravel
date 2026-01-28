"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, MapPin, Navigation } from "lucide-react";
import Link from "next/link";

interface Destination {
  id: string;
  name: string;
  subtitle: string | null;
  region: string;
  quietScore: number;
  slug: string;
}

interface POI {
  id: string;
  name: string;
  type: string;
  quietScore: number;
  destination: {
    name: string;
    slug: string;
  };
}

interface SearchResults {
  destinations: Destination[];
  pois: POI[];
}

export function SearchBar({ placeholder = "Cerca luoghi quiet..." }: { placeholder?: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults(null);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
        setShowResults(true);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutRef.current);
  }, [query]);

  const clearSearch = () => {
    setQuery("");
    setResults(null);
    setShowResults(false);
  };

  const hasResults = results && (results.destinations.length > 0 || results.pois.length > 0);
  const noResults = results && results.destinations.length === 0 && results.pois.length === 0;

  return (
    <div ref={searchRef} className="relative">
      {/* Search Input */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: "18px", height: "18px", color: "#9B9B9B" }}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-11 font-sans"
          style={{
            height: "52px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E5E0",
            borderRadius: "26px",
            fontSize: "14px",
            color: "#1A1A1A",
            outline: "none",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          }}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2"
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#F0F0EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X style={{ width: "14px", height: "14px", color: "#6B6B6B" }} />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {showResults && (
        <div
          className="absolute top-full left-0 right-0 mt-2 max-h-96 overflow-y-auto"
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid #E5E5E0",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
            zIndex: 50,
          }}
        >
          {isLoading && (
            <div style={{ padding: "24px", textAlign: "center" }}>
              <div
                className="font-sans"
                style={{ fontSize: "14px", color: "#9B9B9B" }}
              >
                Cercando...
              </div>
            </div>
          )}

          {!isLoading && noResults && (
            <div style={{ padding: "24px", textAlign: "center" }}>
              <div
                className="font-sans"
                style={{ fontSize: "14px", color: "#6B6B6B" }}
              >
                Nessun risultato per "{query}"
              </div>
            </div>
          )}

          {!isLoading && hasResults && (
            <div style={{ padding: "12px" }}>
              {/* Destinations */}
              {results.destinations.length > 0 && (
                <div style={{ marginBottom: results.pois.length > 0 ? "12px" : "0" }}>
                  <div
                    className="font-sans font-semibold"
                    style={{
                      fontSize: "11px",
                      color: "#9B9B9B",
                      letterSpacing: "1px",
                      padding: "8px 12px",
                    }}
                  >
                    CITTÀ
                  </div>
                  {results.destinations.map((dest) => (
                    <Link
                      key={dest.id}
                      href={`/destinazioni/${dest.slug}`}
                      onClick={() => setShowResults(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px",
                        borderRadius: "12px",
                        backgroundColor: "#FFFFFF",
                        textDecoration: "none",
                      }}
                      className="hover:bg-gray-50"
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "12px",
                          backgroundColor: "rgba(124, 95, 186, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MapPin style={{ width: "20px", height: "20px", color: "#7C5FBA" }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          className="font-sans font-semibold"
                          style={{ fontSize: "15px", color: "#1A1A1A", marginBottom: "2px" }}
                        >
                          {dest.name}
                        </div>
                        <div className="font-sans" style={{ fontSize: "12px", color: "#6B6B6B" }}>
                          {dest.subtitle || dest.region}
                        </div>
                      </div>
                      <div
                        style={{
                          padding: "4px 8px",
                          borderRadius: "12px",
                          backgroundColor: "rgba(95, 184, 148, 0.15)",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#5FB894",
                        }}
                      >
                        Q{dest.quietScore}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* POIs */}
              {results.pois.length > 0 && (
                <div>
                  <div
                    className="font-sans font-semibold"
                    style={{
                      fontSize: "11px",
                      color: "#9B9B9B",
                      letterSpacing: "1px",
                      padding: "8px 12px",
                    }}
                  >
                    LUOGHI
                  </div>
                  {results.pois.map((poi) => (
                    <Link
                      key={poi.id}
                      href={`/destinazioni/${poi.destination.slug}#poi-${poi.id}`}
                      onClick={() => setShowResults(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px",
                        borderRadius: "12px",
                        backgroundColor: "#FFFFFF",
                        textDecoration: "none",
                      }}
                      className="hover:bg-gray-50"
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "12px",
                          backgroundColor: "rgba(232, 168, 85, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Navigation style={{ width: "20px", height: "20px", color: "#E8A855" }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          className="font-sans font-semibold"
                          style={{ fontSize: "15px", color: "#1A1A1A", marginBottom: "2px" }}
                        >
                          {poi.name}
                        </div>
                        <div className="font-sans" style={{ fontSize: "12px", color: "#6B6B6B" }}>
                          {poi.type} • {poi.destination.name}
                        </div>
                      </div>
                      <div
                        style={{
                          padding: "4px 8px",
                          borderRadius: "12px",
                          backgroundColor: "rgba(95, 184, 148, 0.15)",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#5FB894",
                        }}
                      >
                        Q{poi.quietScore}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
