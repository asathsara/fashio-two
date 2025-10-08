import { Search, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HelpHeroProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
}

export const HelpHero = ({ searchQuery, onSearchChange }: HelpHeroProps) => {
    return (
        <div className="bg-gradient-to-b from-navbar-gray to-dark-gray text-white py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <HelpCircle className="w-16 h-16 mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        How Can We Help You?
                    </h1>
                    <p className="text-lg mb-8 text-white-100">
                        Search our knowledge base or browse categories below
                    </p>

                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="Search for answers..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-12 py-6 text-lg rounded-full bg-white text-gray-900"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};