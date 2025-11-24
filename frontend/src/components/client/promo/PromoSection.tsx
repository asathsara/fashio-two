import type { PromoWithItem } from "@/types/promo";
import { PromoCard } from "./PromoCard";

interface PromoSectionProps {
    title: string;
    promos: PromoWithItem[];
    status: "active" | "upcoming";
}

export const PromoSection = ({ title, promos, status }: PromoSectionProps) => {
    if (promos.length === 0) return null;

    return (
        <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-poppins">
                {title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promos.map((promo) => (
                    <PromoCard key={promo._id} promo={promo} status={status} />
                ))}
            </div>
        </section>
    );
};

export default PromoSection;
