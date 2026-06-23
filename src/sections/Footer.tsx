const WHATSAPP_LINK = "https://wa.me/918356810826?text=Hello%20D.P.%20Jewels%2C%20I%20am%20interested%20in%20a%20diamond%20enquiry.";

export default function Footer() {
  return (
    <footer data-theme="dark" className="relative overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,#081225_0%,#040816_45%,#030510_100%)] px-5 pb-12 pt-20 text-[#F8F4EC]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_8%,rgba(160,176,204,0.14)_0%,rgba(160,176,204,0)_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_86%,rgba(130,150,182,0.09)_0%,rgba(130,150,182,0)_44%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_95%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.42)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.34)_0.5px,transparent_0.5px)] [background-size:3px_3px]" />

      <div className="relative mx-auto w-full max-w-[1320px]">
        <div className="grid items-start gap-11 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col items-center justify-center text-center">
            <img src="/logo-white.png" alt="D.P. Jewels diamond sourcing logo" width={292} height={94} loading="lazy" decoding="async" className="h-[90px] w-auto object-contain opacity-95 md:h-[104px]" />
          </div>

          <div className="grid gap-10 text-center md:grid-cols-[1fr_auto] md:items-start md:gap-10 md:text-left">
            <div className="md:justify-self-center">
              <p className="text-[12px] tracking-[0.18em] text-slate-200/95">CONTACT</p>
              <div className="mt-4 space-y-2 text-[16px] leading-relaxed text-slate-100/95 md:text-[16px]">
                <p>EC-4080 B, Bharat Diamond Bourse, Bandra Kurla Complex, Bandra(E), Mumbai-51</p>
                <p>022 3596 3936</p>
                <p>022 3392 3961</p>
                <p>ppsonecha@gmail.com</p>
              </div>
            </div>

            <div className="md:justify-self-center">
              <p className="text-[12px] tracking-[0.18em] text-slate-200/95">SOCIAL</p>
              <div className="mt-4 flex items-center justify-center gap-4 md:justify-start">
                <a href="https://instagram.com/dpjewelsandco" aria-label="Instagram" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/24 p-2.5 text-white transition-all duration-[250ms] hover:-translate-y-0.5 hover:opacity-80">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm8.5 1.8h-8.5A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.2-2.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
                  </svg>
                </a>
                <a
                  href={WHATSAPP_LINK}
                  aria-label="WhatsApp"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/24 p-2.5 text-white transition-all duration-[250ms] hover:-translate-y-0.5 hover:opacity-80"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M19.11 4.89A9.86 9.86 0 0 0 12.06 2C6.64 2 2.22 6.42 2.22 11.84c0 1.74.45 3.44 1.31 4.95L2 22l5.36-1.49a9.8 9.8 0 0 0 4.69 1.2h.01c5.42 0 9.84-4.42 9.84-9.84a9.78 9.78 0 0 0-2.79-6.98Zm-7.05 15.2h-.01a8.1 8.1 0 0 1-4.12-1.13l-.3-.18-3.18.88.85-3.1-.2-.32a8.13 8.13 0 0 1-1.24-4.4c0-4.48 3.64-8.13 8.12-8.13 2.17 0 4.2.84 5.73 2.38a8.05 8.05 0 0 1 2.39 5.74c0 4.48-3.65 8.13-8.14 8.13Zm4.46-6.1c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.94-1.17-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.79-.2-.47-.39-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.08 3.6.57.25 1.02.4 1.37.52.58.18 1.1.15 1.51.09.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.03.14-1.13-.06-.1-.22-.16-.46-.28Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 h-px w-full max-w-[1320px] bg-gradient-to-r from-transparent via-white/18 to-transparent" />
      <p className="relative mx-auto mt-6 w-full max-w-[1320px] text-center text-[12px] tracking-[0.12em] text-slate-100 md:text-left">
        © {new Date().getFullYear()} D.P. Jewels. All rights reserved.
      </p>
    </footer>
  );
}
