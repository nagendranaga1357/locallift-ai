import { useState, useMemo } from "react";
import { businesses, Business } from "@/data/businesses";
import BusinessMap from "@/components/BusinessMap";
import BusinessCard from "@/components/BusinessCard";
import BusinessDetailSheet from "@/components/BusinessDetailSheet";

interface MapPageProps {
  studentMode: boolean;
}

const MapPage = ({ studentMode }: MapPageProps) => {
  const [selected, setSelected] = useState<Business | null>(null);
  const [detailBiz, setDetailBiz] = useState<Business | null>(null);

  return (
    <div className="flex h-[calc(100vh-65px)] flex-col lg:flex-row">
      <div className="h-1/2 lg:h-full lg:w-2/3">
        <BusinessMap
          businesses={businesses}
          selectedBusiness={selected}
          onSelectBusiness={setSelected}
          className="h-full rounded-none border-0"
        />
      </div>
      <div className="h-1/2 overflow-y-auto border-t border-border bg-background p-4 lg:h-full lg:w-1/3 lg:border-l lg:border-t-0">
        <h2 className="mb-3 font-heading text-lg font-bold text-foreground">
          Nearby Businesses
        </h2>
        <div className="flex flex-col gap-4">
          {businesses.map((biz) => (
            <BusinessCard
              key={biz.id}
              business={biz}
              studentMode={studentMode}
              onClick={() => {
                setSelected(biz);
                setDetailBiz(biz);
              }}
            />
          ))}
        </div>
      </div>
      <BusinessDetailSheet
        business={detailBiz}
        open={!!detailBiz}
        onClose={() => setDetailBiz(null)}
        studentMode={studentMode}
      />
    </div>
  );
};

export default MapPage;
