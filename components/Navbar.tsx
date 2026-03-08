import Image from 'next/image';
import Link from 'next/link';
import { navbar_items } from '@/lib/constants';
import brandLogo from '@/images/tek1-logo-transparent.png';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="w-full bg-secondary">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={brandLogo}
            alt="Tek1Security Logo"
            width={150}
            height={50}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navbar_items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="transition-colors hover:text-white/80 text-white"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <Button
            variant="default"
            className="bg-primary text-white"
            size="lg"
            asChild
          >
            <Link href="/sign-up">Sign Up Free</Link>
          </Button>
          <Button
            variant="default"
            className="bg-primary text-white"
            size="lg"
            asChild
          >
            <Link href="/contact">Schedule a Demo</Link>
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5 text-white" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 my-8 p-6">
                {navbar_items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block px-2 py-1 text-lg"
                  >
                    {item.title}
                  </Link>
                ))}
                <Button
                  variant="default"
                  className="bg-primary text-white"
                  size="lg"
                  asChild
                >
                  <Link href="/sign-up">Sign Up Free</Link>
                </Button>
                <Button
                  variant="default"
                  className="bg-primary text-white"
                  size="lg"
                  asChild
                >
                  <Link href="/contact">Schedule a Demo</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
