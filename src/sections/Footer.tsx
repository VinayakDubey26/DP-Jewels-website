export default function Footer() {
  return (
    <footer className="border-t border-slate-700 bg-[linear-gradient(180deg,rgba(15,23,42,0.94),rgba(7,17,31,0.98))] px-5 py-10 text-slate-100">
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-4">
        <div>
          <p className="font-serif text-xl tracking-[0.2em]">D.P. JEWELS</p>
          <p className="mt-2 text-xs tracking-[0.12em] text-slate-300">DIAMOND TRADERS, IMPORTERS & EXPORTERS</p>
        </div>
        <div>
          <p className="text-xs tracking-[0.12em] text-slate-300">Navigation</p>
          <div className="mt-3 space-y-2 text-sm text-slate-300">
            <a href="#our-story" className="block">OUR STORY</a>
            <a href="#operations" className="block">OPERATIONS</a>
            <a href="#sustainability" className="block">SUSTAINABILITY</a>
            <a href="#media" className="block">MEDIA</a>
          </div>
        </div>
        <div>
          <p className="text-xs tracking-[0.12em] text-slate-300">Contact</p>
          <div className="mt-3 space-y-2 text-sm text-slate-300">
            <p>022 3596 3936</p>
            <p>ppsonecha@gmail.com</p>
            <p>vipuldiamons55@gmail.com</p>
          </div>
        </div>
        <div>
          <p className="text-xs tracking-[0.12em] text-slate-300">Social</p>
          <div className="mt-3 space-y-2 text-sm text-slate-300">
            <p>LinkedIn (Placeholder)</p>
            <p>Instagram (Placeholder)</p>
            <p>YouTube (Placeholder)</p>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-8 w-full max-w-6xl border-t border-slate-700 pt-4 text-xs tracking-[0.1em] text-slate-300">© {new Date().getFullYear()} D.P. Jewels. All rights reserved.</p>
    </footer>
  );
}
