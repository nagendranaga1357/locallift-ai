import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Business, calculateTrustScore } from "@/data/businesses";

const categoryColors: Record<string, string> = {
  Cafe: "#f97316",
  Restaurant: "#ef4444",
  "Street Food": "#eab308",
  Bookstore: "#8b5cf6",
  Services: "#3b82f6",
  Workspace: "#06b6d4",
  Fitness: "#22c55e",
  Other: "#6b7280",
};

function createCustomIcon(category: string, isOpen: boolean) {
  const color = categoryColors[category] || categoryColors.Other;
  const opacity = isOpen ? "1" : "0.5";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40" style="opacity:${opacity}">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 8.837 16 24 16 24S32 24.837 32 16C32 7.163 24.837 0 16 0z"
            fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="16" cy="16" r="8" fill="white" opacity="0.9"/>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -42],
  });
}

interface BusinessMapProps {
  businesses: Business[];
  selectedBusiness?: Business | null;
  onSelectBusiness?: (business: Business) => void;
  className?: string;
}

const BusinessMap = ({
  businesses,
  selectedBusiness,
  onSelectBusiness,
  className,
}: BusinessMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = L.map(containerRef.current, {
      zoomControl: true,
      // Amalapuram, Dr. B.R. Ambedkar Konaseema Dist., Andhra Pradesh
    }).setView([16.5787, 82.0061], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    businesses.forEach((biz) => {
      const trustScore = calculateTrustScore(biz);
      const icon = createCustomIcon(biz.category, biz.isOpen);

      const marker = L.marker([biz.lat, biz.lng], { icon })
        .addTo(mapRef.current!)
        .bindPopup(
          `<div style="min-width:190px;font-family:'DM Sans',sans-serif;padding:4px 2px">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
              <div style="width:10px;height:10px;border-radius:50%;background:${categoryColors[biz.category] || "#6b7280"};flex-shrink:0"></div>
              <strong style="font-family:'Space Grotesk',sans-serif;font-size:14px">${biz.name}</strong>
            </div>
            <div style="color:#666;font-size:12px;margin-bottom:4px">${biz.category} &bull; ${biz.priceRange}</div>
            <div style="font-size:13px;margin-bottom:3px">⭐ ${biz.rating} <span style="color:#888">(${biz.reviewCount} reviews)</span></div>
            <div style="color:#888;font-size:12px;margin-bottom:3px">📍 ${biz.address}</div>
            <div style="display:flex;gap:6px;margin-top:6px">
              <span style="background:${biz.isOpen ? "#22c55e" : "#9ca3af"};color:white;font-size:11px;padding:2px 8px;border-radius:99px">${biz.isOpen ? "Open" : "Closed"}</span>
              <span style="background:#f97316;color:white;font-size:11px;padding:2px 8px;border-radius:99px">Trust: ${trustScore}</span>
            </div>
            ${biz.offers.length > 0 ? `<div style="margin-top:6px;background:#fff7ed;padding:4px 8px;border-radius:6px;font-size:11px;color:#f97316">🎁 ${biz.offers[0]}</div>` : ""}
          </div>`,
          { maxWidth: 220 }
        )
        .on("click", () => onSelectBusiness?.(biz));

      markersRef.current.push(marker);
    });
  }, [businesses, onSelectBusiness]);

  // Fly to selected
  useEffect(() => {
    if (selectedBusiness && mapRef.current) {
      mapRef.current.flyTo([selectedBusiness.lat, selectedBusiness.lng], 16, {
        duration: 1,
      });
    }
  }, [selectedBusiness]);

  // Legend colors for categories present
  const visibleCategories = [...new Set(businesses.map((b) => b.category))];

  return (
    <div className={`relative overflow-hidden rounded-xl border border-border ${className || ""}`}>
      <div
        ref={containerRef}
        style={{ height: "100%", width: "100%", minHeight: "400px" }}
      />
      {/* Map legend */}
      <div className="absolute bottom-3 left-3 z-[1000] rounded-xl border border-border bg-card/90 p-2.5 shadow-lg backdrop-blur-sm">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          Categories
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {visibleCategories.map((cat) => (
            <div key={cat} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: categoryColors[cat] || "#6b7280" }}
              />
              <span className="text-[10px] text-muted-foreground">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessMap;
