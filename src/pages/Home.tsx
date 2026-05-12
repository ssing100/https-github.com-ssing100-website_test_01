import { motion } from 'motion/react';
import { Mail, Github, Linkedin, ExternalLink, ChevronRight, Send } from 'lucide-react';
import { useState, FormEvent } from 'react';

const projects = [
  {
    title: "Aura Architecture",
    category: "Web Design",
    image: "https://picsum.photos/seed/aura/800/600",
    description: "A minimalist digital experience for a modern architectural firm."
  },
  {
    title: "Nova Dashboard",
    category: "Software",
    image: "https://picsum.photos/seed/nova/800/600",
    description: "Complex data visualization simplified into an intuitive interface."
  },
  {
    title: "Pulse Mobile",
    category: "App Development",
    image: "https://picsum.photos/seed/pulse/800/600",
    description: "A high-performance health tracking app built for speed."
  }
];

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! This is a demo form.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F5]">
      {/* Disclaimer */}
      <div className="fixed top-[100px] left-0 w-full z-40 px-8 py-2 bg-white/5 backdrop-blur-sm border-b border-white/5 text-[9px] uppercase tracking-[0.5em] text-white/30 text-center">
        Portfolio Display Case / This website is a development placeholder for demonstration purposes.
      </div>

      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col pt-[100px]">
        <div className="flex-1 grid grid-cols-12 gap-0">
          <div className="col-span-12 lg:col-span-8 border-r border-white/10 flex flex-col justify-center px-8 lg:px-20 relative min-h-[500px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-12 left-8 lg:left-20 text-[10px] uppercase tracking-[0.4em] text-white/30"
            >
              Introduction / 01
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[80px] md:text-[120px] font-black leading-[0.85] uppercase tracking-tighter mb-8"
            >
              Digital<br />
              <span className="text-stroke">Experience</span><br />
              Designer.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-md text-xl font-light leading-relaxed text-white/70"
            >
              Focusing on brutalist aesthetics and functional clarity for modern brands across the globe.
            </motion.p>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col">
            <div className="p-8 border-b border-white/10 flex-1 bg-white/5">
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-8">Selected Projects / 02</div>
              <ul className="space-y-6">
                {projects.map((project, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="group cursor-pointer"
                  >
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-bold uppercase transition-all group-hover:italic group-hover:pl-2">{project.title}</span>
                      <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{project.category}</span>
                    </div>
                    <div className="h-[1px] w-0 bg-white group-hover:w-full transition-all duration-500 mt-2 opacity-50"></div>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="p-8 flex-1">
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-8">Gallery Preview / 03</div>
              <div className="grid grid-cols-3 gap-3">
                {[1,2,3,4,5,6].map((i) => (
                  <div key={i} className="aspect-square bg-[#1A1A1A] border border-white/10 hover:border-white/40 transition-colors p-1 group overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/p${i}/300/300`} 
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Contact Footer Area Replacement Style */}
      <section className="bg-[#F5F5F5] text-[#0A0A0A] grid grid-cols-12 items-stretch min-h-[300px]">
        <div className="col-span-12 lg:col-span-3 border-r border-black/10 p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <h4 className="text-[10px] uppercase font-black tracking-[0.4em] mb-4">Contact / 04</h4>
            <p className="mt-2 font-black text-2xl uppercase tracking-tighter">hello@lumina.com</p>
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] font-black mt-8">Brooklyn, New York</div>
        </div>
        <div className="col-span-12 lg:col-span-9 p-8 lg:p-12 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col border-b border-black/20 pb-4">
              <label className="text-[9px] uppercase font-black tracking-[0.4em] mb-3">Your Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="JOHN DOE" 
                className="bg-transparent outline-none text-xl placeholder:text-black/20 font-black uppercase tracking-tighter"
              />
            </div>
            <div className="flex flex-col border-b border-black/20 pb-4">
              <label className="text-[9px] uppercase font-black tracking-[0.4em] mb-3">Email Address</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="JOHN@EMAIL.COM" 
                className="bg-transparent outline-none text-xl placeholder:text-black/20 font-black uppercase tracking-tighter"
              />
            </div>
            <button className="bg-[#0A0A0A] text-white uppercase text-xs font-black tracking-[0.4em] py-6 hover:bg-black/80 transition-all active:scale-[0.98]">
              Send Inquiry
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
