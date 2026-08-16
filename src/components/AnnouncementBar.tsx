import { Sparkles } from 'lucide-react';
import { ANNOUNCEMENT_TEXT } from '@/lib/constants';

export default function AnnouncementBar() {
  const items = Array.from({ length: 4 }, () => ANNOUNCEMENT_TEXT);
  return (
    <div className="relative z-40 overflow-hidden bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900">
      {/* glow accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-8 left-1/4 h-16 w-40 rounded-full bg-bubble-500/30 blur-3xl" />
        <div className="absolute -top-8 right-1/4 h-16 w-40 rounded-full bg-sun-400/30 blur-3xl" />
      </div>
      <div className="relative flex">
        <div className="flex shrink-0 animate-marquee whitespace-nowrap py-2">
          {items.map((text, i) => (
            <span
              key={i}
              className="mx-8 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/90"
            >
              <Sparkles className="h-3.5 w-3.5 text-sun-300 shrink-0" />
              {text}
            </span>
          ))}
        </div>
        <div
          className="flex shrink-0 animate-marquee whitespace-nowrap py-2"
          aria-hidden
        >
          {items.map((text, i) => (
            <span
              key={i}
              className="mx-8 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/90"
            >
              <Sparkles className="h-3.5 w-3.5 text-sun-300 shrink-0" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
