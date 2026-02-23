import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Star, MapPin, Clock, Phone, Tag, Eye, MousePointerClick } from "lucide-react";
import { Business, calculateTrustScore, isHiddenGem } from "@/data/businesses";
import TrustBadge from "./TrustBadge";

interface Props {
  business: Business | null;
  open: boolean;
  onClose: () => void;
  studentMode?: boolean;
}

const BusinessDetailSheet = ({ business, open, onClose, studentMode }: Props) => {
  if (!business) return null;
  const trustScore = calculateTrustScore(business);

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent className="overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading">{business.name}</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-5">
          <img
            src={business.image}
            alt={business.name}
            className="h-48 w-full rounded-xl object-cover"
          />

          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${business.isOpen ? "bg-trust-high/10 text-trust-high" : "bg-muted text-muted-foreground"}`}>
              {business.isOpen ? "Open Now" : "Closed"}
            </span>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
              {business.category}
            </span>
            <span className="text-lg font-bold text-primary">{business.priceRange}</span>
            {isHiddenGem(business) && (
              <span className="rounded-full bg-gem/10 px-2.5 py-0.5 text-xs font-semibold text-gem">
                💎 Hidden Gem
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">{business.description}</p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-card-foreground">
              <Star className="h-4 w-4 fill-trust-medium text-trust-medium" />
              <span className="font-semibold">{business.rating}</span>
              <span className="text-muted-foreground">({business.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {business.address}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" /> {business.openHours}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" /> {business.phone}
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-heading text-sm font-semibold text-card-foreground">Trust Score</h4>
            <TrustBadge score={trustScore} />
          </div>

          {business.studentDiscount && (
            <div className="rounded-lg border border-student/30 bg-student/5 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-student">
                <Tag className="h-4 w-4" /> Student Discount: {business.studentDiscount}% off
              </div>
            </div>
          )}

          {business.offers.length > 0 && (
            <div>
              <h4 className="mb-2 font-heading text-sm font-semibold text-card-foreground">Offers</h4>
              {business.offers.map((offer, i) => (
                <div key={i} className="rounded-lg bg-primary/5 px-3 py-2 text-sm text-primary">
                  🎁 {offer}
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {business.views} views</span>
            <span className="flex items-center gap-1"><MousePointerClick className="h-3 w-3" /> {business.clicks} clicks</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BusinessDetailSheet;
