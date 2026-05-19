import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { new_pricing_plans, addOns } from '@/lib/constants';
import { Check, CheckCircle } from 'lucide-react';
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
          Choose the plan that fits your business needs. Streamline every aspect
          of your security operations with our tailored solutions.
        </p>
      </section>

      {/* Section 2: Price Comparison Section */}
      <section className="flex w-full flex-col items-center gap-12 py-20 px-10 md:px-20 lg:px-40 bg-background">
        <div className="text-center space-y-4 max-w-3xl">
          <h2 className="font-bold text-3xl md:text-5xl">
            Our Affordable Plans
          </h2>
          <p className="text-lg text-muted-foreground">
            We offer tiered pricing to suit businesses from growing startups to
            established enterprises.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <div className="bg-primary/10 text-primary px-5 py-2 rounded-full font-medium text-sm">
              Deployment Fee: ₦150,000 - ₦250,000
            </div>
            <div className="bg-primary/10 text-primary px-5 py-2 rounded-full font-medium text-sm">
              Per Guard Fee: ₦1,500 / month
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1400px]">
          {new_pricing_plans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col relative transition-all duration-300 shadow-sm hover:shadow-md ${
                plan.highlight 
                  ? 'border-2 border-primary shadow-primary/20 scale-105 z-10' 
                  : 'border-border/50 bg-background hover:border-primary/50'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="flex-none">
                <CardTitle className={`text-xl font-bold ${plan.highlight ? 'text-primary' : ''}`}>
                  {plan.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2 min-h-[40px]">{plan.description}</p>
                <div className="mt-4 flex flex-col gap-1">
                  <span className="text-3xl font-bold">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">
                    {plan.duration}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 mt-4">
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-foreground font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex-none pt-6 mt-auto">
                <Button
                  className="w-full"
                  size="lg"
                  variant={plan.highlight ? 'default' : 'outline'}
                  asChild
                >
                  <Link href={plan.name === 'ENTERPRISE PLAN' ? '#enterprise' : '/contact'}>
                    {plan.name === 'ENTERPRISE PLAN' ? 'Contact Sales' : 'Get Started'}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Add-Ons Section */}
        <div className="w-full max-w-[1200px] mt-16 bg-muted/30 rounded-2xl p-8 border border-border/50">
          <div className="text-center mb-8">
            <h3 className="font-bold text-2xl">Available Add-ons</h3>
            <p className="text-muted-foreground mt-2">Enhance your plan with these optional features.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {addOns.map((addon, idx) => (
              <div key={idx} className="flex items-center justify-between bg-background p-5 rounded-xl border border-border/50 shadow-sm hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 text-primary p-2.5 rounded-lg">
                    <Check className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-foreground text-lg">{addon.name}</span>
                </div>
                <span className="font-bold text-primary text-lg">{addon.price} <span className="text-sm text-muted-foreground font-normal">/ month</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Section 4: Enterprise CTA Section */}
      <section
        id="enterprise"
        className="flex w-full flex-col items-start justify-center gap-8 py-24 px-10 md:px-20 lg:px-40 bg-[#e0e0e0] border-y border-primary/20"
      >
        <div className="space-y-4">
          <h2 className="font-bold text-3xl md:text-5xl">
            Need a Custom Solution or More Information?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Our team is ready to discuss your specific requirements and help you
            choose the perfect plan. Contact us for a personalized consultation.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
          <Button
            variant="default"
            size="lg"
            className="w-full sm:w-auto bg-secondary hover:bg-secondary/80"
            asChild
          >
            <Link href="/contact">Contact Sales</Link>
          </Button>
          <Button
            variant="default"
            size="lg"
            className="w-full sm:w-auto"
            asChild
          >
            <Link href="/faqs">View FAQs</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
