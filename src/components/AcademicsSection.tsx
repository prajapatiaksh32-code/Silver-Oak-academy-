import { ArrowUpRight, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { ACADEMIC_STAGES } from '../data/schoolData';

interface AcademicsSectionProps {
  onSelectClassForEnquiry: (classOption: string) => void;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function AcademicsSection({ onSelectClassForEnquiry }: AcademicsSectionProps) {
  return (
    <section id="academics" className="py-16 sm:py-24 bg-[#FAF7F0] border-y border-[#E6DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#B88B2E]">
            Academics
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0D244D] text-balance">
            Structured Learning from Nursery to Class VIII
          </h2>
          <p className="mt-4 text-base text-slate-700 leading-relaxed">
            Our academic programme is based on the CBSE curriculum and thoughtfully paced across four developmental stages—building joyful curiosity in early childhood and confident analytical readiness through Middle School.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {ACADEMIC_STAGES.map((stage, idx) => (
            <motion.article
              key={stage.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.42, delay: idx * 0.07, ease: EASE_OUT }}
              className="bg-white rounded-2xl border border-[#E6DEC8] shadow-sm p-6 sm:p-8 flex flex-col justify-between transition-shadow duration-200 hover:shadow-md hover:border-[#D4A843]/60"
            >
              <div>
                <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <span>
                    <span className="text-[#B88B2E] tabular-nums mr-1.5">{stage.index}.</span>
                    {stage.stageLabel}
                  </span>
                  <span className="text-[#0D244D] whitespace-nowrap">{stage.classes}</span>
                </div>

                <h3 className="mt-3 font-display text-2xl font-bold text-[#0D244D]">
                  {stage.title}
                </h3>

                <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  {stage.summary}
                </p>

                <ul className="mt-5 pt-5 border-t border-slate-100 space-y-2.5">
                  {stage.focusPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed"
                    >
                      <BookOpen
                        className="w-4 h-4 text-[#15356B] shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Based on CBSE Curriculum</span>
                <button
                  type="button"
                  onClick={() => onSelectClassForEnquiry(stage.defaultClassOption)}
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#0D244D] hover:text-[#B88B2E] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D244D] rounded-sm"
                >
                  <span>Enquire for {stage.title}</span>
                  <ArrowUpRight
                    className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
