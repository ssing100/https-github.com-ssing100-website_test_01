import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, X } from 'lucide-react';
import { useState } from 'react';

const galleryItems = [
  { id: 1, src: "https://picsum.photos/seed/arch/800/1200", title: "Minimalist Structure" },
  { id: 2, src: "https://picsum.photos/seed/tech/1200/800", title: "Future Interface" },
  { id: 3, src: "https://picsum.photos/seed/light/800/800", title: "Geometric Light" },
  { id: 4, src: "https://picsum.photos/seed/nature/800/1200", title: "Organic Textures" },
  { id: 5, src: "https://picsum.photos/seed/vibe/1200/800", title: "Atmospheric Flow" },
  { id: 6, src: "https://picsum.photos/seed/urban/800/800", title: "Urban Symmetry" },
  { id: 7, src: "https://picsum.photos/seed/abstract/1200/800", title: "Visual Depth" },
  { id: 8, src: "https://picsum.photos/seed/dark/800/1200", title: "Conceptual Dark" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  return (
    <div className="pt-[150px] pb-20 px-8 max-w-7xl mx-auto min-h-screen">
      <header className="mb-32">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="text-[10px] uppercase tracking-[0.5em] font-black mb-6"
        >
          Visual Feed / 03
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[60px] md:text-[100px] font-black tracking-tighter leading-[0.9] uppercase"
        >
          Artistic <br />
          <span className="text-stroke">Experiments.</span>
        </motion.h1>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {galleryItems.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group relative cursor-pointer aspect-square bg-[#1A1A1A] border border-white/10 p-1 grayscale hover:grayscale-0 transition-all overflow-hidden"
            onClick={() => setSelectedImage(item)}
          >
            <img 
              src={item.src} 
              alt={item.title} 
              className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-8 h-8 text-white" />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0A] flex items-center justify-center p-8 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-10 right-10 text-white/50 hover:text-white">
              <X className="w-10 h-10" />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-4xl w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                className="max-w-full max-h-[70vh] object-contain border border-white/10 p-2"
                referrerPolicy="no-referrer"
              />
              <p className="mt-12 text-3xl font-black uppercase tracking-tighter italic">{selectedImage.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
