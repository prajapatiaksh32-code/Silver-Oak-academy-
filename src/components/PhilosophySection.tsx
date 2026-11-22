import { motion } from 'motion/react';
import { PHILOSOPHY_PILLARS, SCHOOL_INFO } from '../data/schoolData';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="py-16 sm:py-24 bg-gradient-to-b from-[#061329] to-[#0D244D] text-[#FAF7F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-12 border-b border-[#D4A843]/25"
        >
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E3BA59]">
              Our Educational Philosophy
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF7F0] text-balance">
              Why Choose Silver Oak Academy?
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-[#FAF7F0]/85 leading-relaxed">
              Guided by our vision—<span className="text-[#E3BA59] font-medium">&ldquo;{SCHOOL_INFO.tagline}&rdquo;</span>—every aspect of school life is shaped around six core educational principles that guide our teaching and student development.
            </p>
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {PHILOSOPHY_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.06, ease: EASE_OUT }}
              className="pt-5 border-t border-[#D4A843]/25 hover:border-[#E3BA59]/75 transition-colors duration-200 flex flex-col"
            >
              <span className="font-display text-2xl font-bold text-[#E3BA59] tabular-nums">
                {pillar.index}.
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-[#FAF7F0] tracking-tight">
                {pillar.title}
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-[#FAF7F0]/80 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
