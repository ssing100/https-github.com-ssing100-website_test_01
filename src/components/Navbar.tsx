import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
  { name: 'Registry', path: '/registry' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 lg:px-20 py-8 ${
          scrolled ? 'bg-black/80 backdrop-blur-md py-6 border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[2000px] mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-serif italic tracking-tighter hover:text-amber-500 transition-colors">
            LUMINA<span className="opacity-40 tracking-normal">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-[10px] uppercase tracking-[0.3em] font-medium transition-colors hover:text-amber-500 ${
                  location.pathname === link.path ? 'text-amber-500' : 'text-white/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button 
            onClick={() => setIsOpen(true)}
            className="md:hidden text-white/60 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="text-xl font-serif italic">LUMINA</span>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.path}
                >
                  <Link 
                    to={link.path}
                    className="text-4xl font-serif italic hover:text-amber-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-20 border-t border-white/10">
               <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">Get in touch</p>
               <a href="mailto:hello@lumina.com" className="text-xl font-light">hello@lumina.com</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
