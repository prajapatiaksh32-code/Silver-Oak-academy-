import { useState } from 'react';

interface SchoolEmblemProps {
  className?: string;
  framed?: boolean;
}

const LOGO_SRC =
  '/assets/aistudio/Screenshot_2026-11-21-20-13-43-084_com.whatsapp_2_79d148b8.jpg';

export function SchoolEmblem({
  className = 'w-11 h-11',
  framed = true,
}: SchoolEmblemProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`${className} rounded-xl bg-[#061329] border border-[#D4A843]/60 flex items-center justify-center text-[#E3BA59] font-display font-bold text-sm`}
        aria-hidden="true"
      >
        SOA
      </div>
    );
  }

  return (
    <div
      className={`${className} relative overflow-hidden bg-[#061329] shrink-0 ${
        framed ? 'rounded-xl ring-1 ring-[#D4A843]/55 shadow-sm' : 'rounded-lg'
      }`}
    >
      <img
        src={LOGO_SRC}
        alt="Silver Oak Academy official crest logo"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover object-[50%_38%] scale-[1.15]"
      />
    </div>
  );
}
