import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Sparkles, Shield, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    desc: "Find businesses by name, category, or location with intelligent filters.",
  },
  {
    icon: MapPin,
    title: "Interactive Map",
    desc: "Explore nearby businesses on an interactive OpenStreetMap-powered map.",
  },
  {
    icon: Sparkles,
    title: "AI Recommendations",
    desc: "Get personalized suggestions and discover hidden gems near you.",
  },
  {
    icon: Shield,
    title: "Trust Scores",
    desc: "Make informed decisions with our transparent trust scoring system.",
  },
  {
    icon: GraduationCap,
    title: "Student Mode",
    desc: "Toggle student mode for budget-friendly picks and exclusive discounts.",
  },
];

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-foreground">
              <Sparkles className="h-4 w-4" /> AI-Powered Discovery
            </span>
            <h1 className="mb-6 font-heading text-5xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
              Support{" "}
              <span className="text-primary">Local</span>{" "}
              Businesses
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
              Discover hidden gems, trusted shops, and student-friendly spots in your
              neighborhood. Powered by smart recommendations.
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
                className="card-elevated rounded-xl border border-border bg-card p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
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

      {/* CTA */}
      <section className="border-t border-border bg-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground">
            Ready to discover your neighbourhood?
          </h2>
          <p className="mx-auto mb-8 max-w-md text-muted-foreground">
            Join thousands of students and locals finding amazing businesses around them.
          </p>
          <Button asChild size="lg" className="gap-2 rounded-full px-8">
            <Link to="/discover">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
