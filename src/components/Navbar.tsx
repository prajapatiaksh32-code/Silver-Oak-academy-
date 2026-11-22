import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { SchoolEmblem } from './SchoolEmblem';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Academics', href: '#academics' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'Contact Us', href: '#contact' },
] as const;

interface NavbarProps {
  onEnquiryClick: () => void;
}

export function Navbar({ onEnquiryClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('#home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);

      const sections = NAV_LINKS.map((link) => ({
        href: link.href,
        el: document.querySelector(link.href),
      }));

      const scrollMid = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const item = sections[i];
        if (item.el instanceof HTMLElement && item.el.offsetTop <= scrollMid) {
          setActiveHash(item.href);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-shadow duration-200 bg-[#061329]/95 backdrop-blur-md border-b border-[#D4A843]/25 ${
        isScrolled ? 'shadow-md shadow-[#061329]/25' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Official Crest Logo + Single-line Wordmark */}
        <a
          href="#home"
          className="group flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E3BA59] rounded-md"
        >
          <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.18 }}>
            <SchoolEmblem className="w-11 h-11" />
          </motion.div>
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#FAF7F0] group-hover:text-[#E3BA59] transition-colors whitespace-nowrap shrink-0">
            Silver Oak Academy
          </span>
        </a>

        {/* Zone 2: Clean Single-Line Navigation Links with Gliding Active Underline */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#FAF7F0]/85"
        >
          {NAV_LINKS.map((item) => {
            const isActive = activeHash === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E3BA59] rounded-sm ${
                  isActive
                    ? 'text-[#E3BA59] font-semibold'
                    : 'text-[#FAF7F0]/85 hover:text-[#E3BA59]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    aria-hidden="true"
                    transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#D4A843] rounded-full"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onEnquiryClick}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-[#061329] bg-[#E3BA59] hover:bg-[#D4A843] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF7F0]"
          >
            Admission Enquiry
          </motion.button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#FAF7F0] hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E3BA59]"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t border-white/10 bg-[#061329] px-4 py-4 shadow-xl"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => {
                const isActive = activeHash === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#0D244D] text-[#E3BA59] font-semibold'
                        : 'text-[#FAF7F0]/90 hover:bg-white/5 hover:text-[#E3BA59]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <div className="pt-3 mt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onEnquiryClick();
                  }}
                  className="w-full py-3 px-4 rounded-lg bg-[#E3BA59] hover:bg-[#D4A843] text-[#061329] text-sm font-semibold transition-colors cursor-pointer"
                >
                  Admission Enquiry
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
