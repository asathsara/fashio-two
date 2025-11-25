interface ItemPricingProps {
    hasPromo: boolean;
    appliedPrice: number;
    originalPrice: number;
    regularPrice: number;
}

export const ItemPricing = ({
    hasPromo,
    appliedPrice,
    originalPrice,
    regularPrice
}: ItemPricingProps) => {
    return (
        <div className="flex items-center gap-2">
            {hasPromo ? (
                <>
                    <span className="text-3xl font-bold text-red-600">
                        Rs. {(Math.round(appliedPrice * 100) / 100).toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                        Rs. {(Math.round(originalPrice * 100) / 100).toFixed(2)}
                    </span>
                </>
            ) : (
                <span className="text-3xl font-bold text-gray-900">
                    Rs. {(Math.round(regularPrice * 100) / 100).toFixed(2)}
                </span>
            )}
        </div>
    );
};

export default ItemPricing;
