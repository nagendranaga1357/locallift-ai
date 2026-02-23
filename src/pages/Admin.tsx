import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  MousePointerClick,
  Store,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { businesses as seedData, Business, calculateTrustScore, categories } from "@/data/businesses";
import TrustBadge from "@/components/TrustBadge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const STORAGE_KEY = "locallift-admin-businesses";

const CATEGORY_COLORS = [
  "#f97316", "#ef4444", "#eab308", "#8b5cf6",
  "#3b82f6", "#06b6d4", "#22c55e", "#6b7280",
];

const Admin = () => {
  const [bizList, setBizList] = useState<Business[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [...seedData];
    } catch {
      return [...seedData];
    }
  });

  const [editingBiz, setEditingBiz] = useState<Business | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "Cafe",
    description: "",
    address: "",
    phone: "",
    avgCost: "",
    offers: "",
    studentDiscount: "",
  });

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bizList));
  }, [bizList]);

  const totalViews = bizList.reduce((s, b) => s + b.views, 0);
  const totalClicks = bizList.reduce((s, b) => s + b.clicks, 0);
  const avgEngagement =
    totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0";
  const verifiedCount = bizList.filter((b) => b.verified).length;

  const openNew = () => {
    setEditingBiz(null);
    setForm({
      name: "",
      category: "Cafe",
      description: "",
      address: "",
      phone: "",
      avgCost: "",
      offers: "",
      studentDiscount: "",
    });
    setDialogOpen(true);
  };

  const openEdit = (biz: Business) => {
    setEditingBiz(biz);
    setForm({
      name: biz.name,
      category: biz.category,
      description: biz.description,
      address: biz.address,
      phone: biz.phone,
      avgCost: String(biz.avgCost),
      offers: biz.offers.join(", "),
      studentDiscount: biz.studentDiscount ? String(biz.studentDiscount) : "",
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name) return;
    if (editingBiz) {
      setBizList((prev) =>
        prev.map((b) =>
          b.id === editingBiz.id
            ? {
              ...b,
              name: form.name,
              category: form.category,
              description: form.description,
              address: form.address,
              phone: form.phone,
              avgCost: Number(form.avgCost) || b.avgCost,
              offers: form.offers ? form.offers.split(",").map((s) => s.trim()) : [],
              studentDiscount: form.studentDiscount ? Number(form.studentDiscount) : undefined,
            }
            : b
        )
      );
    } else {
      const newBiz: Business = {
        id: String(Date.now()),
        name: form.name,
        category: form.category || "Other",
        description: form.description,
        address: form.address,
        lat: 16.578 + (Math.random() - 0.5) * 0.012,
        lng: 82.006 + (Math.random() - 0.5) * 0.012,
        rating: 4.0,
        reviewCount: 0,
        priceRange: "₹₹",
        avgCost: Number(form.avgCost) || 200,
        isOpen: true,
        openHours: "9:00 AM - 9:00 PM",
        phone: form.phone,
        tags: [],
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
        clicks: 0,
        views: 0,
        offers: form.offers ? form.offers.split(",").map((s) => s.trim()) : [],
        nearCampus: false,
        studentDiscount: form.studentDiscount ? Number(form.studentDiscount) : undefined,
        established: new Date().getFullYear(),
      };
      setBizList((prev) => [...prev, newBiz]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setBizList((prev) => prev.filter((b) => b.id !== id));
  };

  // Chart data
  const engagementChartData = bizList
    .sort((a, b) => b.views - a.views)
    .slice(0, 8)
    .map((b) => ({
      name: b.name.split(" ")[0],
      Views: b.views,
      Clicks: b.clicks,
    }));

  const categoryData = categories
    .filter((c) => c !== "All")
    .map((cat) => ({
      name: cat,
      value: bizList.filter((b) => b.category === cat).length,
    }))
    .filter((d) => d.value > 0);

  const trustChartData = bizList.map((b) => ({
    name: b.name.split(" ")[0],
    Trust: calculateTrustScore(b),
  })).sort((a, b) => b.Trust - a.Trust).slice(0, 10);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Business Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Manage listings, track visibility, and grow your reach
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-full" onClick={openNew}>
              <Plus className="h-4 w-4" /> Add Business
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading">
                {editingBiz ? "Edit Business" : "Add New Business"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>Business Name *</Label>
                <Input
                  placeholder="e.g. Chai Corner"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm({ ...form, category: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter((c) => c !== "All").map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="What makes this business special?"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  placeholder="e.g. 12 College Road, Near Main Gate"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Phone</Label>
                  <Input
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Avg Cost (₹)</Label>
                  <Input
                    type="number"
                    placeholder="150"
                    value={form.avgCost}
                    onChange={(e) => setForm({ ...form, avgCost: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Student Discount (%)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 10 (leave empty for none)"
                  value={form.studentDiscount}
                  onChange={(e) => setForm({ ...form, studentDiscount: e.target.value })}
                />
              </div>
              <div>
                <Label>Offers (comma separated)</Label>
                <Input
                  placeholder="e.g. 10% off combo, Free dessert on Friday"
                  value={form.offers}
                  onChange={(e) => setForm({ ...form, offers: e.target.value })}
                />
              </div>
              <Button className="w-full" onClick={handleSave}>
                {editingBiz ? "Save Changes" : "Add Business"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats row */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Store, label: "Total Businesses", value: bizList.length, color: "text-primary" },
          { icon: Eye, label: "Total Views", value: totalViews.toLocaleString(), color: "text-blue-600" },
          { icon: MousePointerClick, label: "Total Clicks", value: totalClicks.toLocaleString(), color: "text-orange-500" },
          { icon: TrendingUp, label: "Avg Engagement", value: `${avgEngagement}%`, color: "text-trust-high" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="card-elevated flex items-center gap-4 rounded-xl border border-border bg-card p-5"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className={`font-heading text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="listings" className="mb-8">
        <TabsList className="mb-6 rounded-xl">
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="trust">Trust Scores</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
        </TabsList>

        {/* Table */}
        <TabsContent value="listings">
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-4 py-3 text-left font-heading font-semibold text-foreground">Business</th>
                  <th className="hidden px-4 py-3 text-left font-heading font-semibold text-foreground sm:table-cell">Category</th>
                  <th className="hidden px-4 py-3 text-left font-heading font-semibold text-foreground md:table-cell">Trust</th>
                  <th className="hidden px-4 py-3 text-left font-heading font-semibold text-foreground lg:table-cell">Discount</th>
                  <th className="px-4 py-3 text-right font-heading font-semibold text-foreground">Views</th>
                  <th className="px-4 py-3 text-right font-heading font-semibold text-foreground">Clicks</th>
                  <th className="px-4 py-3 text-right font-heading font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bizList.map((biz, i) => (
                  <motion.tr
                    key={biz.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-border last:border-0 hover:bg-secondary/30"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={biz.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-medium text-card-foreground">{biz.name}</p>
                            {biz.verified && (
                              <BadgeCheck className="h-3.5 w-3.5 text-trust-high" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground sm:hidden">{biz.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{biz.category}</td>
                    <td className="hidden px-4 py-3 md:table-cell">
                      <TrustBadge score={calculateTrustScore(biz)} size="sm" />
                    </td>
                    <td className="hidden px-4 py-3 lg:table-cell">
                      {biz.studentDiscount ? (
                        <Badge className="bg-student/10 text-student border-student/30">
                          {biz.studentDiscount}% off
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{biz.views.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{biz.clicks.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(biz)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDelete(biz.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Engagement Chart */}
        <TabsContent value="engagement">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-6 font-heading text-lg font-semibold text-foreground">
              Views vs Clicks — Top Businesses
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={engagementChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--card-foreground))",
                  }}
                />
                <Legend />
                <Bar dataKey="Views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Clicks" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        {/* Trust Chart */}
        <TabsContent value="trust">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-6 font-heading text-lg font-semibold text-foreground">
              Trust Score Leaderboard
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                layout="vertical"
                data={trustChartData}
                margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--card-foreground))",
                  }}
                />
                <Bar
                  dataKey="Trust"
                  radius={[0, 4, 4, 0]}
                  fill="hsl(var(--primary))"
                >
                  {trustChartData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={
                        entry.Trust >= 70
                          ? "hsl(var(--trust-high))"
                          : entry.Trust >= 45
                            ? "hsl(var(--trust-medium))"
                            : "hsl(var(--trust-low))"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        {/* Pie chart — distribution */}
        <TabsContent value="distribution">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-6 font-heading text-lg font-semibold text-foreground">
              Business Categories Distribution
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--card-foreground))",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
