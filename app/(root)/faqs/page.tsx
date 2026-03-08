import Link from 'next/link';
import { Button } from '@/components/ui/button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { full_faqs } from '@/lib/constants';

const FaqPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
        {/* Section 1: Hero Section */}
            <section className="flex w-full flex-col items-center gap-8 bg-secondary py-20 px-10 md:px-20 lg:px-40">
                <h1 className="text-white font-bold text-3xl lg:text-5xl max-w-5xl lg:leading-tight text-center">
                    Frequently Asked Questions
                </h1>
                <p className="text-white font-medium text-lg text-center max-w-3xl">
                   Find quick answers to your questions about TEK1SECURITY. If you don't find what you're looking for, feel free to contact our support team.
                </p>
            </section>

            {/* FAQs */}
            <section className="flex w-full flex-col items-center gap-12 py-20 px-10 md:px-20 lg:px-40 bg-zinc-50 dark:bg-zinc-950">
        

        <div className="w-full max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {full_faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        
      </section>


        {/* CTA Section */}
      <section className="flex w-full flex-col gap-12 py-20 px-10 md:px-20 lg:px-40 bg-slate-200">
        <div className="space-y-4 max-w-6xl">
          <h2 className="font-bold text-3xl md:text-5xl">Still Have Questions?</h2>
          <p className="text-lg">Our dedicated support team is here to help. Reach out to us for personalized assistance.</p>
        </div>
        <div className="flex items-center gap-8 text-sm font-medium">
          <Button variant="default" className="bg-secondary text-white" size="lg" asChild>
            <Link href="/sign-up">Start Your Free Trial</Link>
          </Button>
          <Button variant="default" className="bg-primary text-secondary" size="lg" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default FaqPage