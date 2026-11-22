import { useState } from 'react';
import { MotionConfig, motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { AcademicsSection } from './components/AcademicsSection';
import { PhilosophySection } from './components/PhilosophySection';
import { GallerySection } from './components/GallerySection';
import { AdmissionsSection } from './components/AdmissionsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

export default function App() {
  const [preselectedClass, setPreselectedClass] = useState<string>('Nursery');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollToAdmissions = (classOption?: string) => {
    if (classOption) {
      setPreselectedClass(classOption);
    }
    const target = document.getElementById('admissions');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-slate-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#0D244D] focus:text-white focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>

        <Navbar onEnquiryClick={() => scrollToAdmissions()} />

        {/* Subtle GPU-composited scroll progress indicator */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX }}
          className="fixed top-16 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4A843] via-[#E3BA59] to-[#D4A843] origin-left z-40 pointer-events-none"
        />

        <main id="main-content" className="flex-1">
          <HeroSection />
          <AboutSection />
          <AcademicsSection
            onSelectClassForEnquiry={(classOption) => scrollToAdmissions(classOption)}
          />
          <PhilosophySection />
          <GallerySection />
          <AdmissionsSection preselectedClass={preselectedClass} />
          <ContactSection />
        </main>

        <Footer />
        <BackToTop />
      </div>
    </MotionConfig>
  );
}
