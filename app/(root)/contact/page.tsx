import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ContactPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Section 1: Hero Section */}
            <section className="flex w-full flex-col items-center gap-8 bg-secondary py-20 px-10 md:px-20 lg:px-40">
                <h1 className="text-white font-bold text-3xl lg:text-5xl max-w-5xl lg:leading-tight text-center">
                    Get in Touch with TEK1SECURITY
                </h1>
                <p className="text-white font-medium text-lg text-center max-w-3xl">
                    Whether you have a question about features, pricing, or want a customized demo, our team is ready to answer all your questions.
                </p>
            </section>

            <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto py-20 px-10 md:px-20 gap-12">
                {/* Section 2: Contact Information */}
                <section className="flex-1 flex flex-col gap-8">
                    <div className="space-y-4">
                        <h2 className="font-bold text-3xl md:text-4xl text-primary">Contact Information</h2>
                        <p className="text-lg text-muted-foreground">
                            Reach out to us directly through any of the channels below. We look forward to hearing from you.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Phone</h3>
                                    <p className="text-muted-foreground mt-1">+234 (0) 800 TEK1SEC</p>
                                    <p className="text-muted-foreground">+234 (0) 901 234 5678</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Email</h3>
                                    <p className="text-muted-foreground mt-1">support@tek1security.com</p>
                                    <p className="text-muted-foreground">sales@tek1security.com</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Location</h3>
                                    <p className="text-muted-foreground mt-1">TEK1SECURITY Headquarters,</p>
                                    <p className="text-muted-foreground">123 Security Avenue, Victoria Island,</p>
                                    <p className="text-muted-foreground">Lagos, Nigeria.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Section 3: Demo Request Form */}
                <section className="flex-1">
                    <Card className="shadow-lg border-border/50 h-full">
                        <CardContent className="p-8 flex flex-col gap-6">
                            <div className="space-y-2">
                                <h3 className="font-bold text-2xl">Request a Free Demo</h3>
                                <p className="text-muted-foreground text-sm">
                                    Fill out the form below, and one of our security experts will contact you to schedule a personalized tour of TEK1SECURITY.
                                </p>
                            </div>

                            <form className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="first-name">First Name</Label>
                                        <Input id="first-name" placeholder="John" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-name">Last Name</Label>
                                        <Input id="last-name" placeholder="Doe" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="company">Company Name</Label>
                                    <Input id="company" placeholder="e.g. Shield Security Ltd." required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Work Email</Label>
                                    <Input id="email" type="email" placeholder="john@company.com" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" type="tel" placeholder="+234 800 000 0000" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">How can we help you?</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us about your security operation needs..."
                                        className="min-h-[120px]"
                                    />
                                </div>

                                <Button type="button" className="w-full mt-4" size="lg">Submit Request</Button>
                            </form>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    );
};

export default ContactPage;
