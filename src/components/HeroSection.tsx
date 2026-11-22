import { motion } from 'motion/react';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { ResilientImage } from './ResilientImage';
import { SchoolEmblem } from './SchoolEmblem';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[600px] lg:min-h-[680px] flex flex-col justify-between overflow-hidden bg-[#061329]"
    >
      {/* Full-bleed Campus Background with Subtle Ambient Drift & Deep Midnight Navy Scrim */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.06, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE_OUT }}
          className="w-full h-full"
        >
          <ResilientImage
            src="/src/assets/images/campus_hero_1795322046795.jpg"
            alt="Silver Oak Academy campus architecture and sunlit green courtyard"
            title="Silver Oak Academy"
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#061329]/95 via-[#0D244D]/88 to-[#15356B]/68"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#061329]/95 via-transparent to-[#061329]/45"
        />
      </div>

      {/* Hero Primary Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-14 pb-12 sm:pt-20 sm:pb-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05, ease: EASE_OUT }}
              className="text-xs sm:text-sm font-medium tracking-wider uppercase text-[#E3BA59] mb-4"
            >
              {SCHOOL_INFO.classes}
              <span className="mx-2 text-[#FAF7F0]/45" aria-hidden="true">
                ·
              </span>
              {SCHOOL_INFO.curriculum}
              <span className="mx-2 text-[#FAF7F0]/45" aria-hidden="true">
                ·
              </span>
              Lohardaga, Jharkhand
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease: EASE_OUT }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F0] leading-[1.08] text-balance"
            >
              {SCHOOL_INFO.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
              className="mt-4 font-display italic text-xl sm:text-2xl lg:text-3xl text-[#E3BA59] font-medium"
            >
              &ldquo;{SCHOOL_INFO.tagline}&rdquo;
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.26, ease: EASE_OUT }}
              className="mt-4 text-base sm:text-lg text-[#F3EBD8] font-medium tracking-wide"
            >
              {SCHOOL_INFO.heroValues}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.32, ease: EASE_OUT }}
              className="mt-5 text-sm sm:text-base text-[#FAF7F0]/85 max-w-2xl leading-relaxed"
            >
              Dedicated to nurturing curious young minds from Nursery to Class VIII with strong academic foundations, thoughtful guidance, and enduring moral values.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.38, ease: EASE_OUT }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#admissions"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#E3BA59] hover:bg-[#D4A843] text-[#061329] text-sm sm:text-base font-semibold shadow-sm transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E3BA59]"
              >
                <span>Enroll Now</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg border border-[#D4A843]/55 bg-[#061329]/45 hover:bg-[#0D244D]/80 text-[#FAF7F0] text-sm sm:text-base font-semibold backdrop-blur-sm transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF7F0]"
              >
                Contact Us
              </motion.a>
            </motion.div>
          </div>

          {/* Official School Crest Showcase on Desktop with Gentle Ambient Float */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.25, ease: EASE_OUT }}
            className="hidden lg:flex lg:col-span-4 justify-end"
          >
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.03 }}
              className="p-5 rounded-2xl bg-[#061329]/85 border border-[#D4A843]/45 shadow-2xl shadow-[#061329]/60 backdrop-blur-sm"
            >
              <SchoolEmblem className="w-56 h-56" framed={false} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Clean Operational Utility Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="relative z-10 border-t border-[#D4A843]/25 bg-[#061329]/90 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm text-[#FAF7F0]/85">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#E3BA59] shrink-0" aria-hidden="true" />
            <span>{SCHOOL_INFO.fullAddress}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1.5 text-[#E3BA59] font-medium">
              <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              Admissions &amp; Enquiries:
            </span>
            {SCHOOL_INFO.phones.map((phone, idx) => (
              <span key={phone.display} className="inline-flex items-center gap-4">
                <a
                  href={phone.tel}
                  className="font-medium text-[#FAF7F0] hover:text-[#E3BA59] transition-colors tabular-nums whitespace-nowrap"
                >
                  {phone.display}
                </a>
                {idx === 0 && (
                  <span className="text-white/30" aria-hidden="true">
                    /
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
