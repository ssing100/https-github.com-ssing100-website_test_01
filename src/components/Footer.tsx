import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-32 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="space-y-8 max-w-sm">
            <Link to="/" className="text-4xl font-black tracking-tighter uppercase italic">
              LUMINA.
            </Link>
            <p className="text-white/40 text-lg leading-[1.4] font-light">
               Synthesizing complex digital architecture through a brutalist lens. 
               Forging the future of human-machine interaction through high-impact design.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-32">
             <div className="space-y-6">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/30">Connect</h4>
                <ul className="space-y-3 font-bold uppercase text-[11px] tracking-widest text-white/60">
                   <li><a href="#" className="hover:pl-2 hover:text-white transition-all">Instagram</a></li>
                   <li><a href="#" className="hover:pl-2 hover:text-white transition-all">Linkedin</a></li>
                   <li><a href="#" className="hover:pl-2 hover:text-white transition-all">Twitter</a></li>
                </ul>
             </div>
             <div className="space-y-6">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/30">Navigate</h4>
                <ul className="space-y-3 font-bold uppercase text-[11px] tracking-widest text-white/60">
                   <li><Link to="/" className="hover:pl-2 hover:text-white transition-all">Home</Link></li>
                   <li><Link to="/projects" className="hover:pl-2 hover:text-white transition-all">Projects</Link></li>
                   <li><Link to="/gallery" className="hover:pl-2 hover:text-white transition-all">Gallery</Link></li>
                </ul>
             </div>
             <div className="hidden md:block space-y-6">
               <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/30">Status</h4>
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Available for hire</span>
               </div>
             </div>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-white/20">
           <p className="text-[10px] uppercase font-bold tracking-[0.3em]">
              © 2026 LUMINA DESIGN LAB
           </p>
           <div className="flex gap-12 text-[10px] uppercase font-bold tracking-widest">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
           </div>
        </div>
      </div>
    </footer>
  );
}
