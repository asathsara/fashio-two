import { Spinner } from "@/components/common/Spinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { PromoHero } from "@/components/client/promo/PromoHero";
import { PromoSection } from "@/components/client/promo/PromoSection";
import { EmptyPromos } from "@/components/client/promo/EmptyPromos";
import { usePromos } from "@/hooks/usePromos";
import { getPromoStatus } from "@/utils/promo";

const PromoPage = () => {
  const { data: promos = [], isLoading, error } = usePromos();

  // Exclude archived promos from public client listing
  // Also exclude promos with unavailable items because if item is deleted, promo should not show
  const visiblePromos = promos.filter(p => !p.isArchived && p.item);

  const activePromos = visiblePromos.filter(p => getPromoStatus(p) === "active");
  const upcomingPromos = visiblePromos.filter(p => getPromoStatus(p) === "upcoming");
  const pausedPromos = visiblePromos.filter(p => getPromoStatus(p) === "paused");


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <PromoHero />

      {isLoading ? (
        <Spinner fullHeight label="Loading promotions..." />
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <div className="container mx-auto px-4 py-12">
          {activePromos.length === 0 && upcomingPromos.length === 0 && pausedPromos.length === 0 ? (
            <EmptyPromos />
          ) : (
            <div className="space-y-12">
              <PromoSection title="Active Now" promos={activePromos} status="active" />
              <PromoSection title="Coming Soon" promos={upcomingPromos} status="upcoming" />
              <PromoSection title="Temporarily Unavailable" promos={pausedPromos} status="paused" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromoPage;