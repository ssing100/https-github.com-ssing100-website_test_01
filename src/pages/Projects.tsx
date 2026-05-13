import { motion } from 'motion/react';
import { ArrowUpRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const PROJECTS = [
  {
    title: "Vehicle Records Database",
    category: "Fullstack / Database",
    description: "A secure inventory management system with real-time sync and administrative roles.",
    link: "/registry",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2600&auto=format&fit=crop"
  },
  {
    title: "Minimalist E-Commerce",
    category: "UI/UX / Frontend",
    description: "A focus on negative space and typography for a premium shopping experience.",
    link: "#",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2600&auto=format&fit=crop"
  },
  {
    title: "Lumina Brand Identity",
    category: "Graphic Design",
    description: "Conceptual brand system exploring geometric forms and monochromatic palettes.",
    link: "#",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2564&auto=format&fit=crop"
  },
  {
    title: "Architectural Visualizer",
    category: "3D / WebGL",
    description: "Interactive browser-based visualization of minimalist spatial structures.",
    link: "#",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2600&auto=format&fit=crop"
  }
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 lg:px-20 text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20"
      >
        <p className="text-amber-500 font-mono text-xs tracking-widest uppercase mb-4">Selected Works</p>
        <h1 className="text-5xl md:text-7xl font-serif italic">Archive / 2026</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {PROJECTS.map((project, index) => (
          <motion.div 
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="relative aspect-[4/3] bg-zinc-900 rounded-sm overflow-hidden mb-6 border border-white/5">
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <Link to={project.link} className="absolute inset-0 z-10" />
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-amber-500 mb-2">{project.category}</p>
                <h3 className="text-2xl font-serif italic mb-3 group-hover:text-amber-500 transition-colors">{project.title}</h3>
                <p className="text-sm text-white/40 font-light max-w-sm">{project.description}</p>
              </div>
              <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
