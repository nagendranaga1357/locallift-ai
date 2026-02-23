import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Store,
    Eye,
    MousePointerClick,
    Star,
    BadgeCheck,
    Pencil,
    Trash2,
    MapPin,
    Phone,
    Clock,
    Tag,
    ChevronDown,
    ChevronUp,
    ShoppingBag,
    TrendingUp,
    Sparkles,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useBusinesses } from "@/context/BusinessContext";
import { useAuth } from "@/context/AuthContext";
import { categories, Business } from "@/data/businesses";
import TrustBadge from "@/components/TrustBadge";

// ─── constants ───────────────────────────────────────────────────────────────

const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop";

const PRICE_RANGES: Array<"₹" | "₹₹" | "₹₹₹"> = ["₹", "₹₹", "₹₹₹"];

interface FormState {
    name: string;
    category: string;
    description: string;
    address: string;
    lat: string;
    lng: string;
    priceRange: "₹" | "₹₹" | "₹₹₹";
    avgCost: string;
    studentDiscount: string;
    isOpen: boolean;
    openHours: string;
    phone: string;
    tags: string;
    image: string;
    offers: string;
    nearCampus: boolean;
    established: string;
}

const emptyForm: FormState = {
    name: "",
    category: "Restaurant",
    description: "",
    address: "",
    lat: "16.578",
    lng: "82.006",
    priceRange: "₹₹",
    avgCost: "",
    studentDiscount: "",
    isOpen: true,
    openHours: "9:00 AM - 9:00 PM",
    phone: "",
    tags: "",
    image: "",
    offers: "",
    nearCampus: false,
    established: String(new Date().getFullYear()),
};

// ─── helper ──────────────────────────────────────────────────────────────────

function StatCard({
    icon: Icon,
    label,
    value,
    color,
}: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    color: string;
}) {
    return (
        <motion.div
            whileHover={{ y: -2, scale: 1.01 }}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
        >
            <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}
            >
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className="text-xs font-medium text-muted-foreground">{label}</p>
                <p className="font-heading text-2xl font-bold text-foreground">
                    {value}
                </p>
            </div>
        </motion.div>
    );
}

// ─── main page ───────────────────────────────────────────────────────────────

const BusinessOwnerDashboard = () => {
    const { user } = useAuth();
    const {
        addBusiness,
        updateBusiness,
        deleteBusiness,
        getMyBusinesses,
        calculateTrustScore,
    } = useBusinesses();

    const myBusinesses = user ? getMyBusinesses(user.id) : [];

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingBiz, setEditingBiz] = useState<Business | null>(null);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    // ── dialog helpers ─────────────────────────────────────────────────────────

    const openNew = () => {
        setEditingBiz(null);
        setForm(emptyForm);
        setDialogOpen(true);
    };

    const openEdit = (biz: Business) => {
        setEditingBiz(biz);
        setForm({
            name: biz.name,
            category: biz.category,
            description: biz.description,
            address: biz.address,
            lat: String(biz.lat),
            lng: String(biz.lng),
            priceRange: biz.priceRange,
            avgCost: String(biz.avgCost),
            studentDiscount: biz.studentDiscount ? String(biz.studentDiscount) : "",
            isOpen: biz.isOpen,
            openHours: biz.openHours,
            phone: biz.phone,
            tags: biz.tags.join(", "),
            image: biz.image || "",
            offers: biz.offers.join(", "),
            nearCampus: biz.nearCampus,
            established: biz.established ? String(biz.established) : "",
        });
        setDialogOpen(true);
    };

    const handleSave = () => {
        if (!form.name.trim()) return;
        setSaving(true);

        const payload = {
            name: form.name.trim(),
            category: form.category,
            description:
                form.description.trim() ||
                `A great local business in Amalapuram.`,
            address: form.address.trim() || "Amalapuram, AP 533201",
            lat: parseFloat(form.lat) || 16.578 + (Math.random() - 0.5) * 0.012,
            lng: parseFloat(form.lng) || 82.006 + (Math.random() - 0.5) * 0.012,
            priceRange: form.priceRange,
            avgCost: Number(form.avgCost) || 200,
            studentDiscount: form.studentDiscount
                ? Number(form.studentDiscount)
                : undefined,
            isOpen: form.isOpen,
            openHours: form.openHours,
            phone: form.phone.trim(),
            tags: form.tags
                ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
                : [form.category.toLowerCase()],
            image: form.image.trim() || DEFAULT_IMAGE,
            offers: form.offers
                ? form.offers.split(",").map((o) => o.trim()).filter(Boolean)
                : [],
            nearCampus: form.nearCampus,
            established: form.established ? Number(form.established) : new Date().getFullYear(),
        };

        setTimeout(() => {
            if (editingBiz) {
                updateBusiness(editingBiz.id, payload);
            } else {
                addBusiness(payload, user?.id);
            }
            setSaving(false);
            setDialogOpen(false);
        }, 400);
    };

    const handleDelete = (id: string) => {
        if (confirm("Remove this business listing?")) deleteBusiness(id);
    };

    // ── aggregate stats ────────────────────────────────────────────────────────

    const totalViews = myBusinesses.reduce((s, b) => s + b.views, 0);
    const totalClicks = myBusinesses.reduce((s, b) => s + b.clicks, 0);
    const avgRating =
        myBusinesses.length > 0
            ? (
                myBusinesses.reduce((s, b) => s + b.rating, 0) / myBusinesses.length
            ).toFixed(1)
            : "—";
    const avgEngagement =
        totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) + "%" : "0%";

    // ── render ────────────────────────────────────────────────────────────────

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
            <div className="container mx-auto max-w-6xl px-4 py-10">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 flex flex-wrap items-start justify-between gap-4"
                >
                    <div>
                        <div className="mb-1 flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md">
                                <Store className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <h1 className="font-heading text-3xl font-bold text-foreground">
                                My Business
                            </h1>
                            <span className="ml-1 flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                <Sparkles className="h-3 w-3" /> Owner
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Welcome back,{" "}
                            <span className="font-medium text-foreground">{user?.name}</span>
                            . Manage your listings and track how customers find you.
                        </p>
                    </div>

                    <Button
                        id="add-business-btn"
                        className="gap-2 rounded-full px-5 shadow-md hover:shadow-primary/20"
                        onClick={openNew}
                    >
                        <Plus className="h-4 w-4" />
                        Add My Business
                    </Button>
                </motion.div>

                {/* ── Stats grid ── */}
                {myBusinesses.length > 0 && (
                    <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: Store,
                                label: "My Listings",
                                value: myBusinesses.length,
                                color: "bg-primary/10 text-primary",
                            },
                            {
                                icon: Eye,
                                label: "Total Views",
                                value: totalViews.toLocaleString(),
                                color: "bg-blue-500/10 text-blue-600",
                            },
                            {
                                icon: MousePointerClick,
                                label: "Total Clicks",
                                value: totalClicks.toLocaleString(),
                                color: "bg-orange-500/10 text-orange-600",
                            },
                            {
                                icon: TrendingUp,
                                label: "Avg Engagement",
                                value: avgEngagement,
                                color: "bg-trust-high/10 text-trust-high",
                            },
                        ].map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.07 }}
                            >
                                <StatCard {...s} />
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* ── Empty state ── */}
                {myBusinesses.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-6 rounded-3xl border-2 border-dashed border-border bg-card px-8 py-20 text-center"
                    >
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                            <ShoppingBag className="h-10 w-10 text-primary" />
                        </div>
                        <div>
                            <h2 className="mb-2 font-heading text-xl font-bold text-foreground">
                                List your business on LocalLift
                            </h2>
                            <p className="max-w-sm text-sm text-muted-foreground">
                                Reach thousands of local customers in Amalapuram. Add your
                                business details, opening hours, offers, and more — for free.
                            </p>
                        </div>
                        <Button
                            className="gap-2 rounded-full px-6 shadow-md"
                            onClick={openNew}
                        >
                            <Plus className="h-4 w-4" /> Add My First Business
                        </Button>
                    </motion.div>
                )}

                {/* ── Business cards ── */}
                <div className="space-y-4">
                    <AnimatePresence>
                        {myBusinesses.map((biz, i) => {
                            const isExpanded = expandedId === biz.id;
                            const trust = calculateTrustScore(biz);

                            return (
                                <motion.div
                                    key={biz.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                                >
                                    {/* card top row */}
                                    <div className="flex flex-wrap items-center gap-4 p-5">
                                        <img
                                            src={biz.image}
                                            alt={biz.name}
                                            className="h-16 w-16 shrink-0 rounded-xl object-cover"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="font-heading text-lg font-bold text-foreground">
                                                    {biz.name}
                                                </h2>
                                                {biz.verified && (
                                                    <BadgeCheck className="h-4 w-4 text-trust-high" />
                                                )}
                                                <Badge
                                                    variant="secondary"
                                                    className="text-[11px]"
                                                >
                                                    {biz.category}
                                                </Badge>
                                            </div>
                                            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                                                <MapPin className="h-3 w-3 shrink-0" />
                                                {biz.address}
                                            </p>
                                            <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Eye className="h-3 w-3" /> {biz.views.toLocaleString()} views
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MousePointerClick className="h-3 w-3" /> {biz.clicks.toLocaleString()} clicks
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Star className="h-3 w-3 text-yellow-500" /> {biz.rating}
                                                </span>
                                                <TrustBadge score={trust} size="sm" />
                                            </div>
                                        </div>

                                        {/* action buttons */}
                                        <div className="flex shrink-0 gap-2">
                                            <Button
                                                id={`edit-biz-${biz.id}`}
                                                variant="outline"
                                                size="sm"
                                                className="gap-1.5 rounded-full"
                                                onClick={() => openEdit(biz)}
                                            >
                                                <Pencil className="h-3.5 w-3.5" /> Edit
                                            </Button>
                                            <Button
                                                id={`delete-biz-${biz.id}`}
                                                variant="ghost"
                                                size="sm"
                                                className="gap-1.5 rounded-full text-destructive hover:bg-destructive/10"
                                                onClick={() => handleDelete(biz.id)}
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="gap-1 rounded-full px-2"
                                                onClick={() =>
                                                    setExpandedId(isExpanded ? null : biz.id)
                                                }
                                            >
                                                {isExpanded ? (
                                                    <ChevronUp className="h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* expanded details */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden border-t border-border"
                                            >
                                                <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
                                                    <div className="space-y-1">
                                                        <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                            <Clock className="h-3 w-3" /> Hours
                                                        </p>
                                                        <p className="text-sm text-foreground">
                                                            {biz.openHours}
                                                        </p>
                                                        <span
                                                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${biz.isOpen
                                                                    ? "bg-trust-high/10 text-trust-high"
                                                                    : "bg-destructive/10 text-destructive"
                                                                }`}
                                                        >
                                                            {biz.isOpen ? "Open Now" : "Closed"}
                                                        </span>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                            <Phone className="h-3 w-3" /> Contact
                                                        </p>
                                                        <p className="text-sm text-foreground">{biz.phone || "—"}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                            Price Range
                                                        </p>
                                                        <p className="text-sm text-foreground">
                                                            {biz.priceRange} · Avg ₹{biz.avgCost}
                                                        </p>
                                                        {biz.studentDiscount && (
                                                            <Badge className="bg-student/10 text-student border-student/30">
                                                                {biz.studentDiscount}% student discount
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    {biz.offers.length > 0 && (
                                                        <div className="space-y-1 sm:col-span-2 lg:col-span-2">
                                                            <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                                <Tag className="h-3 w-3" /> Offers
                                                            </p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {biz.offers.map((o) => (
                                                                    <span
                                                                        key={o}
                                                                        className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-0.5 text-xs text-primary"
                                                                    >
                                                                        {o}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {biz.tags.length > 0 && (
                                                        <div className="space-y-1 sm:col-span-2 lg:col-span-3">
                                                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                                Tags
                                                            </p>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {biz.tags.map((t) => (
                                                                    <Badge
                                                                        key={t}
                                                                        variant="secondary"
                                                                        className="text-[11px]"
                                                                    >
                                                                        #{t}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {biz.description && (
                                                        <div className="sm:col-span-2 lg:col-span-3">
                                                            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                                About
                                                            </p>
                                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                                {biz.description}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* ── Add / Edit Dialog ── */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 font-heading text-xl">
                            <Store className="h-5 w-5 text-primary" />
                            {editingBiz ? "Edit Business Listing" : "Add My Business"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-5 pt-1">

                        {/* Section: Basic Info */}
                        <fieldset className="space-y-4 rounded-xl border border-border p-4">
                            <legend className="px-1 text-sm font-semibold text-foreground">
                                Basic Information
                            </legend>
                            <div>
                                <Label htmlFor="biz-name">Business Name *</Label>
                                <Input
                                    id="biz-name"
                                    placeholder="e.g. Sri Ganapathi Sweets & Bakery"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="mt-1 h-10"
                                />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <Label htmlFor="biz-category">Category</Label>
                                    <Select
                                        value={form.category}
                                        onValueChange={(v) => setForm({ ...form, category: v })}
                                    >
                                        <SelectTrigger id="biz-category" className="mt-1 h-10">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories
                                                .filter((c) => c !== "All")
                                                .map((cat) => (
                                                    <SelectItem key={cat} value={cat}>
                                                        {cat}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="biz-established">Established Year</Label>
                                    <Input
                                        id="biz-established"
                                        type="number"
                                        placeholder="e.g. 1998"
                                        value={form.established}
                                        onChange={(e) =>
                                            setForm({ ...form, established: e.target.value })
                                        }
                                        className="mt-1 h-10"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="biz-description">Description</Label>
                                <Textarea
                                    id="biz-description"
                                    placeholder="Tell customers what makes your business special…"
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({ ...form, description: e.target.value })
                                    }
                                    className="mt-1 min-h-[80px] resize-none"
                                />
                            </div>
                        </fieldset>

                        {/* Section: Location & Contact */}
                        <fieldset className="space-y-4 rounded-xl border border-border p-4">
                            <legend className="px-1 text-sm font-semibold text-foreground">
                                Location & Contact
                            </legend>
                            <div>
                                <Label htmlFor="biz-address">Address</Label>
                                <Input
                                    id="biz-address"
                                    placeholder="e.g. Chikkala Vari Street, Amalapuram, AP 533201"
                                    value={form.address}
                                    onChange={(e) =>
                                        setForm({ ...form, address: e.target.value })
                                    }
                                    className="mt-1 h-10"
                                />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div>
                                    <Label htmlFor="biz-lat">Latitude</Label>
                                    <Input
                                        id="biz-lat"
                                        type="number"
                                        step="0.0001"
                                        placeholder="16.577"
                                        value={form.lat}
                                        onChange={(e) => setForm({ ...form, lat: e.target.value })}
                                        className="mt-1 h-10"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="biz-lng">Longitude</Label>
                                    <Input
                                        id="biz-lng"
                                        type="number"
                                        step="0.0001"
                                        placeholder="82.007"
                                        value={form.lng}
                                        onChange={(e) => setForm({ ...form, lng: e.target.value })}
                                        className="mt-1 h-10"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="biz-phone">Phone</Label>
                                    <Input
                                        id="biz-phone"
                                        placeholder="+91 88866 XXXXX"
                                        value={form.phone}
                                        onChange={(e) =>
                                            setForm({ ...form, phone: e.target.value })
                                        }
                                        className="mt-1 h-10"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    id="biz-near-campus"
                                    type="checkbox"
                                    checked={form.nearCampus}
                                    onChange={(e) =>
                                        setForm({ ...form, nearCampus: e.target.checked })
                                    }
                                    className="h-4 w-4 accent-primary"
                                />
                                <Label htmlFor="biz-near-campus" className="cursor-pointer">
                                    Near college campus
                                </Label>
                            </div>
                        </fieldset>

                        {/* Section: Pricing & Hours */}
                        <fieldset className="space-y-4 rounded-xl border border-border p-4">
                            <legend className="px-1 text-sm font-semibold text-foreground">
                                Pricing & Hours
                            </legend>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div>
                                    <Label htmlFor="biz-price-range">Price Range</Label>
                                    <Select
                                        value={form.priceRange}
                                        onValueChange={(v) =>
                                            setForm({ ...form, priceRange: v as "₹" | "₹₹" | "₹₹₹" })
                                        }
                                    >
                                        <SelectTrigger id="biz-price-range" className="mt-1 h-10">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {PRICE_RANGES.map((p) => (
                                                <SelectItem key={p} value={p}>
                                                    {p}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="biz-avg-cost">Avg Cost (₹)</Label>
                                    <Input
                                        id="biz-avg-cost"
                                        type="number"
                                        placeholder="e.g. 100"
                                        value={form.avgCost}
                                        onChange={(e) =>
                                            setForm({ ...form, avgCost: e.target.value })
                                        }
                                        className="mt-1 h-10"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="biz-student-discount">
                                        Student Discount (%)
                                    </Label>
                                    <Input
                                        id="biz-student-discount"
                                        type="number"
                                        placeholder="e.g. 10"
                                        value={form.studentDiscount}
                                        onChange={(e) =>
                                            setForm({ ...form, studentDiscount: e.target.value })
                                        }
                                        className="mt-1 h-10"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <Label htmlFor="biz-open-hours">Open Hours</Label>
                                    <Input
                                        id="biz-open-hours"
                                        placeholder="e.g. 8:00 AM - 9:00 PM"
                                        value={form.openHours}
                                        onChange={(e) =>
                                            setForm({ ...form, openHours: e.target.value })
                                        }
                                        className="mt-1 h-10"
                                    />
                                </div>
                                <div className="flex items-end gap-3 pb-0.5">
                                    <input
                                        id="biz-is-open"
                                        type="checkbox"
                                        checked={form.isOpen}
                                        onChange={(e) =>
                                            setForm({ ...form, isOpen: e.target.checked })
                                        }
                                        className="h-4 w-4 accent-primary"
                                    />
                                    <Label htmlFor="biz-is-open" className="cursor-pointer">
                                        Currently open for business
                                    </Label>
                                </div>
                            </div>
                        </fieldset>

                        {/* Section: Offers, Tags & Image */}
                        <fieldset className="space-y-4 rounded-xl border border-border p-4">
                            <legend className="px-1 text-sm font-semibold text-foreground">
                                Offers, Tags & Media
                            </legend>
                            <div>
                                <Label htmlFor="biz-offers">
                                    Offers{" "}
                                    <span className="text-muted-foreground">(comma-separated)</span>
                                </Label>
                                <Input
                                    id="biz-offers"
                                    placeholder='e.g. 500g Putharekulu gift box ₹149, Free delivery above ₹300'
                                    value={form.offers}
                                    onChange={(e) =>
                                        setForm({ ...form, offers: e.target.value })
                                    }
                                    className="mt-1 h-10"
                                />
                            </div>
                            <div>
                                <Label htmlFor="biz-tags">
                                    Tags{" "}
                                    <span className="text-muted-foreground">(comma-separated)</span>
                                </Label>
                                <Input
                                    id="biz-tags"
                                    placeholder='e.g. putharekulu, sweets, bakery, gifts'
                                    value={form.tags}
                                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                                    className="mt-1 h-10"
                                />
                            </div>
                            <div>
                                <Label htmlFor="biz-image">Image URL</Label>
                                <Input
                                    id="biz-image"
                                    placeholder="https://images.unsplash.com/..."
                                    value={form.image}
                                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                                    className="mt-1 h-10"
                                />
                                {form.image && (
                                    <div className="mt-2 flex items-center gap-2">
                                        <img
                                            src={form.image}
                                            alt="preview"
                                            className="h-16 w-24 rounded-lg object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setForm({ ...form, image: "" })}
                                            className="text-muted-foreground hover:text-destructive"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </fieldset>

                        {/* Actions */}
                        <div className="flex gap-3 pt-1">
                            <Button
                                id="save-business-btn"
                                className="flex-1 gap-2 rounded-xl"
                                onClick={handleSave}
                                disabled={saving || !form.name.trim()}
                            >
                                {saving ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                        Saving…
                                    </>
                                ) : editingBiz ? (
                                    "Save Changes"
                                ) : (
                                    <>
                                        <Plus className="h-4 w-4" /> Publish Listing
                                    </>
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                className="rounded-xl"
                                onClick={() => setDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BusinessOwnerDashboard;
