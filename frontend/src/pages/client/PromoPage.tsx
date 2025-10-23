import { Spinner } from "../../components/common/Spinner";
import { ErrorMessage } from "../../components/common/ErrorMessage";
import { Tag, Calendar, Clock, Percent, ShoppingBag } from "lucide-react";
import type { PromoWithItem } from "../../types/promo";
import { usePromos } from "@/hooks/usePromos";

const PromoPage = () => {

  const { data: promos = [], isLoading, error } = usePromos()

  const getPromoStatus = (promo: PromoWithItem): "active" | "upcoming" | "expired" => {
    const now = new Date();
    const start = new Date(`${promo.startDate}T${promo.startTime}`);
    const end = new Date(`${promo.endDate}T${promo.endTime}`);

    if (now < start) return "upcoming";
    if (now > end) return "expired";
    return "active";
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateDiscountedPrice = (price: number, discount: string) => {
    const discountPercent = parseFloat(discount);
    return (price * (1 - discountPercent / 100)).toFixed(2);
  };

  const activePromos = promos.filter(p => getPromoStatus(p) === "active");
  const upcomingPromos = promos.filter(p => getPromoStatus(p) === "upcoming");


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r  from-navbar-gray to-dark-gray text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Tag className="w-12 h-12 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
              Special Offers
            </h1>
            <p className="text-lg text-gray-300">
              Don't miss out on our amazing deals and limited-time promotions
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <Spinner label="Loading promotions..."  />
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) :
        <div className="container mx-auto px-4 py-12">
          {activePromos.length === 0 && upcomingPromos.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-16">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                No Active Promotions
              </h2>
              <p className="text-gray-600">
                Check back soon for exciting deals and special offers!
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Active Promotions */}
              {activePromos.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 font-poppins">
                    Active Now
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activePromos.map((promo) => (
                      <div
                        key={promo._id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                      >
                        {/* Image */}
                        <div className="relative h-56 bg-gray-100">
                          {promo.item.urls && promo.item.urls[0] ? (
                            <img
                              src={import.meta.env.VITE_API_UPLOAD_IMAGES_URL + promo.item.urls[0]}
                              alt={promo.item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="w-16 h-16 text-gray-300" />
                            </div>
                          )}
                          {/* Discount Badge */}
                          <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                            {promo.discount}% OFF
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <div className="mb-3">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                              {promo.item.category}
                            </span>
                            <h3 className="text-xl font-semibold text-gray-900 mt-1">
                              {promo.item.name}
                            </h3>
                          </div>

                          {/* Price */}
                          <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-2xl font-bold text-green-600">
                              Rs.{calculateDiscountedPrice(promo.item.price, promo.discount)}
                            </span>
                            <span className="text-lg text-gray-400 line-through">
                              Rs.{promo.item.price}
                            </span>
                          </div>

                          {/* Validity */}
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>Until {formatDate(promo.endDate)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>Ends at {promo.endTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Upcoming Promotions */}
              {upcomingPromos.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 font-poppins">
                    Coming Soon
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingPromos.map((promo) => (
                      <div
                        key={promo._id}
                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 opacity-75"
                      >
                        {/* Image */}
                        <div className="relative h-56 bg-gray-100">
                          {promo.item.urls && promo.item.urls[0] ? (
                            <img
                              src={`http://localhost:8080/${promo.item.urls[0]}`}
                              alt={promo.item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="w-16 h-16 text-gray-300" />
                            </div>
                          )}
                          {/* Coming Soon Badge */}
                          <div className="absolute top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                            COMING SOON
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <div className="mb-3">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                              {promo.item.category}
                            </span>
                            <h3 className="text-xl font-semibold text-gray-900 mt-1">
                              {promo.item.name}
                            </h3>
                          </div>

                          {/* Discount Info */}
                          <div className="flex items-center gap-2 mb-4">
                            <Percent className="w-5 h-5 text-gray-600" />
                            <span className="text-lg font-semibold text-gray-900">
                              {promo.discount}% Discount
                            </span>
                          </div>

                          {/* Start Date */}
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>Starts {formatDate(promo.startDate)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>at {promo.startTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      }
    </div>
      
  );
};

export default PromoPage;