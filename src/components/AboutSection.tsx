import { motion } from 'motion/react';
import { SCHOOL_INFO, SCHOOL_PHOTOS } from '../data/schoolData';
import { ResilientImage } from './ResilientImage';

const KEY_FOUNDATIONS = [
  {
    label: 'Academic Scope',
    value: 'Nursery to Class VIII',
    detail: 'Structured progression based on the CBSE curriculum.',
  },
  {
    label: 'Core Ethos',
    value: 'Discipline & Moral Values',
    detail: 'Respect, integrity, and responsible conduct in daily school life.',
  },
  {
    label: 'Learning Spirit',
    value: 'Creativity & Curiosity',
    detail: 'Encouraging students to question, explore, and express with confidence.',
  },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Editorial Narrative Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#B88B2E]">
              About Our School
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0D244D] text-balance">
              Welcome to Silver Oak Academy
            </h2>

            <div className="mt-6 space-y-4 text-slate-700 text-base leading-relaxed">
              <p>
                A child&apos;s early and middle school years lay the cornerstone for lifelong learning, character, and confidence. At{' '}
                <strong className="font-semibold text-[#0D244D]">Silver Oak Academy</strong>, located at{' '}
                {SCHOOL_INFO.fullAddress}, we are committed to providing quality education that balances sound academic development with creativity, discipline, and strong moral values.
              </p>
              <p>
                Offering structured schooling from{' '}
                <strong className="font-semibold text-[#0D244D]">Nursery to Class VIII</strong>{' '}
                based on the <strong className="font-semibold text-[#0D244D]">CBSE curriculum</strong>, our approach focuses on conceptual clarity, thoughtful guidance, and active student participation—empowering every learner to grow intellectually, socially, and ethically.
              </p>
            </div>

            {/* Clean Hairline-Separated Foundations */}
            <dl className="mt-8 border-t border-slate-200 divide-y divide-slate-200">
              {KEY_FOUNDATIONS.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: 0.08 * idx, ease: EASE_OUT }}
                  className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-baseline"
                >
                  <dt className="sm:col-span-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {item.label}
                  </dt>
                  <dd className="sm:col-span-8">
                    <span className="block text-sm font-semibold text-[#0D244D]">
                      {item.value}
                    </span>
                    <span className="block text-sm text-slate-600 mt-0.5">
                      {item.detail}
                    </span>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>

          {/* Real Silver Oak Academy Campus Photography Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
            className="lg:col-span-6 flex flex-col gap-5"
          >
            {/* Primary Real Campus Building Photo */}
            <figure className="group flex-1 flex flex-col">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E6DEC8] shadow-sm bg-[#061329]">
                <ResilientImage
                  src={SCHOOL_PHOTOS.buildingExterior}
                  alt="Silver Oak Academy campus building and Assembly Stage at Mahadev Ashram Path, Lohardaga"
                  title="Silver Oak Academy Campus"
                  className="w-full h-full object-cover object-[50%_48%] scale-[1.05] transition-transform duration-500 group-hover:scale-[1.09]"
                />
              </div>
              <figcaption className="mt-2.5 text-xs text-slate-500 italic">
                Silver Oak Academy school building and assembly stage at Mahadev Ashram Path, Lohardaga.
              </figcaption>
            </figure>

            {/* Secondary Real School Courtyard Photo */}
            <figure className="group flex flex-col">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#E6DEC8] shadow-sm bg-[#061329]">
                <ResilientImage
                  src={SCHOOL_PHOTOS.courtyardHall}
                  alt="Silver Oak Academy courtyard hall displaying CBSE curriculum banner"
                  title="Silver Oak Academy Courtyard"
                  className="w-full h-full object-cover object-[50%_49%] scale-[1.06] transition-transform duration-500 group-hover:scale-[1.1]"
                />
              </div>
              <figcaption className="mt-2.5 text-xs text-slate-500 italic">
                Inside the Silver Oak Academy courtyard hall showcasing student activities and assemblies.
              </figcaption>
            </figure>
          </motion.div>
        </div>

        {/* Full-Width Official School Banner Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="mt-14 pt-12 border-t border-[#E6DEC8]"
        >
          <div className="rounded-2xl overflow-hidden border border-[#D4A843]/45 shadow-md bg-[#061329] p-2 sm:p-3">
            <div className="relative aspect-[3.45/1] w-full overflow-hidden rounded-xl">
              <ResilientImage
                src={SCHOOL_PHOTOS.officialBanner}
                alt="Silver Oak Academy official banner — Transforming Learners into Leaders, Nursery to Class VIII, Based on CBSE Curriculum"
                title="Silver Oak Academy Official Banner"
                className="w-full h-full object-cover object-[50%_47%] scale-[1.03]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
