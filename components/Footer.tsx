import Link from 'next/link';
import { navbar_items } from '@/lib/constants';
import Image from 'next/image';
import brandLogo from '@/images/tek1-logo-transparent.png';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About Section */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={brandLogo}
                alt="Tek1Security Logo"
                width={200}
                height={50}
                className="object-contain"
                priority
              />
            </Link>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Providing cutting-edge security management solutions to empower
              security companies in Nigeria and beyond. Built by TEKNNUKU Inc.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-primary text-xl font-bold">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {navbar_items
                .filter((item) => item.title !== 'Contact Us')
                .map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm md:text-base"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col gap-4">
            <h3 className="text-primary text-xl font-bold">Legal</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-gray-300 text-sm">
            Powered by{' '}
            <span className="text-primary font-bold">TEKNNUKU Inc.</span>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            © {new Date().getFullYear()} TEK1SECURITY. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
