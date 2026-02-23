export interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  priceRange: "₹" | "₹₹" | "₹₹₹";
  avgCost: number;
  studentDiscount?: number;
  isOpen: boolean;
  openHours: string;
  phone: string;
  tags: string[];
  image: string;
  clicks: number;
  views: number;
  offers: string[];
  nearCampus: boolean;
  verified?: boolean;
  established?: number;
  ownerId?: string; // id of the business_owner account who registered this listing
}

export type BadgeType = "verified" | "hidden-gem" | "trending" | "student-favorite" | "new";

export interface BusinessBadge {
  type: BadgeType;
  label: string;
}

// ──────────────────────────────────────────────────────────────────
// All businesses are in Amalapuram, Dr. B.R. Ambedkar Konaseema
// District, Andhra Pradesh (formerly East Godavari District).
// Centre coords: 16.5787° N, 82.0061° E
// ──────────────────────────────────────────────────────────────────

export const businesses: Business[] = [
  // ── FOOD & RESTAURANTS ───────────────────────────────────────────
  {
    id: "1",
    name: "Hotel Vishnu Sri",
    category: "Restaurant",
    description:
      "A 20-year legacy in Amalapuram. Famous for its mixed non-veg biryani, fish fry platters, and freshly made appam. Locals swear by the breakfast buffet.",
    address: "RTC Bus Stand Road, Amalapuram, AP 533201",
    lat: 16.5793,
    lng: 82.0048,
    rating: 4.5,
    reviewCount: 312,
    priceRange: "₹₹",
    avgCost: 180,
    studentDiscount: 10,
    isOpen: true,
    openHours: "6:00 AM - 11:00 PM",
    phone: "+91 88866 12345",
    tags: ["biryani", "non-veg", "breakfast", "fish-fry", "andhra"],
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop",
    clicks: 890,
    views: 5200,
    offers: ["Student lunch thali ₹99", "10% off on orders above ₹300"],
    nearCampus: true,
    verified: true,
    established: 2004,
  },
  {
    id: "2",
    name: "Hotel Subba Rao",
    category: "Restaurant",
    description:
      "Beloved breakfast spot on Main Road. Famous for idli-vada, pesarattu-upma combo, and filter coffee. Unpretentious, fresh, and outrageously good value.",
    address: "Main Road, Near Clock Tower, Amalapuram, AP 533201",
    lat: 16.5781,
    lng: 82.006,
    rating: 4.4,
    reviewCount: 278,
    priceRange: "₹",
    avgCost: 80,
    studentDiscount: 15,
    isOpen: true,
    openHours: "6:00 AM - 3:00 PM",
    phone: "+91 88866 23456",
    tags: ["breakfast", "idli", "pesarattu", "filter-coffee", "vegetarian"],
    image:
      "https://images.unsplash.com/photo-1567336273898-ebbf9eb3c3bf?w=400&h=300&fit=crop",
    clicks: 654,
    views: 4100,
    offers: ["Pesarattu + filter coffee combo ₹45"],
    nearCampus: false,
    verified: true,
    established: 2001,
  },
  {
    id: "3",
    name: "Ganapathi Food House",
    category: "Restaurant",
    description:
      "Iconic pure-veg Andhra tiffin centre. The coconut chutney here is spoken about across the district. Must-try: Punugulu and Gongura Pachadi.",
    address: "Mukteshwaram Road, Amalapuram, AP 533201",
    lat: 16.5775,
    lng: 82.0072,
    rating: 4.3,
    reviewCount: 196,
    priceRange: "₹",
    avgCost: 70,
    studentDiscount: 10,
    isOpen: true,
    openHours: "7:00 AM - 2:30 PM, 6:00 PM - 10:00 PM",
    phone: "+91 88866 34567",
    tags: ["vegetarian", "andhra-tiffin", "punugulu", "gongura", "coconut-chutney"],
    image:
      "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop",
    clicks: 445,
    views: 2900,
    offers: ["Tiffin plate ₹60 before 9AM"],
    nearCampus: true,
    verified: true,
    established: 2008,
  },
  {
    id: "4",
    name: "Prince Food Land",
    category: "Restaurant",
    description:
      "Amalapuram's first Mandi restaurant! Tender slow-cooked Mandi mutton and chicken served on a huge thal. Great for group outings and special occasions.",
    address: "Vidyut Nagar, Amalapuram, AP 533201",
    lat: 16.582,
    lng: 82.0055,
    rating: 4.6,
    reviewCount: 134,
    priceRange: "₹₹",
    avgCost: 350,
    isOpen: true,
    openHours: "12:00 PM - 11:00 PM",
    phone: "+91 88866 45678",
    tags: ["mandi", "non-veg", "mutton", "chicken", "group-dining"],
    image:
      "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&h=300&fit=crop",
    clicks: 567,
    views: 3800,
    offers: ["Mandi for 4 at ₹1099"],
    nearCampus: false,
    verified: true,
    established: 2019,
  },
  {
    id: "5",
    name: "Greentree Restaurant",
    category: "Restaurant",
    description:
      "A calm family restaurant popular for its full Andhra meals — coconut rice, pulusu, papads, and prawns curry freshly made from Godavari delta catch.",
    address: "Collectorate Road, Amalapuram, AP 533201",
    lat: 16.5799,
    lng: 82.0085,
    rating: 4.2,
    reviewCount: 210,
    priceRange: "₹₹",
    avgCost: 200,
    studentDiscount: 10,
    isOpen: true,
    openHours: "11:00 AM - 10:30 PM",
    phone: "+91 88866 56789",
    tags: ["family", "andhra-meals", "prawns", "fish-pulusu", "coconut-rice"],
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
    clicks: 398,
    views: 2700,
    offers: ["Andhra full meals ₹120"],
    nearCampus: false,
    verified: true,
    established: 2015,
  },
  // ── STREET FOOD ───────────────────────────────────────────────────
  {
    id: "6",
    name: "Durga's Spicy Treat",
    category: "Street Food",
    description:
      "A street-side legend near the RTC stand. The spicy mirchi bajji, hot bondas, and crispy vada pav are Amalapuram's after-school snack staple.",
    address: "Near RTC Bus Stand, Amalapuram Main Road, AP 533201",
    lat: 16.5787,
    lng: 82.0041,
    rating: 4.8,
    reviewCount: 64,
    priceRange: "₹",
    avgCost: 40,
    isOpen: true,
    openHours: "4:00 PM - 9:30 PM",
    phone: "+91 88866 67890",
    tags: ["mirchi-bajji", "bondas", "street-food", "evening-snacks", "spicy"],
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
    clicks: 312,
    views: 1480,
    offers: [],
    nearCampus: false,
    established: 2013,
  },
  {
    id: "7",
    name: "Sri Ganapathi Sweets & Bakery",
    category: "Street Food",
    description:
      "The go-to sweet shop for Putharekulu (paper-thin rice sweets) — Amalapuram's most famous export. Also stocks Bobbatlu and Kakinada Khaja.",
    address: "Chikkala Vari Street, Amalapuram, AP 533201",
    lat: 16.577,
    lng: 82.007,
    rating: 4.7,
    reviewCount: 187,
    priceRange: "₹",
    avgCost: 100,
    studentDiscount: 5,
    isOpen: true,
    openHours: "8:00 AM - 9:00 PM",
    phone: "+91 88866 78901",
    tags: ["putharekulu", "sweets", "bobbatlu", "bakery", "gifts"],
    image:
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
    clicks: 678,
    views: 3300,
    offers: ["500g Putharekulu gift box ₹149"],
    nearCampus: true,
    verified: true,
    established: 1998,
  },
  {
    id: "8",
    name: "ABCD Food Court",
    category: "Street Food",
    description:
      "Casual food court with chaat, pav bhaji, rolls, and fresh juices — a popular hangout spot for college students and families on evenings.",
    address: "Ashok Nagar, Amalapuram, AP 533201",
    lat: 16.5762,
    lng: 82.0033,
    rating: 4.1,
    reviewCount: 119,
    priceRange: "₹",
    avgCost: 60,
    studentDiscount: 10,
    isOpen: true,
    openHours: "4:00 PM - 10:00 PM",
    phone: "+91 88866 89012",
    tags: ["chaat", "pav-bhaji", "juice", "snacks", "hangout"],
    image:
      "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400&h=300&fit=crop",
    clicks: 289,
    views: 1700,
    offers: ["Juice + Snack combo ₹49"],
    nearCampus: true,
    established: 2020,
  },
  // ── SERVICES ──────────────────────────────────────────────────────
  {
    id: "9",
    name: "PixelPrint & Xerox Studio",
    category: "Services",
    description:
      "The busiest print shop in Amalapuram — spiral binding, colour prints, Aadhaar/certificates, and lamination. A student lifesaver before exams.",
    address: "Near Govt Degree College, Mukteshwaram Road, Amalapuram, AP 533201",
    lat: 16.5769,
    lng: 82.008,
    rating: 4.2,
    reviewCount: 154,
    priceRange: "₹",
    avgCost: 30,
    studentDiscount: 20,
    isOpen: true,
    openHours: "8:00 AM - 9:00 PM",
    phone: "+91 88866 90123",
    tags: ["printing", "xerox", "binding", "lamination", "stationery"],
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
    clicks: 723,
    views: 5100,
    offers: ["Student ID card printing ₹10", "20% off colour prints for students"],
    nearCampus: true,
    verified: true,
    established: 2016,
  },
  {
    id: "10",
    name: "Konaseema Phone Care",
    category: "Services",
    description:
      "Trusted mobile and laptop repair centre near the Clock Tower. Screen replacements, battery swaps, and data recovery done while you wait.",
    address: "Main Road, Near Clock Tower, Amalapuram, AP 533201",
    lat: 16.5779,
    lng: 82.0057,
    rating: 4.4,
    reviewCount: 89,
    priceRange: "₹₹",
    avgCost: 250,
    studentDiscount: 15,
    isOpen: true,
    openHours: "10:00 AM - 8:30 PM",
    phone: "+91 88866 01234",
    tags: ["mobile-repair", "laptop", "screen-replacement", "tech", "battery"],
    image:
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&h=300&fit=crop",
    clicks: 312,
    views: 2100,
    offers: ["Free screen guard with any repair"],
    nearCampus: false,
    verified: true,
    established: 2018,
  },
  {
    id: "11",
    name: "Zap Laundry Express",
    category: "Services",
    description:
      "Quick laundry and dry-clean service loved by hostel students. Pick-up and drop-off available. Same-day turnaround for express orders.",
    address: "Sri Rama Nagar Colony, Amalapuram, AP 533201",
    lat: 16.5758,
    lng: 82.0065,
    rating: 4.0,
    reviewCount: 47,
    priceRange: "₹",
    avgCost: 80,
    studentDiscount: 20,
    isOpen: true,
    openHours: "9:00 AM - 7:00 PM",
    phone: "+91 88866 11222",
    tags: ["laundry", "dry-clean", "hostel", "pickup-drop", "students"],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    clicks: 178,
    views: 1150,
    offers: ["Free pickup for orders above ₹150"],
    nearCampus: true,
    established: 2022,
  },
  // ── SHOPS / BOOKSTORE ─────────────────────────────────────────────
  {
    id: "12",
    name: "Visalandhra Book Centre",
    category: "Bookstore",
    description:
      "Andhra Pradesh's favourite bookstore chain, right here in Amalapuram. Telugu novels, school textbooks, competitive exam guides, and stationery all under one roof.",
    address: "Dommetivari Veedhi, Amalapuram, AP 533201",
    lat: 16.5788,
    lng: 82.0073,
    rating: 4.5,
    reviewCount: 103,
    priceRange: "₹",
    avgCost: 200,
    studentDiscount: 10,
    isOpen: true,
    openHours: "9:00 AM - 8:30 PM",
    phone: "+91 88866 22333",
    tags: ["books", "telugu-novels", "stationery", "textbooks", "exam-guides"],
    image:
      "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=400&h=300&fit=crop",
    clicks: 234,
    views: 1600,
    offers: ["10% off on all exam guides for students"],
    nearCampus: true,
    verified: true,
    established: 2005,
  },
  {
    id: "13",
    name: "D-Mart Amalapuram",
    category: "Shopping",
    description:
      "Amalapuram's largest multi-brand retail store. Groceries, clothing, electronics, and household goods at the best everyday prices in the district.",
    address: "Bobbarlanka Road, Amalapuram, AP 533201",
    lat: 16.5833,
    lng: 82.002,
    rating: 4.3,
    reviewCount: 421,
    priceRange: "₹₹",
    avgCost: 400,
    isOpen: true,
    openHours: "8:00 AM - 10:00 PM",
    phone: "+91 88866 33444",
    tags: ["supermarket", "grocery", "clothing", "household", "electronics"],
    image:
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400&h=300&fit=crop",
    clicks: 912,
    views: 6200,
    offers: ["Weekend combo offers on groceries"],
    nearCampus: false,
    verified: true,
    established: 2017,
  },
  // ── WORKSPACE / CAFE ─────────────────────────────────────────────
  {
    id: "14",
    name: "Godavari Reads Café",
    category: "Cafe",
    description:
      "A serene café-cum-study lounge overlooking the Konaseema backwaters. Filter kaapi, fresh coconut drinks, and light bites. Popular with engineering students for group projects.",
    address: "Ainavilli Road, Near Red Bridge, Amalapuram, AP 533201",
    lat: 16.5808,
    lng: 82.0092,
    rating: 4.6,
    reviewCount: 78,
    priceRange: "₹₹",
    avgCost: 150,
    studentDiscount: 15,
    isOpen: true,
    openHours: "8:00 AM - 10:00 PM",
    phone: "+91 88866 44555",
    tags: ["cafe", "study", "filter-coffee", "coconut", "backwaters", "wifi"],
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    clicks: 467,
    views: 2300,
    offers: ["Student WiFi + coffee combo ₹79", "15% off for college ID holders"],
    nearCampus: false,
    verified: true,
    established: 2021,
  },
  // ── FITNESS ───────────────────────────────────────────────────────
  {
    id: "15",
    name: "FitZone Gym — Amalapuram",
    category: "Fitness",
    description:
      "Modern AC gym with Zumba, strength training, and yoga classes. Affordable monthly plans designed for students and young professionals from the region.",
    address: "Vithanala Vari Palem Road, Amalapuram, AP 533201",
    lat: 16.5765,
    lng: 82.0048,
    rating: 4.2,
    reviewCount: 92,
    priceRange: "₹₹",
    avgCost: 400,
    studentDiscount: 30,
    isOpen: true,
    openHours: "5:00 AM - 10:00 PM",
    phone: "+91 88866 55666",
    tags: ["gym", "fitness", "zumba", "yoga", "strength-training"],
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    clicks: 278,
    views: 1900,
    offers: ["First month ₹399 for students with college ID"],
    nearCampus: true,
    verified: true,
    established: 2020,
  },
];

export const categories = [
  "All",
  "Restaurant",
  "Street Food",
  "Cafe",
  "Bookstore",
  "Shopping",
  "Services",
  "Fitness",
];

export function calculateTrustScore(business: Business): number {
  let score = 0;

  // Base rating contribution (0–40)
  score += (business.rating / 5) * 40;

  // Review count contribution (0–30)
  const reviewScore = Math.min(business.reviewCount / 100, 1) * 30;
  score += reviewScore;

  // Low review count penalty
  if (business.reviewCount < 10) score -= 10;

  // Engagement ratio (clicks / views) contribution (0–15)
  if (business.views > 0) {
    const engagement = business.clicks / business.views;
    score += Math.min(engagement * 100, 15);
  }

  // Offers bonus (0–10)
  if (business.offers.length > 0) score += 5;
  if (business.studentDiscount) score += 5;

  // Verified bonus
  if (business.verified) score += 5;

  return Math.max(0, Math.min(100, Math.round(score)));
}

export function getTrustTier(
  score: number,
): { label: string; tier: "verified" | "trusted" | "new" } {
  if (score >= 70) return { label: "Verified", tier: "verified" };
  if (score >= 45) return { label: "Trusted", tier: "trusted" };
  return { label: "New", tier: "new" };
}

export function isHiddenGem(business: Business): boolean {
  return business.rating >= 4.5 && business.views < 500;
}

export function isTrending(business: Business): boolean {
  if (business.views === 0) return false;
  const engagementRate = business.clicks / business.views;
  return engagementRate >= 0.15 && business.views >= 1000;
}

export function getBadges(business: Business): BusinessBadge[] {
  const badges: BusinessBadge[] = [];
  const score = calculateTrustScore(business);

  if (business.verified && score >= 70) badges.push({ type: "verified", label: "Verified" });
  if (isHiddenGem(business)) badges.push({ type: "hidden-gem", label: "Hidden Gem" });
  if (isTrending(business)) badges.push({ type: "trending", label: "Trending" });
  if ((business.studentDiscount ?? 0) >= 20) badges.push({ type: "student-favorite", label: "Student Fav" });
  if ((business.established ?? 0) >= 2022) badges.push({ type: "new", label: "New" });

  return badges;
}

export function getRecommendations(
  allBusinesses: Business[],
  preferences: {
    maxBudget?: number;
    category?: string;
    minRating?: number;
    studentMode?: boolean;
  },
): Business[] {
  let filtered = [...allBusinesses];

  if (preferences.maxBudget) {
    filtered = filtered.filter((b) => b.avgCost <= preferences.maxBudget!);
  }
  if (preferences.category && preferences.category !== "All") {
    filtered = filtered.filter((b) => b.category === preferences.category);
  }
  if (preferences.minRating) {
    filtered = filtered.filter((b) => b.rating >= preferences.minRating!);
  }
  if (preferences.studentMode) {
    filtered = filtered.filter(
      (b) => b.studentDiscount || b.nearCampus || b.avgCost <= 150,
    );
  }

  return filtered.sort((a, b) => {
    const scoreA =
      a.rating * 20 +
      (a.studentDiscount || 0) +
      (isHiddenGem(a) ? 20 : 0) +
      (isTrending(a) ? 15 : 0) +
      (a.verified ? 10 : 0);
    const scoreB =
      b.rating * 20 +
      (b.studentDiscount || 0) +
      (isHiddenGem(b) ? 20 : 0) +
      (isTrending(b) ? 15 : 0) +
      (b.verified ? 10 : 0);
    return scoreB - scoreA;
  });
}

// Platform stats for the landing page
export function getPlatformStats(allBusinesses: Business[]) {
  return {
    totalBusinesses: allBusinesses.length,
    totalViews: allBusinesses.reduce((s, b) => s + b.views, 0),
    totalClicks: allBusinesses.reduce((s, b) => s + b.clicks, 0),
    verifiedCount: allBusinesses.filter((b) => b.verified).length,
    hiddenGems: allBusinesses.filter(isHiddenGem).length,
    categoriesCount: new Set(allBusinesses.map((b) => b.category)).size,
  };
}
