import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, LogIn, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [form, setForm] = useState({ email: "", password: "" });
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const from = (location.state as any)?.from?.pathname || "/discover";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        setTimeout(() => {
            const result = login(form.email, form.password);
            if (result.success) {
                navigate(from, { replace: true });
            } else {
                setError(result.error || "Login failed");
            }
            setLoading(false);
        }, 400);
    };

    return (
        <div className="flex min-h-[calc(100vh-65px)] items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-background px-4">
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
                            Welcome back to <span className="text-primary">LocalLift</span>
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Sign in to discover Amalapuram's best local businesses
                        </p>
                    </div>
                </div>

                {/* Card */}
                <div className="card-elevated rounded-2xl border border-border bg-card p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
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
                                    placeholder="••••••••"
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
                                    Signing in…
                                </span>
                            ) : (
                                <>
                                    <LogIn className="h-4 w-4" /> Sign In
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Demo credentials hint */}
                    <div className="mt-5 rounded-xl border border-border bg-secondary/50 p-3 text-xs text-muted-foreground">
                        <p className="mb-1 font-semibold text-foreground">Demo credentials</p>
                        <p>🔑 Admin — <span className="font-mono">admin@locallift.in</span> / <span className="font-mono">admin123</span></p>
                    </div>

                    <p className="mt-5 text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-primary hover:underline"
                        >
                            Create one
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
