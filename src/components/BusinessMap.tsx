import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Business } from "@/data/businesses";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface BusinessMapProps {
  businesses: Business[];
  selectedBusiness?: Business | null;
  onSelectBusiness?: (business: Business) => void;
  className?: string;
}

const BusinessMap = ({ businesses, selectedBusiness, onSelectBusiness, className }: BusinessMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = L.map(containerRef.current).setView([28.6139, 77.209], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    businesses.forEach((biz) => {
      const marker = L.marker([biz.lat, biz.lng])
        .addTo(mapRef.current!)
        .bindPopup(
          `<div style="min-width:180px;font-family:DM Sans,sans-serif">
            <strong style="font-family:Space Grotesk,sans-serif">${biz.name}</strong>
            <br/><span style="color:#666;font-size:12px">${biz.category} • ${biz.priceRange}</span>
            <br/><span style="font-size:13px">⭐ ${biz.rating} (${biz.reviewCount})</span>
            <br/><span style="color:#888;font-size:12px">📍 ${biz.address}</span>
            <p style="font-size:12px;margin-top:4px">${biz.description}</p>
          </div>`
        )
        .on("click", () => onSelectBusiness?.(biz));

      markersRef.current.push(marker);
    });
  }, [businesses, onSelectBusiness]);

  // Fly to selected
  useEffect(() => {
    if (selectedBusiness && mapRef.current) {
      mapRef.current.flyTo([selectedBusiness.lat, selectedBusiness.lng], 16, { duration: 1 });
    }
  }, [selectedBusiness]);

  return (
    <div className={`overflow-hidden rounded-xl border border-border ${className || ""}`}>
      <div ref={containerRef} style={{ height: "100%", width: "100%", minHeight: "400px" }} />
    </div>
  );
};

export default BusinessMap;
