import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 lg:px-20 text-white">
      <div className="max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <p className="text-amber-500 font-mono text-xs tracking-widest uppercase mb-4">The Studio</p>
          <h1 className="text-5xl md:text-7xl font-serif italic mb-12">Lumina specializes in high-fidelity digital craftsmanship.</h1>
          <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed">
            Founded in 2026, we've spent the years refining a philosophy centered on minimalism, performance, and narrative. We don't just build websites; we design digital legacies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 py-20 border-t border-white/5">
           <div>
              <h3 className="text-sm font-mono tracking-widest uppercase text-amber-500 mb-6">Capabilities</h3>
              <ul className="space-y-4 text-xl font-serif italic">
                 <li>Brand Identity</li>
                 <li>Web Development</li>
                 <li>Database Architecture</li>
                 <li>Interactive Experiences</li>
              </ul>
           </div>
           <div>
              <h3 className="text-sm font-mono tracking-widest uppercase text-amber-500 mb-6">Location</h3>
              <p className="text-xl font-serif italic mb-1">Remote-first studio</p>
              <p className="text-white/40 font-light">Operating globally, rooted in Asia.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
