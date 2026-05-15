import { Camera, MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/918356810826?text=Hello%20D.P.%20Jewels%2C%20I%20am%20interested%20in%20a%20diamond%20enquiry.";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#050505] px-5 py-20 text-[#F8F4EC]">
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="flex justify-start">
          <img src="/logo-white.png" alt="D.P. Jewels" className="h-[56px] w-auto object-contain md:h-[64px]" />
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-xs tracking-[0.12em] text-slate-300">Contact</p>
            <div className="mt-3 space-y-2 text-sm text-slate-200">
              <p>EC-4080 B, Bharat Diamond Bourse, Bandra Kurla Complex, Bandra(E), Mumbai-51</p>
              <p>022 3596 3936</p>
              <p>022 3392 3961</p>
              <p>ppsonecha@gmail.com</p>
              <p>vipuldiamons55@gmail.com</p>
            </div>
          </div>
          <div>
            <p className="text-xs tracking-[0.12em] text-slate-300">Social</p>
            <div className="mt-3 space-y-3 text-sm text-slate-200">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <Camera size={16} /> Instagram
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="relative mx-auto mt-8 w-full max-w-6xl border-t border-white/10 pt-4 text-xs tracking-[0.1em] text-slate-300">© {new Date().getFullYear()} D.P. Jewels. All rights reserved.</p>
    </footer>
  );
}
