import { MapPin, Phone } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { SchoolEmblem } from './SchoolEmblem';

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Academics', href: '#academics' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'Contact Us', href: '#contact' },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#061329] text-[#FAF7F0] border-t border-[#D4A843]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* School Identity */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3.5">
              <SchoolEmblem className="w-14 h-14" />
              <div>
                <p className="font-display text-xl font-bold tracking-tight text-[#FAF7F0]">
                  {SCHOOL_INFO.name}
                </p>
                <p className="text-sm text-[#E3BA59] font-medium">
                  {SCHOOL_INFO.tagline}
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm text-[#FAF7F0]/80 leading-relaxed max-w-md">
              {SCHOOL_INFO.heroValues}. Offering quality school education from{' '}
              <strong className="text-[#FAF7F0] font-semibold">{SCHOOL_INFO.classes}</strong>{' '}
              ({SCHOOL_INFO.curriculum}).
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#E3BA59]">
              Quick Links
            </h3>
            <ul className="mt-4 grid grid-cols-2 md:grid-cols-1 gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#FAF7F0]/85 hover:text-[#E3BA59] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* School Address & Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#E3BA59]">
              School Office &amp; Address
            </h3>
            <div className="mt-4 space-y-4 text-sm text-[#FAF7F0]/85">
              <p className="font-semibold text-[#FAF7F0]">
                Classes: {SCHOOL_INFO.classes}
              </p>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E3BA59] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{SCHOOL_INFO.fullAddress}</span>
              </div>

              <div className="space-y-2">
                {SCHOOL_INFO.phones.map((phone) => (
                  <div key={phone.display} className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#E3BA59] shrink-0" aria-hidden="true" />
                    <a
                      href={phone.tel}
                      className="text-[#FAF7F0] hover:text-[#E3BA59] transition-colors font-medium tabular-nums"
                    >
                      {phone.display}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#FAF7F0]/70">
          <p>
            &copy; {currentYear} {SCHOOL_INFO.displayName}. All rights reserved.
          </p>
          <p>
            {SCHOOL_INFO.classes} · {SCHOOL_INFO.curriculum} · Lohardaga, Jharkhand
          </p>
        </div>
      </div>
    </footer>
  );
}
