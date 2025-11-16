import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchItemById } from "@/services/itemService";
import { Spinner } from "@/components/common/Spinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useState } from "react";
import type { Image } from "@/types/image";

const ItemDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const { data: item, isLoading, error } = useQuery({
        queryKey: ["item", id],
        queryFn: () => fetchItemById(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <Spinner fullHeight />

        );
    }

    if (error || !item) {
        return (
            <div className="container mx-auto px-4 py-8">
                <ErrorMessage message="Failed to load item details" />
                <Button onClick={() => navigate(-1)} className="mt-4">
                    Go Back
                </Button>
            </div>
        );
    }

    const imageUrl = item.images && item.images.length > 0
        ? `${import.meta.env.VITE_API_BASE_URL}/items/${item._id}/image/${selectedImageIndex}`
        : "";

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-2"
            >
                <ArrowLeft size={20} />
                Back
            </Button>

            {/* Main Content */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Section */}
                <div className="space-y-4">
                    {/* Main Image */}
                    <div className="aspect-square rounded-lg overflow-hidden border">
                        <img
                            src={imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Thumbnail Images */}
                    {item.images && item.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto">
                            {item.images.map((_image: Image, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${selectedImageIndex === index
                                        ? "border-black"
                                        : "border-gray-200 hover:border-gray-400"
                                        }`}
                                >
                                    <img
                                        src={`${import.meta.env.VITE_API_BASE_URL}/items/${item._id}/image/${index}`}
                                        alt={`${item.name} thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                    {/* Category Badge */}
                    <Badge variant="secondary" className="text-sm">
                        {item.category.name} - {item.subCategoryName}
                    </Badge>

                    {/* Item Name */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {item.name}
                    </h1>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-gray-900">
                            Rs. {(Math.round(item.price * 100) / 100).toFixed(2)}
                        </span>
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Availability:</span>
                        {item.stock > 0 ? (
                            <Badge variant="default" className="bg-green-600">
                                In Stock ({item.stock} available)
                            </Badge>
                        ) : (
                            <Badge variant="destructive">Out of Stock</Badge>
                        )}
                    </div>

                    {/* Size Selector */}
                    {item.sizes && item.sizes.length > 0 && (
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700">
                                Select Size
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {item.sizes.map((size: string) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 border rounded-md font-medium transition-all ${selectedSize === size
                                            ? "bg-black text-white border-black"
                                            : "bg-white text-gray-900 border-gray-300 hover:border-gray-900"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    {item.description && (
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Description
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    )}

                    {/* Add to Cart Button */}
                    <div className="pt-4">
                        <Button
                            size="lg"
                            className="w-full md:w-auto flex items-center gap-2"
                            disabled={item.stock === 0 || (item.sizes.length > 0 && !selectedSize)}
                        >
                            <ShoppingCart size={20} />
                            Add to Cart
                        </Button>
                        {item.sizes.length > 0 && !selectedSize && (
                            <p className="text-sm text-gray-500 mt-2">
                                Please select a size
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetailPage;
