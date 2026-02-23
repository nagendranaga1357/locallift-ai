import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import {
    businesses as seedData,
    Business,
    calculateTrustScore,
    isHiddenGem,
    isTrending,
    getBadges,
    getRecommendations,
    getPlatformStats,
} from "@/data/businesses";

const BIZ_STORAGE_KEY = "locallift-businesses";

interface BusinessContextType {
    businesses: Business[];
    addBusiness: (biz: Omit<Business, "id" | "clicks" | "views" | "rating" | "reviewCount">, ownerId?: string) => void;
    updateBusiness: (id: string, updates: Partial<Business>) => void;
    deleteBusiness: (id: string) => void;
    getMyBusinesses: (ownerId: string) => Business[];
    // Re-export helpers so consumers don't need to import from data
    calculateTrustScore: typeof calculateTrustScore;
    isHiddenGem: typeof isHiddenGem;
    isTrending: typeof isTrending;
    getBadges: typeof getBadges;
    getRecommendations: typeof getRecommendations;
    getPlatformStats: typeof getPlatformStats;
}

const BusinessContext = createContext<BusinessContextType | null>(null);

function loadBusinesses(): Business[] {
    try {
        const raw = localStorage.getItem(BIZ_STORAGE_KEY);
        if (raw) {
            const saved: Business[] = JSON.parse(raw);
            // Merge: keep any seed IDs updated from seed, append genuinely new user-added ones
            const seedIds = new Set(seedData.map((b) => b.id));
            const userAdded = saved.filter((b) => !seedIds.has(b.id));
            return [...seedData, ...userAdded];
        }
    } catch { }
    return [...seedData];
}

export const BusinessProvider = ({ children }: { children: ReactNode }) => {
    const [businesses, setBusinesses] = useState<Business[]>(loadBusinesses);

    // Persist only user-added businesses (not seed) to avoid bloat
    useEffect(() => {
        const seedIds = new Set(seedData.map((b) => b.id));
        const userAdded = businesses.filter((b) => !seedIds.has(b.id));
        localStorage.setItem(BIZ_STORAGE_KEY, JSON.stringify(userAdded));
    }, [businesses]);

    const addBusiness = (
        biz: Omit<Business, "id" | "clicks" | "views" | "rating" | "reviewCount">,
        ownerId?: string
    ) => {
        const newBiz: Business = {
            ...biz,
            id: `user-${Date.now()}`,
            clicks: 0,
            views: 0,
            rating: 4.0,
            reviewCount: 0,
            ...(ownerId ? { ownerId } : {}),
        };
        setBusinesses((prev) => [newBiz, ...prev]);
    };

    const updateBusiness = (id: string, updates: Partial<Business>) => {
        setBusinesses((prev) =>
            prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
        );
    };

    const deleteBusiness = (id: string) => {
        setBusinesses((prev) => prev.filter((b) => b.id !== id));
    };

    const getMyBusinesses = (ownerId: string) =>
        businesses.filter((b) => b.ownerId === ownerId);

    return (
        <BusinessContext.Provider
            value={{
                businesses,
                addBusiness,
                updateBusiness,
                deleteBusiness,
                getMyBusinesses,
                calculateTrustScore,
                isHiddenGem,
                isTrending,
                getBadges,
                getRecommendations,
                getPlatformStats,
            }}
        >
            {children}
        </BusinessContext.Provider>
    );
};

export const useBusinesses = () => {
    const ctx = useContext(BusinessContext);
    if (!ctx) throw new Error("useBusinesses must be inside BusinessProvider");
    return ctx;
};
