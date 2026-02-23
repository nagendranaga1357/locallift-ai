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
}

export const businesses: Business[] = [
  {
    id: "1",
    name: "Chai Corner",
    category: "Cafe",
    description: "Authentic chai and snacks loved by students. Hidden gem near the campus gate.",
    address: "12 College Road, Near Main Gate",
    lat: 28.6139,
    lng: 77.209,
    rating: 4.6,
    reviewCount: 42,
    priceRange: "₹",
    avgCost: 80,
    studentDiscount: 15,
    isOpen: true,
    openHours: "7:00 AM - 10:00 PM",
    phone: "+91 98765 43210",
    tags: ["chai", "snacks", "budget", "student-friendly"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    clicks: 234,
    views: 1890,
    offers: ["10% off on combo meals"],
    nearCampus: true,
  },
  {
    id: "2",
    name: "The Book Nook",
    category: "Bookstore",
    description: "A cozy secondhand bookstore with rare finds and a reading corner.",
    address: "45 Library Lane, Sector 5",
    lat: 28.6159,
    lng: 77.212,
    rating: 4.8,
    reviewCount: 18,
    priceRange: "₹",
    avgCost: 150,
    studentDiscount: 20,
    isOpen: true,
    openHours: "9:00 AM - 8:00 PM",
    phone: "+91 98765 43211",
    tags: ["books", "reading", "secondhand", "quiet"],
    image: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=400&h=300&fit=crop",
    clicks: 89,
    views: 450,
    offers: ["Buy 2 Get 1 Free on weekdays"],
    nearCampus: true,
  },
  {
    id: "3",
    name: "Spice Kitchen",
    category: "Restaurant",
    description: "Home-style Indian meals with generous portions. A student staple for years.",
    address: "78 Food Street, Block B",
    lat: 28.6119,
    lng: 77.207,
    rating: 4.3,
    reviewCount: 156,
    priceRange: "₹₹",
    avgCost: 180,
    studentDiscount: 10,
    isOpen: true,
    openHours: "11:00 AM - 11:00 PM",
    phone: "+91 98765 43212",
    tags: ["indian", "meals", "thali", "vegetarian"],
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    clicks: 567,
    views: 3200,
    offers: ["Student thali at ₹120"],
    nearCampus: false,
  },
  {
    id: "4",
    name: "PixelPrint Studio",
    category: "Services",
    description: "Fast printing, photocopies, and binding. The go-to shop before exams.",
    address: "3 Campus Circle, Near Library",
    lat: 28.6145,
    lng: 77.211,
    rating: 4.1,
    reviewCount: 87,
    priceRange: "₹",
    avgCost: 50,
    studentDiscount: 25,
    isOpen: true,
    openHours: "8:00 AM - 9:00 PM",
    phone: "+91 98765 43213",
    tags: ["printing", "photocopy", "binding", "stationery"],
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
    clicks: 890,
    views: 5400,
    offers: ["Color prints at ₹3/page for students"],
    nearCampus: true,
  },
  {
    id: "5",
    name: "Green Bowl Salads",
    category: "Cafe",
    description: "Fresh, healthy salad bowls and smoothies. Perfect for health-conscious students.",
    address: "22 Wellness Road, Sector 3",
    lat: 28.6165,
    lng: 77.205,
    rating: 4.5,
    reviewCount: 34,
    priceRange: "₹₹",
    avgCost: 200,
    isOpen: false,
    openHours: "10:00 AM - 7:00 PM",
    phone: "+91 98765 43214",
    tags: ["healthy", "salads", "smoothies", "vegan"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    clicks: 123,
    views: 780,
    offers: [],
    nearCampus: false,
  },
  {
    id: "6",
    name: "TechFix Hub",
    category: "Services",
    description: "Mobile and laptop repairs at student-friendly prices. Quick turnaround.",
    address: "9 Electronics Market, Block C",
    lat: 28.6128,
    lng: 77.213,
    rating: 4.7,
    reviewCount: 12,
    priceRange: "₹₹",
    avgCost: 300,
    studentDiscount: 15,
    isOpen: true,
    openHours: "10:00 AM - 8:00 PM",
    phone: "+91 98765 43215",
    tags: ["repairs", "mobile", "laptop", "tech"],
    image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&h=300&fit=crop",
    clicks: 45,
    views: 290,
    offers: ["Free screen protector with any repair"],
    nearCampus: true,
  },
  {
    id: "7",
    name: "Mama's Momos",
    category: "Street Food",
    description: "Best steamed and fried momos in town. A hidden street food legend.",
    address: "Street Cart, Near Bus Stop 4",
    lat: 28.6108,
    lng: 77.208,
    rating: 4.9,
    reviewCount: 8,
    priceRange: "₹",
    avgCost: 60,
    isOpen: true,
    openHours: "4:00 PM - 10:00 PM",
    phone: "+91 98765 43216",
    tags: ["momos", "street-food", "budget", "quick-bite"],
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop",
    clicks: 34,
    views: 180,
    offers: [],
    nearCampus: false,
  },
  {
    id: "8",
    name: "Studio 42 Cowork",
    category: "Workspace",
    description: "Affordable coworking space with fast WiFi, coffee, and a quiet vibe.",
    address: "42 Innovation Hub, Sector 7",
    lat: 28.6172,
    lng: 77.206,
    rating: 4.4,
    reviewCount: 67,
    priceRange: "₹₹",
    avgCost: 150,
    studentDiscount: 30,
    isOpen: true,
    openHours: "8:00 AM - 12:00 AM",
    phone: "+91 98765 43217",
    tags: ["coworking", "wifi", "study", "quiet"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    clicks: 345,
    views: 2100,
    offers: ["First day free for students"],
    nearCampus: true,
  },
];

export const categories = [
  "All",
  "Cafe",
  "Restaurant",
  "Street Food",
  "Bookstore",
  "Services",
  "Workspace",
];

export function calculateTrustScore(business: Business): number {
  let score = 0;
  
  // Base rating contribution (0-40)
  score += (business.rating / 5) * 40;
  
  // Review count contribution (0-30)
  const reviewScore = Math.min(business.reviewCount / 100, 1) * 30;
  score += reviewScore;
  
  // Low review count penalty
  if (business.reviewCount < 10) score -= 10;
  
  // Engagement ratio (clicks/views) contribution (0-15)
  if (business.views > 0) {
    const engagement = business.clicks / business.views;
    score += Math.min(engagement * 100, 15);
  }
  
  // Offers bonus (0-10)
  if (business.offers.length > 0) score += 5;
  if (business.studentDiscount) score += 5;
  
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function isHiddenGem(business: Business): boolean {
  return business.rating >= 4.5 && business.views < 500;
}

export function getRecommendations(
  allBusinesses: Business[],
  preferences: { maxBudget?: number; category?: string; minRating?: number; studentMode?: boolean }
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
    filtered = filtered.filter((b) => b.studentDiscount || b.nearCampus || b.avgCost <= 150);
  }

  // Sort by a composite score
  return filtered.sort((a, b) => {
    const scoreA = a.rating * 20 + (a.studentDiscount || 0) + (isHiddenGem(a) ? 20 : 0);
    const scoreB = b.rating * 20 + (b.studentDiscount || 0) + (isHiddenGem(b) ? 20 : 0);
    return scoreB - scoreA;
  });
}
