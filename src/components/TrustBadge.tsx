import { Shield } from "lucide-react";

interface TrustBadgeProps {
  score: number;
  size?: "sm" | "md";
}

const TrustBadge = ({ score, size = "md" }: TrustBadgeProps) => {
  const getColor = () => {
    if (score >= 70) return "text-trust-high bg-trust-high/10 border-trust-high/30";
    if (score >= 45) return "text-trust-medium bg-trust-medium/10 border-trust-medium/30";
    return "text-trust-low bg-trust-low/10 border-trust-low/30";
  };

  const getBarColor = () => {
    if (score >= 70) return "bg-trust-high";
    if (score >= 45) return "bg-trust-medium";
    return "bg-trust-low";
  };

  const isSmall = size === "sm";

  return (
    <div className={`flex items-center gap-1.5 rounded-full border px-2 py-0.5 ${getColor()} ${isSmall ? "text-xs" : "text-sm"}`}>
      <Shield className={isSmall ? "h-3 w-3" : "h-3.5 w-3.5"} />
      <span className="font-semibold">{score}</span>
      <div className={`${isSmall ? "h-1 w-8" : "h-1.5 w-12"} overflow-hidden rounded-full bg-muted`}>
        <div className={`h-full rounded-full ${getBarColor()}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
};

export default TrustBadge;
