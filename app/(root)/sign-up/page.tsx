import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from 'next/link';

const SignUpPage = () => {
    return (
        <div className="flex flex-col min-h-[calc(100vh-80px)]">
            {/* Section 1: Hero Section */}
            <section className="flex w-full flex-col items-center gap-6 bg-secondary py-16 px-10 md:px-20 lg:px-40">
                <h1 className="text-white font-bold text-3xl md:text-5xl max-w-4xl lg:leading-tight text-center">
                    Start Your Free Trial
                </h1>
                <p className="text-white font-medium text-lg text-center max-w-2xl">
                    Join leading security companies in Nigeria transforming their operations with TEK1SECURITY. No credit card required.
                </p>
            </section>

            {/* Section 2: Form Section */}
            <section className="flex-1 flex w-full justify-center items-center py-16 px-6 md:px-20 bg-muted/20">
                <Card className="w-full max-w-xl shadow-lg border-border/50">
                    <CardContent className="p-8 md:p-10 flex flex-col gap-8">
                        <div className="space-y-2 text-center">
                            <h2 className="font-bold text-2xl lg:text-3xl">Create your account</h2>
                            <p className="text-muted-foreground">
                                Already have an account?{" "}
                                <Link href="/login" className="text-primary font-medium hover:underline">
                                    Log in
                                </Link>
                            </p>
                        </div>

                        <form className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="John" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="companyName">Company Name</Label>
                                <Input id="companyName" placeholder="e.g. Shield Security Ltd." required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="workEmail">Work Email</Label>
                                <Input id="workEmail" type="email" placeholder="john@company.com" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                <Input id="phoneNumber" type="tel" placeholder="+234 800 000 0000" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="••••••••" required />
                            </div>

                            <Button type="button" className="w-full mt-4" size="lg">
                                Create Account
                            </Button>
                        </form>

                        <p className="text-sm text-center text-muted-foreground mt-2">
                            By clicking "Create Account", you agree to our{" "}
                            <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                            {" "}and{" "}
                            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                        </p>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
};

export default SignUpPage;
