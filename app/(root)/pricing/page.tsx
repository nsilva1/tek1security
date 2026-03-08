import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { pricing_plans, plan_features } from "@/lib/constants";
import { Check, X, CheckCircle } from "lucide-react";
import Link from 'next/link';

const PricingPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Section 1: Hero Section */}
            <section className="flex w-full flex-col items-center gap-8 bg-secondary py-20 px-10 md:px-20 lg:px-40">
                <h1 className="text-white font-bold text-3xl lg:text-5xl max-w-5xl lg:leading-tight text-center">
                    Flexible Pricing for Every Security Operation
                </h1>
                <p className="text-white font-medium text-lg text-center max-w-3xl">
                    Choose the plan that fits your business needs.
                    Streamline every aspect of your security operations with our tailored solutions.
                </p>
            </section>

            {/* Section 2: Price Comparison Section */}
            <section className="flex w-full flex-col items-center gap-12 py-20 px-10 md:px-20 lg:px-40 bg-background">
                <div className="text-center space-y-4 max-w-3xl">
                    <h2 className="font-bold text-3xl md:text-5xl">Our Affordable Plans</h2>
                    <p className="text-lg text-muted-foreground">We offer tiered pricing to suit businesses from growing startups to established enterprises.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
                    {pricing_plans.map((plan, index) => (
                        <Card key={index} className="flex flex-col border-border/50 bg-background hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
                            <CardHeader className="flex-none">
                                <CardTitle className="text-2xl font-bold text-primary">{plan.title}</CardTitle>
                                <div className="mt-4 flex flex-col gap-1">
                                    <span className="text-3xl">{plan.monthly_price === 'Custom' ? 'Custom' : `₦${plan.monthly_price}`}</span>
                                    {plan.monthly_price !== 'Custom' && <span className="text-sm text-muted-foreground">per month</span>}
                                    {plan.yearly_price !== 'Custom' && (
                                        <span className="text-sm text-primary font-medium mt-1">or ₦{plan.yearly_price} / year</span>
                                    )}
                                    {plan.yearly_price === 'Custom' && (
                                        <span className="text-sm text-muted-foreground mt-1">Tailored for large organizations</span>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <ul className="space-y-3 mt-4">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm">
                                            <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                                            <span className="text-muted-foreground font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="flex-none pt-4">
                                <Button className={`w-full ${plan.title !== 'Professional Plan' ? 'bg-secondary text-white hover:bg-secondary/80 hover:text-white' : ''}`} size="lg" variant={plan.title === 'Professional Plan' ? 'default' : 'outline'} asChild>
                                    <Link href={plan.title === 'Enterprise Plan' ? '#enterprise' : '/contact'}>
                                        {plan.title === 'Enterprise Plan' ? 'Contact for Quote' : 'Subscribe Now'}
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Section 3: Feature Comparison Section */}
            <section className="flex w-full flex-col items-center gap-12 py-20 px-10 md:px-20 lg:px-40 bg-secondary">
                <div className="text-center space-y-4 max-w-3xl">
                    <h2 className="font-bold text-3xl md:text-5xl text-white">Compare Features</h2>
                    <p className="text-lg text-white">Detailed breakdown of what&apos;s included in each plan.</p>
                </div>

                <div className="w-full max-w-6xl">
                    {/* Desktop View */}
                    <div className="hidden md:block overflow-x-auto bg-background rounded-xl shadow-sm">
                        <table className="w-full text-left border-collapse bg-secondary">
                            <thead>
                                <tr className='text-primary'>
                                    <th className="p-6 border-b border-border/20 font-bold text-xl bg-muted/20 w-1/4">Feature</th>
                                    {Object.values(plan_features).map((plan) => (
                                        <th key={plan.title} className="p-6 border-b border-border/20 font-bold text-center text-xl w-1/4 bg-muted/20">
                                            {plan.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(plan_features.basic.features).map((featureKey, index) => (
                                    <tr key={index} className="hover:bg-muted/10 transition-colors">
                                        <td className="p-4 px-6 border-b border-border/20 font-medium text-white">
                                            {featureKey}
                                        </td>
                                        {Object.values(plan_features).map((plan) => {
                                            const value = (plan.features as any)[featureKey];
                                            return (
                                                <td key={plan.title} className="p-4 border-b border-border/20 text-center">
                                                    {typeof value === 'boolean' ? (
                                                        value ? <Check className="mx-auto h-5 w-5 text-green-500" /> : <X className="mx-auto h-5 w-5 text-red-500" />
                                                    ) : (
                                                        <span className="text-sm font-semibold text-white">{value}</span>
                                                    )}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden flex flex-col gap-6 w-full">
                        {Object.keys(plan_features.basic.features).map((featureKey, index) => (
                            <div key={index} className="bg-background border border-border/50 rounded-xl p-5 shadow-sm">
                                <h4 className="font-bold text-lg mb-4 text-center border-b border-border/30 pb-3">{featureKey}</h4>
                                <div className="flex flex-col gap-4">
                                    {Object.values(plan_features).map((plan) => {
                                        const value = (plan.features as any)[featureKey];
                                        return (
                                            <div key={plan.title} className="flex justify-between items-center px-1">
                                                <span className="font-medium text-muted-foreground">{plan.title}</span>
                                                <span>
                                                    {typeof value === 'boolean' ? (
                                                        value ? <Check className="h-5 w-5 text-primary" /> : <X className="h-5 w-5 text-muted-foreground/30" />
                                                    ) : (
                                                        <span className="text-sm font-semibold text-right max-w-[120px]">{value}</span>
                                                    )}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 4: Enterprise CTA Section */}
            <section id="enterprise" className="flex w-full flex-col items-start justify-center gap-8 py-24 px-10 md:px-20 lg:px-40 bg-[#e0e0e0] border-y border-primary/20">
                <div className="space-y-4">
                    <h2 className="font-bold text-3xl md:text-5xl">Need a Custom Solution or More Information?</h2>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        Our team is ready to discuss your specific requirements and help you choose the perfect plan. Contact us for a personalized consultation.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                    <Button variant="default" size="lg" className="w-full sm:w-auto bg-secondary hover:bg-secondary/80" asChild>
                        <Link href="/contact">Contact Sales</Link>
                    </Button>
                    <Button variant="default" size="lg" className="w-full sm:w-auto" asChild>
                        <Link href="/faqs">View FAQs</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default PricingPage
