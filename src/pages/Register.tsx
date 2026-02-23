import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, UserPlus, Eye, EyeOff, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, UserRole } from "@/context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
        role: "user" as UserRole,
    });
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirm) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const result = register(form.name, form.email, form.password, form.role);
            if (result.success) {
                if (form.role === "business_owner") {
                    navigate("/my-business", { replace: true });
                } else if (form.role === "admin") {
                    navigate("/admin", { replace: true });
                } else {
                    navigate("/discover", { replace: true });
                }
            } else {
                setError(result.error || "Registration failed.");
            }
            setLoading(false);
        }, 400);
    };

    return (
        <div className="flex min-h-[calc(100vh-65px)] items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-background px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="mb-8 flex flex-col items-center gap-3 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg">
                        <MapPin className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <div>
                        <h1 className="font-heading text-2xl font-bold text-foreground">
                            Join <span className="text-primary">LocalLift</span>
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Discover and promote local businesses in Amalapuram
                        </p>
                    </div>
                </div>

                {/* Card */}
                <div className="card-elevated rounded-2xl border border-border bg-card p-8">
                    {/* Role selector */}
                    <div className="mb-6">
                        <Label className="mb-2 block">I am a</Label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                {
                                    value: "user" as UserRole,
                                    label: "User",
                                    sub: "Browse & discover local businesses",
                                    icon: User,
                                },
                                {
                                    value: "business_owner" as UserRole,
                                    label: "Business Owner",
                                    sub: "List & manage my own business",
                                    icon: Shield,
                                },
                                {
                                    value: "admin" as UserRole,
                                    label: "Admin",
                                    sub: "Platform-wide management",
                                    icon: Shield,
                                },
                            ].map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setForm({ ...form, role: opt.value })}
                                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${form.role === opt.value
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/40 hover:bg-secondary/50"
                                        }`}
                                >
                                    <div
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${form.role === opt.value
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-secondary text-muted-foreground"
                                            }`}
                                    >
                                        <opt.icon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p
                                            className={`text-sm font-semibold ${form.role === opt.value ? "text-primary" : "text-foreground"
                                                }`}
                                        >
                                            {opt.label}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground">{opt.sub}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g. Naga Sai Latha"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPw ? "text" : "password"}
                                    placeholder="Min. 6 characters"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                    className="h-11 pr-10"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    onClick={() => setShowPw(!showPw)}
                                >
                                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="confirm">Confirm Password</Label>
                            <Input
                                id="confirm"
                                type={showPw ? "text" : "password"}
                                placeholder="Re-enter password"
                                value={form.confirm}
                                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                                required
                                className="h-11"
                            />
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                            >
                                {error}
                            </motion.p>
                        )}

                        <Button
                            type="submit"
                            className="h-11 w-full gap-2 rounded-xl text-base font-semibold"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                    Creating account…
                                </span>
                            ) : (
                                <>
                                    <UserPlus className="h-4 w-4" /> Create Account
                                </>
                            )}
                        </Button>
                    </form>

                    <p className="mt-5 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-primary hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
