import { useContext } from 'react';
import { PromoContext } from '@/contexts/PromoContext';

export const usePromoData = () => {
  const context = useContext(PromoContext);
  if (context === undefined) {
    throw new Error('usePromoData must be used within a PromoProvider');
  }
  return context;
};
