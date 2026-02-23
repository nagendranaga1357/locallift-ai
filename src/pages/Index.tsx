import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Sparkles,
  Shield,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Eye,
  Store,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { businesses, getPlatformStats } from "@/data/businesses";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    desc: "Find businesses by name, category, or location with intelligent filters.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: MapPin,
    title: "Interactive Map",
    desc: "Explore nearby businesses on an interactive color-coded OpenStreetMap.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Sparkles,
    title: "AI Recommendations",
    desc: "Get personalized suggestions and discover hidden gems near you.",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    icon: Shield,
    title: "Trust Scores",
    desc: "Make informed decisions with our transparent trust scoring system.",
    color: "bg-trust-high/10 text-trust-high",
  },
  {
    icon: GraduationCap,
    title: "Student Mode",
    desc: "Toggle student mode for budget-friendly picks and exclusive discounts.",
    color: "bg-student/10 text-student",
  },
  {
    icon: TrendingUp,
    title: "Trending Picks",
    desc: "Discover what's hot right now — high-engagement businesses flagged in real time.",
    color: "bg-orange-500/10 text-orange-600",
  },
];

const stats = getPlatformStats(businesses);

const statItems = [
  { icon: Store, value: `${stats.totalBusinesses}+`, label: "Local Businesses", color: "text-primary" },
  { icon: Eye, value: `${(stats.totalViews / 1000).toFixed(1)}K`, label: "Monthly Views", color: "text-blue-600" },
  { icon: BadgeCheck, value: `${stats.verifiedCount}`, label: "Verified Listings", color: "text-trust-high" },
  { icon: Sparkles, value: `${stats.hiddenGems}`, label: "Hidden Gems", color: "text-gem" },
];

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/65 to-foreground/25" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary-foreground"
            >
              <Sparkles className="h-4 w-4" /> AI-Powered Local Discovery
            </motion.span>
            <h1 className="mb-6 font-heading text-5xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
              Boost{" "}
              <span className="text-primary">Local</span>{" "}
              Business Visibility
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
              Small businesses deserve to be found. LocalLift AI connects students and
              locals with trusted, hidden, and budget-friendly shops nearby.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="gap-2 rounded-full px-8 text-base font-semibold">
                <Link to="/discover">
                  Explore Now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 rounded-full border-primary-foreground/30 bg-primary-foreground/10 px-8 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
              >
                <Link to="/map">
                  <MapPin className="h-4 w-4" /> View Map
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="border-b border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {statItems.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary`}>
                  <s.icon className={`h-6 w-6 ${s.color}`} />
                </div>
                <p className={`font-heading text-3xl font-bold ${s.color}`}>{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
              Why <span className="text-primary">LocalLift</span>?
            </h2>
            <p className="mx-auto max-w-lg text-muted-foreground">
              An AI-powered hyperlocal discovery platform that boosts visibility for
              small businesses while helping users find trusted, affordable options.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-elevated group rounded-xl border border-border bg-card p-6 transition-all"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it helps local businesses */}
      <section className="border-y border-border bg-secondary py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="mb-3 font-heading text-3xl font-bold text-foreground">
              Solving Real Problems for{" "}
              <span className="text-primary">Local Businesses</span>
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Small businesses lack digital visibility. LocalLift puts them on the map —
              literally and figuratively.
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                emoji: "📍",
                title: "Get Discovered",
                desc: "List your business and appear on the interactive map used by hundreds of local searchers every day.",
              },
              {
                emoji: "📊",
                title: "Track Visibility",
                desc: "See your views, clicks, and engagement rate in the business dashboard — no guesswork.",
              },
              {
                emoji: "🎓",
                title: "Reach Students",
                desc: "Offer student discounts and get highlighted in Student Mode — a powerful word-of-mouth channel.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-elevated rounded-xl border border-border bg-card p-6 text-center"
              >
                <div className="mb-4 text-4xl">{card.emoji}</div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-card-foreground">{card.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 font-heading text-3xl font-bold text-foreground">
              Ready to discover your neighbourhood?
            </h2>
            <p className="mx-auto mb-8 max-w-md text-muted-foreground">
              Join students and locals finding amazing businesses around them — or list
              yours today for free.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gap-2 rounded-full px-8">
                <Link to="/discover">
                  Start Exploring <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 rounded-full px-8">
                <Link to="/admin">
                  <Store className="h-4 w-4" /> List Your Business
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
