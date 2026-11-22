import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  type GalleryCategory,
} from '../data/schoolData';
import { ResilientImage } from './ResilientImage';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    selectedCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const activeLightboxItem =
    lightboxIndex !== null && filteredItems[lightboxIndex]
      ? filteredItems[lightboxIndex]
      : null;

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredItems.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, filteredItems.length]);

  const handleCategoryChange = (category: GalleryCategory) => {
    setSelectedCategory(category);
    setLightboxIndex(null);
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#B88B2E]">
              School Gallery
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0D244D] text-balance">
              Moments of Learning, Culture &amp; Community
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore our school campus photographs alongside classrooms, student activities, cultural programmes, sports, and celebrations.
            </p>
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Gallery Categories"
          className="mt-8 flex flex-wrap gap-2 p-1.5 bg-[#FAF7F0] border border-[#E6DEC8] rounded-xl w-full lg:w-fit"
        >
          {GALLERY_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => handleCategoryChange(category)}
                className={`relative px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0D244D] ${
                  isActive
                    ? 'bg-[#0D244D] text-[#FAF7F0] shadow-sm'
                    : 'text-slate-700 hover:text-[#0D244D] hover:bg-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Animated Gallery Grid */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.button
                layout
                key={item.id}
                type="button"
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.28, ease: EASE_OUT }}
                onClick={() => setLightboxIndex(idx)}
                className="group text-left bg-white rounded-2xl border border-[#E6DEC8] shadow-sm overflow-hidden transition-shadow duration-200 hover:shadow-md hover:border-[#D4A843]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D244D] cursor-pointer"
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden ${
                    item.isWideBanner
                      ? 'bg-[#061329] flex items-center justify-center p-3'
                      : 'bg-[#061329]'
                  }`}
                >
                  {item.isWideBanner ? (
                    <div className="relative aspect-[3.45/1] w-full overflow-hidden rounded-lg ring-1 ring-[#D4A843]/40">
                      <ResilientImage
                        src={item.src}
                        alt={item.alt}
                        title={item.title}
                        className={`${
                          item.imgClassName || 'w-full h-full object-cover'
                        } transition-transform duration-300 group-hover:scale-[1.06]`}
                      />
                    </div>
                  ) : (
                    <ResilientImage
                      src={item.src}
                      alt={item.alt}
                      title={item.title}
                      className={`${
                        item.imgClassName || 'w-full h-full object-cover'
                      } transition-transform duration-300 group-hover:scale-[1.07]`}
                    />
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#061329]/0 group-hover:bg-[#061329]/30 transition-colors duration-200 flex items-center justify-center"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F0] text-[#0D244D] text-xs font-semibold shadow-sm">
                      <Expand className="w-3.5 h-3.5" aria-hidden="true" />
                      View Photo
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#B88B2E]">
                    {item.category}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-[#0D244D]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Animated Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && lightboxIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activeLightboxItem.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#061329]/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
              className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#D4A843]/40"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E6DEC8] bg-[#FAF7F0]">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                  <span className="font-semibold text-[#0D244D]">
                    {activeLightboxItem.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">
                    {lightboxIndex + 1} of {filteredItems.length}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close image preview"
                  className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-[#0D244D] hover:bg-[#E6DEC8]/60 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative bg-[#061329] aspect-[4/3] sm:aspect-[16/10] max-h-[68vh] w-full flex items-center justify-center overflow-hidden">
                {activeLightboxItem.isWideBanner ? (
                  <div className="w-full px-4 sm:px-8">
                    <div className="aspect-[3.45/1] w-full overflow-hidden rounded-xl ring-1 ring-[#D4A843]/40">
                      <ResilientImage
                        src={activeLightboxItem.src}
                        alt={activeLightboxItem.alt}
                        title={activeLightboxItem.title}
                        loading="eager"
                        className={activeLightboxItem.imgClassName || 'w-full h-full object-cover'}
                      />
                    </div>
                  </div>
                ) : (
                  <ResilientImage
                    src={activeLightboxItem.src}
                    alt={activeLightboxItem.alt}
                    title={activeLightboxItem.title}
                    loading="eager"
                    className={
                      activeLightboxItem.imgClassName || 'w-full h-full object-contain'
                    }
                  />
                )}

                {filteredItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous photograph"
                      onClick={() =>
                        setLightboxIndex(
                          (lightboxIndex - 1 + filteredItems.length) %
                            filteredItems.length
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#FAF7F0]/95 hover:bg-white text-[#0D244D] shadow-md flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next photograph"
                      onClick={() =>
                        setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#FAF7F0]/95 hover:bg-white text-[#0D244D] shadow-md flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="px-6 py-4 bg-white border-t border-[#E6DEC8]">
                <h3 className="font-display text-lg font-bold text-[#0D244D]">
                  {activeLightboxItem.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {activeLightboxItem.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
