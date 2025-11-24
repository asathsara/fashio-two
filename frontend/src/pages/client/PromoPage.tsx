import { Spinner } from "@/components/common/Spinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { PromoHero } from "@/components/client/promo/PromoHero";
import { PromoSection } from "@/components/client/promo/PromoSection";
import { EmptyPromos } from "@/components/client/promo/EmptyPromos";
import type { PromoWithItem } from "@/types/promo";
import { usePromos } from "@/hooks/usePromos";

const PromoPage = () => {
  const { data: promos = [], isLoading, error } = usePromos();

  const getPromoStatus = (promo: PromoWithItem): "active" | "upcoming" | "expired" => {
    const now = new Date();
    const start = new Date(`${promo.startDate}T${promo.startTime}`);
    const end = new Date(`${promo.endDate}T${promo.endTime}`);

    if (now < start) return "upcoming";
    if (now > end) return "expired";
    return "active";
  };

  const activePromos = promos.filter(p => getPromoStatus(p) === "active");
  const upcomingPromos = promos.filter(p => getPromoStatus(p) === "upcoming");


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <PromoHero />

      {isLoading ? (
        <Spinner fullHeight label="Loading promotions..." />
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <div className="container mx-auto px-4 py-12">
          {activePromos.length === 0 && upcomingPromos.length === 0 ? (
            <EmptyPromos />
          ) : (
            <div className="space-y-12">
              <PromoSection title="Active Now" promos={activePromos} status="active" />
              <PromoSection title="Coming Soon" promos={upcomingPromos} status="upcoming" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromoPage;