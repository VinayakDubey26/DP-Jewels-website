import { Camera, MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/919819156358?text=Hello%20D.P.%20Jewels%2C%20I%20am%20interested%20in%20a%20diamond%20enquiry.";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-600/40 bg-[linear-gradient(160deg,#07111F,#0F172A_55%,#111827)] px-5 py-12 text-[#F8F4EC]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(203,213,225,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,225,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-4">
        <div>
          <p className="font-serif text-xl tracking-[0.2em]">D.P. JEWELS</p>
          <p className="mt-2 text-xs tracking-[0.12em] text-slate-300">DIAMOND TRADERS, IMPORTERS & EXPORTERS</p>
        </div>
        <div>
          <p className="text-xs tracking-[0.12em] text-slate-300">Navigation</p>
          <div className="mt-3 space-y-2 text-sm text-slate-200">
            <a href="#our-story" className="block">OUR STORY</a>
            <a href="#operations" className="block">OPERATIONS</a>
            <a href="#sustainability" className="block">SUSTAINABILITY</a>
            <a href="#media" className="block">MEDIA</a>
          </div>
        </div>
        <div>
          <p className="text-xs tracking-[0.12em] text-slate-300">Contact</p>
          <div className="mt-3 space-y-2 text-sm text-slate-200">
            <p>022 3596 3936</p>
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
      <p className="relative mx-auto mt-8 w-full max-w-6xl border-t border-slate-600/40 pt-4 text-xs tracking-[0.1em] text-slate-300">© {new Date().getFullYear()} D.P. Jewels. All rights reserved.</p>
    </footer>
  );
}
