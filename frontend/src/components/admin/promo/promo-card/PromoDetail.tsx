import type { LucideIcon } from 'lucide-react';

interface PromoDetailProps {
    icon: LucideIcon;
    label: string;
    value: string;
}

export const PromoDetail = ({ icon: Icon, label, value }: PromoDetailProps) => {
    return (
        <div className="flex items-start gap-2 text-muted-foreground">
            <Icon className="w-4 h-4 mt-0.5" />
            <div>
                <p className="font-medium text-foreground">{label}</p>
                <p>{value}</p>
            </div>
        </div>
    );
};
