import { Mail, MessageCircle, Phone } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

export default function ContactSection() {
  return (
    <section id="contact" className="section-shell pb-24">
      <SectionHeading title="Contact" subtitle="Private, direct communication for international buyer enquiries." />
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1.2fr_1fr]">
        <article className="rounded-3xl border border-white/12 bg-white/[0.03] p-7">
          <p className="leading-relaxed text-[var(--text-muted)]">
            EC-4080 B, Bharat Diamond Bourse,<br />
            Bandra Kurla Complex,<br />
            Bandra(E), Mumbai-51
          </p>
          <div className="mt-5 space-y-2 text-[var(--text-muted)]">
            <p>Tel: 022 3596 3936</p>
            <p>QBC: 022 3392 3961</p>
            <p>ppsonecha@gmail.com</p>
            <p>vipuldiamons55@gmail.com</p>
            <p>WhatsApp: +91 98191 56358</p>
          </div>
        </article>
        <article className="rounded-3xl border border-white/12 bg-white/[0.03] p-7">
          <div className="flex flex-col gap-3">
            <a href="tel:02235963936" className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm"><Phone size={16} /> Call Office</a>
            <a href="mailto:ppsonecha@gmail.com" className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm"><Mail size={16} /> Email Enquiry</a>
            <a href="https://wa.me/919819156358" className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm"><MessageCircle size={16} /> WhatsApp Enquiry</a>
          </div>
        </article>
      </div>
    </section>
  );
}

