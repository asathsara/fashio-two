import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail, Phone, HelpCircle } from 'lucide-react';

export const ContactSection = () => {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <MessageCircle className="w-10 h-10 text-dark-gray mb-2" />
                    <CardTitle>Live Chat</CardTitle>
                    <CardDescription>
                        Chat with our support team in real-time
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Badge variant="secondary" className="mb-4">Available 24/7</Badge>
                    <Button className="w-full rounded-4xl cursor-pointer">Start Chat</Button>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <Mail className="w-10 h-10 text-dark-gray mb-2" />
                    <CardTitle>Email Support</CardTitle>
                    <CardDescription>
                        Send us an email and we'll respond within 24 hours
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600 mb-4">support@fashio.com</p>
                    <Button variant="outline" className="w-full">Send Email</Button>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <Phone className="w-10 h-10 text-dark-gray mb-2" />
                    <CardTitle>Phone Support</CardTitle>
                    <CardDescription>
                        Call us during business hours
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600 mb-2">+1 (800) 123-4567</p>
                    <Badge variant="outline">Mon-Fri 9AM-6PM EST</Badge>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <HelpCircle className="w-10 h-10 text-dark-gray mb-2" />
                    <CardTitle>Help Center</CardTitle>
                    <CardDescription>
                        Browse our comprehensive knowledge base
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className="w-full">Visit Help Center</Button>
                </CardContent>
            </Card>
        </div>
    );
};