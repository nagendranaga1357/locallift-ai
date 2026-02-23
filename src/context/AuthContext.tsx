import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

export type UserRole = "admin" | "user" | "business_owner";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

interface AuthContextType {
    user: AuthUser | null;
    isAdmin: boolean;
    isBusinessOwner: boolean;
    isLoggedIn: boolean;
    login: (email: string, password: string) => { success: boolean; error?: string };
    register: (name: string, email: string, password: string, role: UserRole) => { success: boolean; error?: string };
    logout: () => void;
}

const AUTH_USERS_KEY = "locallift-users";
const AUTH_SESSION_KEY = "locallift-session";

const AuthContext = createContext<AuthContextType | null>(null);

function loadUsers(): Array<AuthUser & { password: string }> {
    try {
        const raw = localStorage.getItem(AUTH_USERS_KEY);
        if (raw) return JSON.parse(raw);
    } catch { }
    // Seed one default admin
    const defaults = [
        {
            id: "admin-seed",
            name: "Admin",
            email: "admin@locallift.in",
            password: "admin123",
            role: "admin" as UserRole,
        },
    ];
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(defaults));
    return defaults;
}

function saveUsers(users: Array<AuthUser & { password: string }>) {
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(() => {
        try {
            const raw = localStorage.getItem(AUTH_SESSION_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(AUTH_SESSION_KEY);
        }
    }, [user]);

    const login = (email: string, password: string) => {
        const users = loadUsers();
        const found = users.find(
            (u) =>
                u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (!found) return { success: false, error: "Invalid email or password." };
        const { password: _, ...authUser } = found;
        setUser(authUser);
        return { success: true };
    };

    const register = (
        name: string,
        email: string,
        password: string,
        role: UserRole
    ) => {
        if (!name.trim() || !email.trim() || !password.trim())
            return { success: false, error: "All fields are required." };
        if (password.length < 6)
            return { success: false, error: "Password must be at least 6 characters." };

        const users = loadUsers();
        if (users.some((u) => u.email.toLowerCase() === email.toLowerCase()))
            return { success: false, error: "An account with this email already exists." };

        const newUser = {
            id: `user-${Date.now()}`,
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password,
            role,
        };
        saveUsers([...users, newUser]);
        const { password: _, ...authUser } = newUser;
        setUser(authUser);
        return { success: true };
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAdmin: user?.role === "admin",
                isBusinessOwner: user?.role === "business_owner",
                isLoggedIn: !!user,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be inside AuthProvider");
    return ctx;
};
