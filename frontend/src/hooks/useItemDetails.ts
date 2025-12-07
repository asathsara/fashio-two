import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchItemById, fetchItemBySlug } from '@/services/itemService';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/UseAuth';
import { usePromoData } from '@/hooks/usePromoData';

export const useItemDetails = (slugOrId: string | undefined) => {
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const { addToCart, loading: cartLoading } = useCart();
    const { isAuthenticated } = useAuth();
    const { getItemPricing } = usePromoData();

    // specific check for 24-char hex string (ObjectId)
    const isObjectId = slugOrId && /^[0-9a-fA-F]{24}$/.test(slugOrId);

    const { data: item, isLoading, error } = useQuery({
        queryKey: ['item', slugOrId],
        queryFn: () => isObjectId
            ? fetchItemById(slugOrId!)
            : fetchItemBySlug(slugOrId!),
        enabled: !!slugOrId,
    });

    const handleAddToCart = async (quantity: number = 1) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        if (!item?._id || !selectedSize) return;

        try {
            await addToCart({
                itemId: item._id,
                quantity,
                size: selectedSize,
                selectedImageIndex,
            });
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    const pricing = item ? getItemPricing(item) : null;

    return {
        item,
        isLoading,
        error,
        selectedSize,
        setSelectedSize,
        selectedImageIndex,
        setSelectedImageIndex,
        handleAddToCart,
        cartLoading,
        isAuthenticated,
        pricing,
    };
};
