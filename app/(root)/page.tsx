import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { why_tek1, tek1_features, short_testimonials, short_faqs } from "@/lib/constants";
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Home() {
  return (
    <div>

      {/* Hero Section */}
      <section className="flex w-full flex-col items-center gap-8 bg-secondary py-20 px-10 md:px-20 lg:px-40">
        <h1 className="text-white font-bold text-4xl lg:text-6xl max-w-5xl lg:leading-20 text-center">TEK1SECURITY: Modern Security<br />Management Solutions for Nigeria</h1>
        <p className="text-white font-medium text-xl text-center max-w-3xl">Empower your security operations in Lagos, and across Nigeria. Our intuitive platform streamlines guard management, incident reporting, payroll, and client communication, ensuring efficiency and accountability.</p>
        <div className="flex items-center gap-8 text-sm font-medium">
          <Button variant="default" className="bg-primary text-white" size="lg" asChild>
            <Link href="/sign-up">Sign Up Free</Link>
          </Button>
          <Button variant="default" className="bg-primary text-white" size="lg" asChild>
            <Link href="/contact">Schedule a Demo</Link>
          </Button>
        </div>
      </section>

      {/* Why Choose Tek1 Section */}
      <section className="flex w-full flex-col items-center gap-12 bg-zinc-50 dark:bg-zinc-950 py-20 px-10 md:px-20 lg:px-40">
        <div className="text-center space-y-4 max-w-3xl">
          <h2 className="font-bold text-3xl md:text-5xl text-foreground">Why Choose Tek1Security?</h2>
          <p className="text-muted-foreground">Discover the unique advantages of our platform designed specifically for the Nigerian security landscape.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
          {why_tek1.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="border-border/50 bg-background hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">{item.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="flex w-full flex-col items-center gap-12 py-20 px-10 md:px-20 lg:px-40 bg-secondary">
        <div className="text-center space-y-4 max-w-3xl">
          <h2 className="font-bold text-3xl md:text-5xl text-white">Core Platform Capabilities</h2>
          <p className="text-lg text-white">TEK1SECURITY offers a robust suite of tools designed for security companies in Nigeria.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {tek1_features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-border/50 bg-background hover:border-primary/50 transition-all duration-300 flex flex-col">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-base text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Security Excellence Section */}
      <section className="flex w-full flex-col items-start gap-12 py-20 px-10 md:px-20 lg:px-40 bg-zinc-50 dark:bg-zinc-950">
        <div className="text-start space-y-4">
          <h2 className="font-bold text-3xl md:text-5xl text-primary">Built for Security Excellence in Nigeria</h2>
          <p className="text-lg">TEK1SECURITY, developed by TEKNNUKU Inc. in Lagos, Nigeria, is specifically engineered to address the unique challenges and opportunities of the Nigerian security industry. We understand the local context and have tailored our platform to enhance efficiency, accountability, and communication for security companies operating across the nation.</p>
          <p className="text-lg">Our mission is to empower security firms, enabling them to provide superior service, manage their workforce effectively, and drive growth with a cutting-edge security management solution.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex w-full flex-col items-center gap-12 py-20 px-10 md:px-20 lg:px-40 bg-secondary">
        <div className="text-center space-y-4 max-w-6xl">
          <h2 className="font-bold text-3xl md:text-5xl text-white">Ready to Transform Your Security Operations?</h2>
          <p className="text-lg text-white">Join leading security companies in Nigeria who are already experiencing the benefits of TEK1SECURITY. Start with a free trial or schedule a personalized demo to see the platform in action.</p>
        </div>
        <div className="flex items-center gap-8 text-sm font-medium">
          <Button variant="default" className="bg-primary text-white" size="lg" asChild>
            <Link href="/pricing">View Pricing Plans</Link>
          </Button>
          <Button variant="default" className="bg-primary text-white" size="lg" asChild>
            <Link href="/sign-up">Start Your Free Trial Today!</Link>
          </Button>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="flex w-full flex-col items-center gap-12 py-20 px-10 md:px-20 lg:px-40 bg-white">
        <div className="space-y-4 max-w-3xl">
          <h2 className="font-bold text-3xl md:text-5xl">What Our Clients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl">
          {short_testimonials.map((testimonial, index) => {
            return (
              <Card key={index} className="bg-background flex flex-col border-l-4 border-l-primary hover:shadow-2xl transition-all duration-300">
                <CardContent className="flex-1">
                  <CardDescription className="text-xl font-light italic text-muted-foreground">"{testimonial.content}"</CardDescription>
                </CardContent>
                <CardFooter className="flex">
                  <CardDescription className="text-base text-secondary font-bold">{testimonial.name}</CardDescription>
                  <CardDescription className="text-base text-secondary font-bold">{testimonial.role}</CardDescription>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="flex items-center gap-8 text-sm font-medium">
          <Button variant="default" className="bg-primary text-white" size="lg" asChild>
            <Link href="/testimonials">Read More Success Stories</Link>
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="flex w-full flex-col items-center gap-12 py-20 px-10 md:px-20 lg:px-40 bg-zinc-50 dark:bg-zinc-950">
        <div className="text-center space-y-4 max-w-3xl">
          <h2 className="font-bold text-3xl md:text-5xl text-foreground">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">Find answers to common questions about TEK1SECURITY.</p>
        </div>

        <div className="w-full max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {short_faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="flex items-center gap-8 text-sm font-medium">
          <Button variant="outline" size="lg" asChild>
            <Link href="/faqs">View All FAQs</Link>
          </Button>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="flex w-full flex-col items-center gap-12 py-20 px-10 md:px-20 lg:px-40 bg-white">
        <div className="text-center space-y-4 max-w-3xl">
          <h2 className="font-bold text-3xl md:text-5xl text-foreground">Get in Touch</h2>
          <p className="text-lg text-muted-foreground">Have questions or need assistance? Reach out to our team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <div className="flex flex-col gap-10">
                <div className="flex items-center gap-2">
                  <Phone className="h-6 w-6 text-primary" />
                  <p className="text-lg font-medium">+234 80 TEK1SEC</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" />
                  <p className="text-lg font-medium">sales@tek1security.com</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  <p className="text-lg font-medium">Ikorodu, Lagos, Nigeria</p>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <Card className="w-full max-w-2xl border-border/50 bg-background hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Send us a message</CardTitle>
            <CardDescription className="text-base">We'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" required />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea id="message" placeholder="How can we help you today?" className="min-h-[150px]" required />
              </div>
              <Button type="submit" size="lg" className="w-full md:w-auto bg-primary text-white mt-2">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
            </div>
        </div>
      </section>
    </div>
  );
}
