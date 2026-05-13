import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

export default function EnquirySection() {
  return (
    <section id="enquiry" className="section-shell">
      <SectionHeading title="Private Enquiry" subtitle="Share your sourcing requirement and our team will connect with a tailored response." />
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto grid max-w-5xl gap-4 rounded-3xl border border-white/12 bg-white/[0.03] p-6 md:grid-cols-2 md:p-10"
      >
        {/* Connect backend/email service later. */}
        {["Name", "Company Name", "Phone", "Email", "Interest", "Preferred Contact Method"].map((field) => (
          <label key={field} className="text-sm text-[var(--text-muted)]">
            {field}
            <input className="mt-2 w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 outline-none placeholder:text-[var(--text-muted)]/50 focus:border-white/35" placeholder={field} />
          </label>
        ))}
        <label className="md:col-span-2 text-sm text-[var(--text-muted)]">
          Requirement Details
          <textarea rows={3} className="mt-2 w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 outline-none placeholder:text-[var(--text-muted)]/50 focus:border-white/35" placeholder="Requirement details" />
        </label>
        <label className="md:col-span-2 text-sm text-[var(--text-muted)]">
          Message
          <textarea rows={4} className="mt-2 w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 outline-none placeholder:text-[var(--text-muted)]/50 focus:border-white/35" placeholder="Message" />
        </label>
        <button className="magnetic-btn md:col-span-2 rounded-full border border-white/20 px-7 py-3 text-sm tracking-[0.08em]">Submit Enquiry</button>
      </motion.form>
    </section>
  );
}

