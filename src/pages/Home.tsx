import { motion } from 'motion/react';
import { ArrowUpRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-amber-500 selection:text-black">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center px-6 lg:px-20 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <p className="text-amber-500 font-mono text-sm tracking-[0.4em] uppercase mb-6">Innovative Design & Development</p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light leading-none mb-8">
            LUMINA <br />
            <span className="italic text-white/40">STUDIO</span>
          </h1>
          <p className="max-w-xl text-lg text-white/60 mb-12 font-light leading-relaxed">
            Crafting digital experiences that merge sophisticated aesthetics with data-driven functionality. Exploring the boundaries between art and code.
          </p>
          
          <div className="flex flex-wrap gap-6">
            <Link 
              to="/projects" 
              className="group flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              View Work
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Abstract Background Element */}
        <div className="absolute right-[-10%] top-[20%] w-[60%] h-[60%] border border-white/5 rounded-full blur-3xl opacity-30 pointer-events-none" />
      </section>

      {/* Featured Project Teaser */}
      <section className="py-32 px-6 lg:px-20 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
          <div>
            <p className="text-amber-500 font-mono text-xs tracking-widest uppercase mb-4">Latest Release</p>
            <h2 className="text-4xl md:text-5xl font-serif italic text-white">Car Database System</h2>
          </div>
          <Link to="/registry" className="text-sm uppercase tracking-widest text-white/40 hover:text-amber-500 transition-colors mt-6 md:mt-0 underline underline-offset-8">
            Explore System
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-video bg-zinc-900 rounded-sm overflow-hidden border border-white/10 group cursor-pointer"
        >
           <Link to="/registry" className="absolute inset-0 z-10" />
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
           <div className="absolute bottom-10 left-10">
              <h3 className="text-2xl font-serif mb-2">Vehicle Asset Manager</h3>
              <p className="text-sm text-white/60 font-light max-w-md">A sophisticated inventory management system built with real-time Firebase synchronization and administrative access controls.</p>
           </div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-zinc-950 px-6 lg:px-20">
        <div className="max-w-4xl">
          <p className="text-amber-500 font-mono text-xs tracking-widest uppercase mb-12">Our Philosophy</p>
          <p className="text-3xl md:text-5xl font-serif font-light leading-snug">
            We believe that <span className="text-amber-500 italic">complexity</span> should never compromise <span className="opacity-40">elegance</span>. Every line of code is a brushstroke in a larger digital canvas.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 lg:px-20 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-7xl font-serif italic mb-12">Start a conversation.</h2>
        <a href="mailto:hello@lumina.com" className="text-2xl md:text-3xl font-light hover:text-amber-500 transition-colors border-b border-white/20 pb-4">
          hello@lumina.com
        </a>
        
        <div className="flex gap-8 mt-20">
          <Twitter className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
          <Github className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
          <Linkedin className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
        </div>
      </section>
    </div>
  );
}
