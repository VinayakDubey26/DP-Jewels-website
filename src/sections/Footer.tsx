import { Camera, MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/918356810826?text=Hello%20D.P.%20Jewels%2C%20I%20am%20interested%20in%20a%20diamond%20enquiry.";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,#07101f_0%,#040816_45%,#030510_100%)] px-5 pb-12 pt-24 text-[#F8F4EC]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_8%,rgba(160,176,204,0.14)_0%,rgba(160,176,204,0)_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_86%,rgba(130,150,182,0.09)_0%,rgba(130,150,182,0)_44%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_95%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.42)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.34)_0.5px,transparent_0.5px)] [background-size:3px_3px]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <img src="/logo-white.png" alt="D.P. Jewels" className="h-[54px] w-auto object-contain opacity-95 md:h-[62px]" />
          <p className="mt-4 text-[0.66rem] tracking-[0.22em] text-slate-300/85 md:text-[0.7rem] md:tracking-[0.25em]">
            DIAMOND TRADERS • IMPORTERS • EXPORTERS
          </p>
        </div>

        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="mt-10 grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-12">
          <div className="text-center md:text-left">
            <p className="text-[0.68rem] tracking-[0.2em] text-slate-300">CONTACT</p>
            <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-200/92">
              <p>EC-4080 B, Bharat Diamond Bourse, Bandra Kurla Complex, Bandra(E), Mumbai-51</p>
              <p>022 3596 3936</p>
              <p>022 3392 3961</p>
              <p>ppsonecha@gmail.com</p>
              <p>vipuldiamons55@gmail.com</p>
            </div>
          </div>

          <div className="text-center md:text-left">
            <p className="text-[0.68rem] tracking-[0.2em] text-slate-300">SOCIAL</p>
            <div className="mt-4 flex flex-col items-center gap-4 text-sm text-slate-200 md:items-start">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-slate-200/90 transition-colors duration-500 hover:text-white">
                <Camera size={15} />
                <span>Instagram</span>
                <span className="mt-0.5 block h-px w-0 bg-white/70 transition-all duration-500 group-hover:w-8" />
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/28 bg-white/[0.04] px-5 py-2.5 text-[0.72rem] tracking-[0.14em] text-[#f8f4ec] transition-all duration-500 hover:-translate-y-[1px] hover:border-white/46 hover:bg-white/[0.09] hover:shadow-[0_10px_24px_rgba(5,10,26,0.35)]"
              >
                <MessageCircle size={15} />
                WHATSAPP ENQUIRY
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-white/18 to-transparent" />
      <p className="relative mx-auto mt-6 w-full max-w-6xl text-center text-[0.68rem] tracking-[0.14em] text-slate-300/85 md:text-left">
        © {new Date().getFullYear()} D.P. Jewels. All rights reserved.
      </p>
    </footer>
  );
}
