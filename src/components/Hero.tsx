import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import HeroContent from './HeroContent';
import HeroImage from './HeroImage';
import FloatingShapes from './FloatingShapes';
import ContactFab from './ContactFab';

export default function Hero() {
  return (
    <div id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-b from-mint-50 via-white to-bubble-50">
      {/* decorative gradient wash */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-mint-200/50 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-bubble-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-sun-200/40 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-200/30 blur-3xl" />
      </div>

      <FloatingShapes />
      <AnnouncementBar />
      <Navbar />

      {/* hero body */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-32 sm:pt-36 lg:pt-40 pb-16 lg:pb-24">
        <div className="grid items-center gap-10 lg:gap-12 lg:grid-cols-2">
          <HeroContent />
          <HeroImage />
        </div>
      </section>

      {/* wave divider */}
      <div className="relative z-10 -mt-2">
        <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" className="w-full h-16 sm:h-24">
          <path d="M0 60C180 100 360 100 540 70C720 40 900 20 1080 30C1260 40 1380 60 1440 50V100H0V60Z" fill="#ffffff" />
        </svg>
      </div>

      <ContactFab />
    </div>
  );
}
