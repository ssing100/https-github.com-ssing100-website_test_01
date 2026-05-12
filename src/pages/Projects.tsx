import { motion } from 'motion/react';
import { Filter } from 'lucide-react';
import { useState } from 'react';

const projects = [
  {
    title: "EcoSphere Web",
    category: "Brand Design",
    year: "2024",
    image: "https://picsum.photos/seed/eco/1200/800",
  },
  {
    title: "Cipher Crypto",
    category: "Fintech",
    year: "2023",
    image: "https://picsum.photos/seed/cipher/1200/800",
  },
  {
    title: "Vantage Real Estate",
    category: "UI/UX",
    year: "2024",
    image: "https://picsum.photos/seed/vantage/1200/800",
  },
  {
    title: "Orbit SaaS App",
    category: "Product",
    year: "2023",
    image: "https://picsum.photos/seed/orbit/1200/800",
  }
];

const categories = ["All", "Brand Design", "Fintech", "UI/UX", "Product"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-[150px] pb-20 px-8 max-w-7xl mx-auto min-h-screen">
      <header className="mb-32">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="text-[10px] uppercase tracking-[0.5em] font-black mb-6"
        >
          Work Archive / 02
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[60px] md:text-[100px] font-black tracking-tighter leading-[0.9] uppercase"
        >
          Selected <br />
          <span className="text-stroke">Works.</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-8 items-center border-t border-white/10 mt-16 pt-10"
        >
          <Filter className="w-4 h-4 text-white/30" />
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 ${
                activeCategory === cat 
                  ? "text-white border-b-2 border-white pb-1" 
                  : "text-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
        {filteredProjects.map((project, idx) => (
          <motion.article 
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group flex flex-col pt-12 border-t border-white/5"
          >
             <div className="text-[10px] uppercase tracking-widest text-white/30 mb-8 font-bold flex justify-between">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
            
            <div className="aspect-[16/10] overflow-hidden bg-[#1A1A1A] border border-white/10 p-2 grayscale group-hover:grayscale-0 transition-all duration-700">
               <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
            </div>
            
            <div className="mt-8">
               <h2 className="text-4xl font-black uppercase tracking-tighter group-hover:italic group-hover:pl-4 transition-all">{project.title}</h2>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
