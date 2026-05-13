import { motion } from 'motion/react';

const GALLERY_ITEMS = [
  "https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=2640&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1510672396091-c13289794902?q=80&w=2600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2600&auto=format&fit=crop"
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 lg:px-20 text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20"
      >
        <p className="text-amber-500 font-mono text-xs tracking-widest uppercase mb-4">Moodboard</p>
        <h1 className="text-5xl md:text-7xl font-serif italic">Visual / Inspiration</h1>
      </motion.div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {GALLERY_ITEMS.map((src, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-sm overflow-hidden border border-white/5 bg-zinc-900"
          >
            <img 
              src={src} 
              alt={`Gallery ${i}`} 
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" 
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
