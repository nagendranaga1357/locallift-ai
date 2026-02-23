import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Sparkles, Gem } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BusinessCard from "@/components/BusinessCard";
import BusinessDetailSheet from "@/components/BusinessDetailSheet";
import {
  businesses,
  categories,
  getRecommendations,
  isHiddenGem,
  Business,
} from "@/data/businesses";

interface DiscoverProps {
  studentMode: boolean;
}

const filterOptions = [
  { label: "Under ₹200", key: "budget" },
  { label: "Student Discount", key: "studentDiscount" },
  { label: "Top Rated", key: "topRated" },
  { label: "Open Now", key: "openNow" },
];

const Discover = ({ studentMode }: DiscoverProps) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  const toggleFilter = (key: string) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  const filteredBusinesses = useMemo(() => {
    let result = [...businesses];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.address.toLowerCase().includes(q) ||
          b.tags.some((t) => t.includes(q))
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((b) => b.category === selectedCategory);
    }

    if (activeFilters.includes("budget")) {
      result = result.filter((b) => b.avgCost <= 200);
    }
    if (activeFilters.includes("studentDiscount")) {
      result = result.filter((b) => b.studentDiscount);
    }
    if (activeFilters.includes("topRated")) {
      result = result.filter((b) => b.rating >= 4.5);
    }
    if (activeFilters.includes("openNow")) {
      result = result.filter((b) => b.isOpen);
    }

    if (studentMode) {
      result.sort((a, b) => {
        const scoreA = (a.studentDiscount || 0) + (a.nearCampus ? 10 : 0) + (a.avgCost <= 150 ? 5 : 0);
        const scoreB = (b.studentDiscount || 0) + (b.nearCampus ? 10 : 0) + (b.avgCost <= 150 ? 5 : 0);
        return scoreB - scoreA;
      });
    }

    return result;
  }, [search, selectedCategory, activeFilters, studentMode]);

  const recommendations = useMemo(
    () =>
      getRecommendations(businesses, {
        maxBudget: studentMode ? 200 : undefined,
        minRating: 4.3,
        studentMode,
      }).slice(0, 4),
    [studentMode]
  );

  const hiddenGems = useMemo(
    () => businesses.filter(isHiddenGem),
    []
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search & Filters */}
      <div className="mb-8">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search businesses, categories, or locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 rounded-xl pl-11 text-base"
          />
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <SlidersHorizontal className="h-4 w-4 self-center text-muted-foreground" />
          {filterOptions.map((f) => (
            <Button
              key={f.key}
              variant={activeFilters.includes(f.key) ? "default" : "secondary"}
              size="sm"
              className="rounded-full text-xs"
              onClick={() => toggleFilter(f.key)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      {!search && selectedCategory === "All" && activeFilters.length === 0 && (
        <>
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-10"
          >
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="font-heading text-xl font-bold text-foreground">
                Recommended for You
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {recommendations.map((biz) => (
                <BusinessCard
                  key={biz.id}
                  business={biz}
                  studentMode={studentMode}
                  onClick={() => setSelectedBusiness(biz)}
                />
              ))}
            </div>
          </motion.section>

          {hiddenGems.length > 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-10"
            >
              <div className="mb-4 flex items-center gap-2">
                <Gem className="h-5 w-5 text-gem" />
                <h2 className="font-heading text-xl font-bold text-foreground">
                  Hidden Gems
                </h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {hiddenGems.map((biz) => (
                  <BusinessCard
                    key={biz.id}
                    business={biz}
                    studentMode={studentMode}
                    onClick={() => setSelectedBusiness(biz)}
                  />
                ))}
              </div>
            </motion.section>
          )}
        </>
      )}

      {/* All Results */}
      <section>
        <h2 className="mb-4 font-heading text-xl font-bold text-foreground">
          {search || selectedCategory !== "All" || activeFilters.length > 0
            ? `Results (${filteredBusinesses.length})`
            : "All Businesses"}
        </h2>
        {filteredBusinesses.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 text-center">
            <Search className="mb-4 h-12 w-12 text-muted-foreground/40" />
            <p className="text-lg font-medium text-muted-foreground">No businesses found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBusinesses.map((biz) => (
              <BusinessCard
                key={biz.id}
                business={biz}
                studentMode={studentMode}
                onClick={() => setSelectedBusiness(biz)}
              />
            ))}
          </div>
        )}
      </section>

      <BusinessDetailSheet
        business={selectedBusiness}
        open={!!selectedBusiness}
        onClose={() => setSelectedBusiness(null)}
        studentMode={studentMode}
      />
    </div>
  );
};

export default Discover;
