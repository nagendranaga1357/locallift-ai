import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Star, MapPin, Clock, Phone, Tag, Eye, MousePointerClick, Gem, TrendingUp, BadgeCheck, Building2 } from "lucide-react";
import { Business, calculateTrustScore, isHiddenGem, isTrending, getBadges } from "@/data/businesses";
import TrustBadge from "./TrustBadge";
import { Badge } from "@/components/ui/badge";

interface Props {
  business: Business | null;
  open: boolean;
  onClose: () => void;
  studentMode?: boolean;
}

const badgeColorMap: Record<string, string> = {
  "hidden-gem": "bg-gem/10 text-gem border-gem/30",
  trending: "bg-orange-500/10 text-orange-600 border-orange-300",
  verified: "bg-trust-high/10 text-trust-high border-trust-high/30",
  "student-favorite": "bg-student/10 text-student border-student/30",
  new: "bg-accent/10 text-accent border-accent/30",
};

const BadgeIconMap: Record<string, React.ReactNode> = {
  "hidden-gem": <Gem className="h-3 w-3" />,
  trending: <TrendingUp className="h-3 w-3" />,
  verified: <BadgeCheck className="h-3 w-3" />,
  "student-favorite": <Tag className="h-3 w-3" />,
};

const BusinessDetailSheet = ({ business, open, onClose, studentMode }: Props) => {
  if (!business) return null;
  const trustScore = calculateTrustScore(business);
  const badges = getBadges(business);
  const engagementRate =
    business.views > 0 ? Math.round((business.clicks / business.views) * 100) : 0;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent className="overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading">{business.name}</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-5">
          {/* Hero image */}
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={business.image}
              alt={business.name}
              className="h-52 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              {badges.map((badge) => (
                <span
                  key={badge.type}
                  className={`flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm ${badgeColorMap[badge.type] || ""}`}
                >
                  {BadgeIconMap[badge.type]}
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${business.isOpen
                  ? "bg-trust-high/10 text-trust-high"
                  : "bg-muted text-muted-foreground"
                }`}
            >
              {business.isOpen ? "Open Now" : "Closed"}
            </span>
            <Badge variant="secondary">{business.category}</Badge>
            <span className="text-lg font-bold text-primary">{business.priceRange}</span>
            {business.established && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Building2 className="h-3 w-3" /> Est. {business.established}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-muted-foreground">{business.description}</p>

          {/* Details */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-card-foreground">
              <Star className="h-4 w-4 fill-trust-medium text-trust-medium" />
              <span className="font-semibold">{business.rating}</span>
              <span className="text-muted-foreground">({business.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              {business.address}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0" />
              {business.openHours}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0" />
              {business.phone}
            </div>
          </div>

          {/* Trust Score */}
          <div className="rounded-xl border border-border bg-secondary/40 p-4">
            <h4 className="mb-3 font-heading text-sm font-semibold text-card-foreground">
              Trust Score Breakdown
            </h4>
            <TrustBadge score={trustScore} showLabel />
            <div className="mt-3 grid grid-cols-3 gap-3 text-center text-xs">
              <div className="rounded-lg bg-card p-2">
                <p className="font-bold text-card-foreground">{business.rating}/5</p>
                <p className="text-muted-foreground">Rating</p>
              </div>
              <div className="rounded-lg bg-card p-2">
                <p className="font-bold text-card-foreground">{business.reviewCount}</p>
                <p className="text-muted-foreground">Reviews</p>
              </div>
              <div className="rounded-lg bg-card p-2">
                <p className="font-bold text-card-foreground">{engagementRate}%</p>
                <p className="text-muted-foreground">Engagement</p>
              </div>
            </div>
          </div>

          {/* Student Discount */}
          {business.studentDiscount && (
            <div className="rounded-lg border border-student/30 bg-student/5 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-student">
                <Tag className="h-4 w-4" />
                Student Discount: {business.studentDiscount}% off
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Show your student ID at the counter to avail this offer.
              </p>
            </div>
          )}

          {/* Offers */}
          {business.offers.length > 0 && (
            <div>
              <h4 className="mb-2 font-heading text-sm font-semibold text-card-foreground">
                Active Offers
              </h4>
              <div className="space-y-2">
                {business.offers.map((offer, i) => (
                  <div key={i} className="rounded-lg bg-primary/5 px-3 py-2 text-sm text-primary">
                    🎁 {offer}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {business.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {business.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="flex gap-4 rounded-lg border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" />{" "}
              <span className="font-semibold text-card-foreground">{business.views.toLocaleString()}</span> views
            </span>
            <span className="flex items-center gap-1.5">
              <MousePointerClick className="h-3.5 w-3.5" />{" "}
              <span className="font-semibold text-card-foreground">{business.clicks.toLocaleString()}</span> clicks
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" />{" "}
              <span className="font-semibold text-card-foreground">{engagementRate}%</span> CTR
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BusinessDetailSheet;
