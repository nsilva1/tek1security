import { full_testimonials } from '@/lib/constants';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const TestimonialPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 1: Hero Section */}
      <section className="flex w-full flex-col items-center gap-8 bg-secondary py-20 px-10 md:px-20 lg:px-40">
        <h1 className="text-white font-bold text-3xl lg:text-5xl max-w-5xl lg:leading-tight text-center">
          Voices of Our Valued Clients
        </h1>
        <p className="text-white font-medium text-lg text-center max-w-3xl">
          Don't just take our word for it. Hear directly from security companies
          across Nigeria who have experienced significant growth and efficiency
          with TEK1SECURITY.
        </p>
      </section>

      {/* Testimonial Cards */}
      <section className="flex w-full flex-col items-center gap-12 py-20 px-10 md:px-20 lg:px-40 bg-white">
        <div className="text-center space-y-4 max-w-3xl">
          <h2 className="font-bold text-3xl md:text-5xl">
            Real Stories, Real Results
          </h2>
          <p className="text-lg text-muted-foreground">
            Our clients' success is our greatest achievement. Here are some of
            their experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-7xl">
          {full_testimonials.map((testimonial, index) => {
            return (
              <Card
                key={index}
                className="bg-background flex flex-col border-l-4 border-l-primary hover:shadow-2xl transition-all duration-300"
              >
                <CardContent className="flex-1">
                  <CardDescription className="text-xl font-light italic text-muted-foreground">
                    "{testimonial.content}"
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <CardDescription className="text-sm md:text-base text-secondary font-bold">
                    {testimonial.name},
                  </CardDescription>
                  <CardDescription className="text-sm md:text-base text-secondary font-bold">
                    {testimonial.role}
                  </CardDescription>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex w-full flex-col items-center gap-12 py-20 px-10 md:px-20 lg:px-40 bg-secondary">
        <div className="text-center space-y-4 max-w-6xl">
          <h2 className="font-bold text-3xl md:text-5xl text-white">
            Ready to Become Our Next Success Story?
          </h2>
          <p className="text-lg text-white">
            Join the growing number of security companies in Nigeria who are
            thriving with TEK1SECURITY.
          </p>
        </div>
        <div className="flex items-center gap-8 text-sm font-medium">
          <Button
            variant="default"
            className="bg-primary text-white"
            size="lg"
            asChild
          >
            <Link href="/sign-up">Start Your Free Trial</Link>
          </Button>
          <Button
            variant="default"
            className="bg-primary text-white"
            size="lg"
            asChild
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default TestimonialPage;
