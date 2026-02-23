import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { getTrustTier } from "@/data/businesses";

interface TrustBadgeProps {
  score: number;
  size?: "sm" | "md";
  showLabel?: boolean;
}

const TrustBadge = ({ score, size = "md", showLabel = false }: TrustBadgeProps) => {
  const { label, tier } = getTrustTier(score);

  const colorMap = {
    verified: "text-trust-high bg-trust-high/10 border-trust-high/30",
    trusted: "text-trust-medium bg-trust-medium/10 border-trust-medium/30",
    new: "text-trust-low bg-trust-low/10 border-trust-low/30",
  };

  const barColorMap = {
    verified: "bg-trust-high",
    trusted: "bg-trust-medium",
    new: "bg-trust-low",
  };

  const IconMap = {
    verified: ShieldCheck,
    trusted: Shield,
    new: ShieldAlert,
  };

  const Icon = IconMap[tier];
  const isSmall = size === "sm";

  return (
    <div className={`flex items-center gap-1.5 rounded-full border px-2 py-0.5 ${colorMap[tier]} ${isSmall ? "text-xs" : "text-sm"}`}>
      <Icon className={isSmall ? "h-3 w-3" : "h-3.5 w-3.5"} />
      <span className="font-semibold">{score}</span>
      {showLabel && (
        <span className="font-medium opacity-80">{label}</span>
      )}
      <div className={`${isSmall ? "h-1 w-8" : "h-1.5 w-12"} overflow-hidden rounded-full bg-muted`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColorMap[tier]}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

export default TrustBadge;
