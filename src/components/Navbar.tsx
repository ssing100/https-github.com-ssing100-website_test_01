import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 h-[100px] flex items-center">
      <div className="max-w-7xl mx-auto px-8 w-full flex justify-between items-end">
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-white/50 mb-1">Portfolio 2026</p>
          <Link to="/" className="text-3xl font-black tracking-tighter uppercase text-[#F5F5F5]">
            LUMINA.
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12 pb-1">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative ${
                location.pathname === link.path ? 'text-white border-b-2 border-white pb-1' : 'text-white/40 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-white/50 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-[#0A0A0A] z-[60] flex flex-col items-center justify-center gap-10"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-10 right-8 text-white/50">
              <X className="w-8 h-8" />
            </button>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-5xl font-black tracking-tighter uppercase text-white hover:text-stroke transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
