import { Button } from "@/components/ui/button";
import Link from "next/link";

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
            <Link href="/demo">Schedule a Demo</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
