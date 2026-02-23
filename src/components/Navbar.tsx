import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Menu, X, GraduationCap, LogOut, User, Shield, LogIn, UserPlus, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  studentMode: boolean;
  onStudentModeChange: (value: boolean) => void;
}

const Navbar = ({ studentMode, onStudentModeChange }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, isBusinessOwner, isLoggedIn, logout } = useAuth();

  const baseLinks = [
    { to: "/", label: "Home" },
    { to: "/discover", label: "Discover" },
    { to: "/map", label: "Map" },
  ];

  const links = isAdmin
    ? [...baseLinks, { to: "/admin", label: "Dashboard" }]
    : isBusinessOwner
      ? [...baseLinks, { to: "/my-business", label: "My Business" }]
      : baseLinks;

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <MapPin className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold text-foreground">
            Local<span className="text-primary">Lift</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-medium transition-colors hover:text-primary ${location.pathname === link.to
                ? "text-primary"
                : "text-muted-foreground"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop right controls */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Student Mode toggle */}
          <div className="flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5">
            <GraduationCap
              className={`h-4 w-4 ${studentMode ? "text-student" : "text-muted-foreground"}`}
            />
            <span className="text-sm font-medium text-foreground">Student</span>
            <Switch checked={studentMode} onCheckedChange={onStudentModeChange} />
          </div>

          {/* Auth */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-full"
                >
                  {isAdmin ? (
                    <Shield className="h-3.5 w-3.5 text-trust-high" />
                  ) : (
                    <User className="h-3.5 w-3.5" />
                  )}
                  <span className="max-w-[100px] truncate">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                  <span
                    className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${isAdmin
                        ? "bg-trust-high/10 text-trust-high"
                        : isBusinessOwner
                          ? "bg-primary/10 text-primary"
                          : "bg-student/10 text-student"
                      }`}
                  >
                    {isAdmin ? <Shield className="h-2.5 w-2.5" /> : isBusinessOwner ? <Store className="h-2.5 w-2.5" /> : <User className="h-2.5 w-2.5" />}
                    {isAdmin ? "Admin" : isBusinessOwner ? "Business Owner" : "User"}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    <Shield className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                )}
                {isBusinessOwner && (
                  <DropdownMenuItem onClick={() => navigate("/my-business")}>
                    <Store className="mr-2 h-4 w-4" />
                    My Business
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 rounded-full"
                onClick={() => navigate("/login")}
              >
                <LogIn className="h-3.5 w-3.5" /> Sign In
              </Button>
              <Button
                size="sm"
                className="gap-1.5 rounded-full"
                onClick={() => navigate("/register")}
              >
                <UserPlus className="h-3.5 w-3.5" /> Register
              </Button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-border bg-card px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2 font-medium transition-colors ${location.pathname === link.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary"
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Student mode */}
            <div className="flex items-center gap-2 pt-1">
              <GraduationCap
                className={`h-4 w-4 ${studentMode ? "text-student" : "text-muted-foreground"}`}
              />
              <span className="text-sm font-medium">Student Mode</span>
              <Switch checked={studentMode} onCheckedChange={onStudentModeChange} />
            </div>

            {/* Auth mobile */}
            <div className="border-t border-border pt-2">
              {isLoggedIn ? (
                <>
                  <div className="mb-2 px-3">
                    <p className="text-sm font-semibold text-foreground">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                    <span
                      className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${isAdmin
                          ? "bg-trust-high/10 text-trust-high"
                          : isBusinessOwner
                            ? "bg-primary/10 text-primary"
                            : "bg-student/10 text-student"
                        }`}
                    >
                      {isAdmin ? "Admin" : isBusinessOwner ? "Business Owner" : "User"}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => { navigate("/login"); setMobileOpen(false); }}
                  >
                    <LogIn className="mr-1.5 h-3.5 w-3.5" /> Sign In
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => { navigate("/register"); setMobileOpen(false); }}
                  >
                    <UserPlus className="mr-1.5 h-3.5 w-3.5" /> Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
