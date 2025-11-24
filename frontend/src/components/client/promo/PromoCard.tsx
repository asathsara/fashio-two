import { Calendar, Clock, ShoppingBag, Percent } from "lucide-react";
import type { PromoWithItem } from "@/types/promo";
import { calculateDiscountedPrice, formatDate, getPromoImageUrl } from "@/utils/promo";

interface PromoCardProps {
    promo: PromoWithItem;
    status: "active" | "upcoming";
}

export const PromoCard = ({ promo, status }: PromoCardProps) => {
    const isActive = status === "active";
    const imageUrl = getPromoImageUrl(promo);

    return (
        <div
            className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 ${!isActive ? "opacity-75" : ""
                }`}
        >
            {/* Image */}
            <div className="relative h-56 bg-gray-100">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={promo.item.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-16 h-16 text-gray-300" />
                    </div>
                )}
                {/* Badge */}
                {isActive ? (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                        {promo.discount}% OFF
                    </div>
                ) : (
                    <div className="absolute top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                        COMING SOON
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 mt-1">
                        {promo.item.name}
                    </h3>
                </div>
                {/* Price or Discount Info */}
                {isActive ? (
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold text-green-600">
                            Rs.{calculateDiscountedPrice(promo.item.price, promo.discount)}
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                            Rs.{promo.item.price}
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 mb-4">
                        <Percent className="w-5 h-5 text-gray-600" />
                        <span className="text-lg font-semibold text-gray-900">
                            {promo.discount}% Discount
                        </span>
                    </div>
                )}

                {/* Date Info */}
                <div className="space-y-2 text-sm text-gray-600">
                    {isActive ? (
                        <>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>Until {formatDate(promo.endDate)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>Ends at {promo.endTime}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>Starts {formatDate(promo.startDate)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>at {promo.startTime}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PromoCard;
