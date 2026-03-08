import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { tek1_full_features } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const FeaturesPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="flex w-full flex-col items-center gap-8 bg-secondary py-20 px-10 md:px-20 lg:px-40">
        <h1 className="text-white font-bold text-4xl lg:text-6xl max-w-5xl lg:leading-20 text-center">
          Comprehensive Features for Modern Security
        </h1>
        <p className="text-white font-medium text-xl text-center max-w-3xl">
          TEK1SECURITY provides a robust suite of tools designed to streamline
          every aspect of your security operations, ensuring efficiency,
          accountability, and enhanced client satisfaction.
        </p>
      </section>

      {/* Features Section */}
      <section className="flex w-full flex-col items-center gap-12 py-20 px-10 md:px-20 lg:px-40">
        <div className="text-center space-y-4 max-w-3xl">
          <h2 className="font-bold text-3xl md:text-5xl">
            Our Powerful Features
          </h2>
          <p className="text-lg">
            Discover how TEK1SECURITY can transform your security company's
            operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {tek1_full_features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-border/50 bg-background hover:border-primary/50 transition-all duration-300 flex flex-col"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-base text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex w-full flex-col items-center gap-12 py-20 px-10 md:px-20 lg:px-40 bg-secondary">
        <div className="text-center space-y-4 max-w-6xl">
          <h2 className="font-bold text-3xl md:text-5xl text-white">
            Ready to Transform Your Security Operations?
          </h2>
          <p className="text-lg text-white">
            Join leading security companies in Nigeria who are already
            experiencing the benefits of TEK1SECURITY. Start with a free trial
            or schedule a personalized demo to see the platform in action.
          </p>
        </div>
        <div className="flex items-center gap-8 text-sm font-medium">
          <Button
            variant="default"
            className="bg-primary text-white"
            size="lg"
            asChild
          >
            <Link href="/pricing">View Pricing Plans</Link>
          </Button>
          <Button
            variant="default"
            className="bg-primary text-white"
            size="lg"
            asChild
          >
            <Link href="/sign-up">Start Your Free Trial Today!</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
