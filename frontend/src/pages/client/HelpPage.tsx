import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HelpHero } from '../../components/client/help/HelpHero';
import { HelpCategories } from '../../components/client/help/HelpCategories';
import { FAQSection } from '../../components/client/help/FAQSection';
import { GuidesSection } from '../../components/client/help/GuidesSection';
import { ContactSection } from '../../components/client/help/ContactSection';

const HelpPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <HelpHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

            <div className="container mx-auto px-4 py-12">
                <HelpCategories />

                <Tabs defaultValue="faq" className="max-w-5xl mx-auto">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="faq">FAQ</TabsTrigger>
                        <TabsTrigger value="guides">Guides</TabsTrigger>
                        <TabsTrigger value="contact">Contact Us</TabsTrigger>
                    </TabsList>

                    <TabsContent value="faq">
                        <FAQSection />
                    </TabsContent>

                    <TabsContent value="guides">
                        <GuidesSection />
                    </TabsContent>

                    <TabsContent value="contact">
                        <ContactSection />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default HelpPage;