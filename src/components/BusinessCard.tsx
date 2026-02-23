import { Star, MapPin, Clock, Gem, Tag, TrendingUp, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Business, calculateTrustScore, isHiddenGem, isTrending, getBadges } from "@/data/businesses";
import TrustBadge from "./TrustBadge";

interface BusinessCardProps {
  business: Business;
  studentMode?: boolean;
  onClick?: () => void;
}

const BadgeIcon = ({ type }: { type: string }) => {
  if (type === "hidden-gem") return <Gem className="h-3 w-3" />;
  if (type === "trending") return <TrendingUp className="h-3 w-3" />;
  if (type === "verified") return <BadgeCheck className="h-3 w-3" />;
  if (type === "student-favorite") return <Tag className="h-3 w-3" />;
  return null;
};

const badgeColorMap: Record<string, string> = {
  "hidden-gem": "bg-gem text-primary-foreground",
  trending: "bg-orange-500 text-white",
  verified: "bg-trust-high text-primary-foreground",
  "student-favorite": "bg-student text-primary-foreground",
  new: "bg-accent text-accent-foreground",
};

const BusinessCard = ({ business, studentMode, onClick }: BusinessCardProps) => {
  const trustScore = calculateTrustScore(business);
  const badges = getBadges(business);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-elevated group cursor-pointer overflow-hidden rounded-xl border border-border bg-card"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={business.image}
          alt={business.name}
          className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Left badges */}
        <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
          {badges.slice(0, 2).map((badge) => (
            <span
              key={badge.type}
              className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${badgeColorMap[badge.type] || "bg-secondary text-secondary-foreground"}`}
            >
              <BadgeIcon type={badge.type} />
              {badge.label}
            </span>
          ))}
          {studentMode && business.studentDiscount && (
            <span className="flex items-center gap-1 rounded-full bg-student px-2 py-0.5 text-xs font-semibold text-primary-foreground">
              <Tag className="h-3 w-3" /> {business.studentDiscount}% off
            </span>
          )}
        </div>

        {/* Open/Closed pill */}
        <div className="absolute right-2 top-2">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${business.isOpen
                ? "bg-trust-high/90 text-primary-foreground"
                : "bg-muted text-muted-foreground"
              }`}
          >
            {business.isOpen ? "Open" : "Closed"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-start justify-between">
          <div>
            <h3 className="font-heading text-base font-semibold text-card-foreground">
              {business.name}
            </h3>
            <p className="text-xs text-muted-foreground">{business.category}</p>
          </div>
          <span className="text-lg font-bold text-primary">{business.priceRange}</span>
        </div>

        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {business.description}
        </p>

        <div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-trust-medium text-trust-medium" />
            <span className="font-semibold text-card-foreground">{business.rating}</span>
            <span>({business.reviewCount})</span>
          </span>
          <span className="flex items-center gap-1 truncate">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{business.address.split(",")[0]}</span>
          </span>
        </div>

        <div className="flex items-center justify-between">
          <TrustBadge score={trustScore} size="sm" />
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {business.openHours.split(" - ")[0]}
          </span>
        </div>

        {business.offers.length > 0 && (
          <div className="mt-2 rounded-lg bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
            🎁 {business.offers[0]}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BusinessCard;
