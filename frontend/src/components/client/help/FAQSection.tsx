import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
    {
        question: "How do I track my order?",
        answer: "You can track your order by logging into your account and visiting the 'My Orders' section. Click on the specific order to view detailed tracking information. You'll also receive tracking updates via email."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and various digital wallets. All payments are processed securely through our encrypted payment gateway."
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for most items. Products must be unused, in original packaging, and with tags attached. To initiate a return, visit your order history and select 'Return Item'."
    },
    {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days. International orders may take 10-15 business days depending on the destination."
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by location. International customers are responsible for any customs duties or taxes."
    },
    {
        question: "How can I change or cancel my order?",
        answer: "Orders can be modified or cancelled within 1 hour of placement. After this time, the order enters processing and cannot be changed. Contact our support team immediately if you need assistance."
    }
];

export const FAQSection = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                    Find answers to the most common questions
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
};