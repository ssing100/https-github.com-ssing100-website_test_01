import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black py-20 px-6 lg:px-20 border-t border-white/5">
      <div className="max-w-[2000px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-serif italic tracking-tighter">
            LUMINA<span className="opacity-40 tracking-normal">.</span>
          </Link>
          <p className="max-w-xs text-sm text-white/40 font-light leading-relaxed">
            Minimalist studio specializing in high-end digital experiences and database architectures.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-24">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-amber-500 mb-6">Menu</p>
            <ul className="space-y-4 text-sm font-light text-white/60">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">Projects</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-amber-500 mb-6">Social</p>
            <ul className="space-y-4 text-sm font-light text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-amber-500 mb-6">Legal</p>
            <ul className="space-y-4 text-sm font-light text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="max-w-[2000px] mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-6">
        <p className="text-[10px] uppercase tracking-widest text-white/20">© 2026 LUMINA STUDIO. All Rights Reserved.</p>
        <p className="text-[10px] uppercase tracking-widest text-white/20">EST. ASIA-SOUTHEAST</p>
      </div>
    </footer>
  );
}
