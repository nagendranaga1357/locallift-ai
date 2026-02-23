import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Sparkles, Gem, TrendingUp, GraduationCap, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BusinessCard from "@/components/BusinessCard";
import BusinessDetailSheet from "@/components/BusinessDetailSheet";
import {
  businesses,
  categories,
  getRecommendations,
  isHiddenGem,
  isTrending,
  Business,
} from "@/data/businesses";

interface DiscoverProps {
  studentMode: boolean;
}

const filterOptions = [
  { label: "Under ₹200", key: "budget", icon: "₹" },
  { label: "Student Discount", key: "studentDiscount", icon: "🎓" },
  { label: "Top Rated", key: "topRated", icon: "⭐" },
  { label: "Open Now", key: "openNow", icon: "🟢" },
  { label: "Near Campus", key: "nearCampus", icon: "📍" },
  { label: "Verified", key: "verified", icon: "✅" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

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

  const clearAll = () => {
    setSearch("");
    setSelectedCategory("All");
    setActiveFilters([]);
  };

  const isFiltering = search || selectedCategory !== "All" || activeFilters.length > 0;

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
    if (activeFilters.includes("nearCampus")) {
      result = result.filter((b) => b.nearCampus);
    }
    if (activeFilters.includes("verified")) {
      result = result.filter((b) => b.verified);
    }

    if (studentMode) {
      result.sort((a, b) => {
        const scoreA =
          (a.studentDiscount || 0) + (a.nearCampus ? 10 : 0) + (a.avgCost <= 150 ? 5 : 0);
        const scoreB =
          (b.studentDiscount || 0) + (b.nearCampus ? 10 : 0) + (b.avgCost <= 150 ? 5 : 0);
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

  const hiddenGems = useMemo(() => businesses.filter(isHiddenGem), []);
  const trendingBusinesses = useMemo(
    () => businesses.filter(isTrending).slice(0, 4),
    []
  );

  const showSections = !isFiltering;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search businesses, categories, or locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 rounded-xl pl-11 pr-10 text-base"
          />
          {search && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setSearch("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category pills */}
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

        {/* Quick filters */}
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 self-center text-muted-foreground" />
          {filterOptions.map((f) => (
            <Button
              key={f.key}
              variant={activeFilters.includes(f.key) ? "default" : "secondary"}
              size="sm"
              className="rounded-full text-xs"
              onClick={() => toggleFilter(f.key)}
            >
              {f.icon} {f.label}
            </Button>
          ))}
          {isFiltering && (
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-xs text-muted-foreground hover:text-destructive"
              onClick={clearAll}
            >
              <X className="mr-1 h-3 w-3" /> Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Student Mode Banner */}
      {studentMode && showSections && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3 rounded-xl border border-student/30 bg-student/5 px-5 py-3"
        >
          <GraduationCap className="h-5 w-5 text-student" />
          <div>
            <p className="text-sm font-semibold text-student">Student Mode Active</p>
            <p className="text-xs text-muted-foreground">
              Showing budget-friendly picks, student discounts, and near-campus businesses first.
            </p>
          </div>
          <Badge className="ml-auto bg-student text-white">
            {businesses.filter((b) => b.studentDiscount).length} with discounts
          </Badge>
        </motion.div>
      )}

      {/* Contextual sections (only when not filtering) */}
      <AnimatePresence>
        {showSections && (
          <>
            {/* AI Recommendations */}
            <motion.section
              key="recommendations"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-10"
            >
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="font-heading text-xl font-bold text-foreground">
                  Recommended for You
                </h2>
                <Badge variant="secondary" className="ml-auto">AI Picks</Badge>
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
              >
                {recommendations.map((biz) => (
                  <BusinessCard
                    key={biz.id}
                    business={biz}
                    studentMode={studentMode}
                    onClick={() => setSelectedBusiness(biz)}
                  />
                ))}
              </motion.div>
            </motion.section>

            {/* Trending */}
            {trendingBusinesses.length > 0 && (
              <motion.section
                key="trending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-10"
              >
                <div className="mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  <h2 className="font-heading text-xl font-bold text-foreground">
                    Trending Now
                  </h2>
                  <Badge className="ml-auto bg-orange-500 text-white">🔥 Hot</Badge>
                </div>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {trendingBusinesses.map((biz) => (
                    <BusinessCard
                      key={biz.id}
                      business={biz}
                      studentMode={studentMode}
                      onClick={() => setSelectedBusiness(biz)}
                    />
                  ))}
                </motion.div>
              </motion.section>
            )}

            {/* Hidden Gems */}
            {hiddenGems.length > 0 && (
              <motion.section
                key="gems"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-10"
              >
                <div className="mb-4 flex items-center gap-2">
                  <Gem className="h-5 w-5 text-gem" />
                  <h2 className="font-heading text-xl font-bold text-foreground">
                    Hidden Gems
                  </h2>
                  <Badge className="ml-auto border-gem/30 bg-gem/10 text-gem">
                    Undiscovered
                  </Badge>
                </div>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {hiddenGems.map((biz) => (
                    <BusinessCard
                      key={biz.id}
                      business={biz}
                      studentMode={studentMode}
                      onClick={() => setSelectedBusiness(biz)}
                    />
                  ))}
                </motion.div>
              </motion.section>
            )}
          </>
        )}
      </AnimatePresence>

      {/* All / Filtered Results */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <h2 className="font-heading text-xl font-bold text-foreground">
            {isFiltering
              ? `Results (${filteredBusinesses.length})`
              : "All Businesses"}
          </h2>
          {!isFiltering && (
            <Badge variant="outline">{businesses.length} listed</Badge>
          )}
        </div>
        {filteredBusinesses.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 text-center">
            <Search className="mb-4 h-12 w-12 text-muted-foreground/40" />
            <p className="text-lg font-medium text-muted-foreground">No businesses found</p>
            <p className="mb-4 text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
            <Button variant="outline" size="sm" onClick={clearAll}>
              Clear filters
            </Button>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredBusinesses.map((biz) => (
              <BusinessCard
                key={biz.id}
                business={biz}
                studentMode={studentMode}
                onClick={() => setSelectedBusiness(biz)}
              />
            ))}
          </motion.div>
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
