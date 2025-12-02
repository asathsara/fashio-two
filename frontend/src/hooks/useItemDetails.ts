import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchItemById } from '@/services/itemService';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/UseAuth';
import { usePromoData } from '@/hooks/usePromoData';

export const useItemDetails = (itemId: string | undefined) => {
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const { addToCart, loading: cartLoading } = useCart();
    const { isAuthenticated } = useAuth();
    const { getItemPricing } = usePromoData();

    const { data: item, isLoading, error } = useQuery({
        queryKey: ['item', itemId],
        queryFn: () => fetchItemById(itemId!),
        enabled: !!itemId,
    });

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        if (!itemId || !selectedSize) return;

        try {
            await addToCart({
                itemId,
                quantity: 1,
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
