import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, MousePointerClick, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { businesses as seedData, Business, calculateTrustScore } from "@/data/businesses";
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

const Admin = () => {
  const [bizList, setBizList] = useState<Business[]>([...seedData]);
  const [editingBiz, setEditingBiz] = useState<Business | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    address: "",
    phone: "",
    avgCost: "",
    offers: "",
  });

  const totalViews = bizList.reduce((s, b) => s + b.views, 0);
  const totalClicks = bizList.reduce((s, b) => s + b.clicks, 0);

  const openNew = () => {
    setEditingBiz(null);
    setForm({ name: "", category: "", description: "", address: "", phone: "", avgCost: "", offers: "" });
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
        lat: 28.614 + Math.random() * 0.006,
        lng: 77.206 + Math.random() * 0.008,
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
      };
      setBizList((prev) => [...prev, newBiz]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setBizList((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Business Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage your business listings</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-full" onClick={openNew}>
              <Plus className="h-4 w-4" /> Add Business
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-heading">
                {editingBiz ? "Edit Business" : "Add New Business"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label>Category</Label>
                <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <Label>Address</Label>
                <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Phone</Label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <Label>Avg Cost (₹)</Label>
                  <Input type="number" value={form.avgCost} onChange={(e) => setForm({ ...form, avgCost: e.target.value })} />
                </div>
              </div>
              <div>
                <Label>Offers (comma separated)</Label>
                <Input value={form.offers} onChange={(e) => setForm({ ...form, offers: e.target.value })} />
              </div>
              <Button className="w-full" onClick={handleSave}>
                {editingBiz ? "Save Changes" : "Add Business"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Store, label: "Total Businesses", value: bizList.length },
          { icon: Eye, label: "Total Views", value: totalViews.toLocaleString() },
          { icon: MousePointerClick, label: "Total Clicks", value: totalClicks.toLocaleString() },
        ].map((stat) => (
          <div key={stat.label} className="card-elevated flex items-center gap-4 rounded-xl border border-border bg-card p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="font-heading text-2xl font-bold text-card-foreground">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-4 py-3 text-left font-heading font-semibold text-foreground">Business</th>
              <th className="hidden px-4 py-3 text-left font-heading font-semibold text-foreground sm:table-cell">Category</th>
              <th className="hidden px-4 py-3 text-left font-heading font-semibold text-foreground md:table-cell">Trust</th>
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
                      <p className="font-medium text-card-foreground">{biz.name}</p>
                      <p className="text-xs text-muted-foreground sm:hidden">{biz.category}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{biz.category}</td>
                <td className="hidden px-4 py-3 md:table-cell">
                  <TrustBadge score={calculateTrustScore(biz)} size="sm" />
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground">{biz.views}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">{biz.clicks}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(biz)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(biz.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
