import { motion } from 'motion/react';
import { Cpu, Palette, Globe, Award } from 'lucide-react';

const skills = [
  { icon: Palette, title: "Art Direction", description: "Crafting unique visual identities and cohesive brand systems that stand out." },
  { icon: Cpu, title: "UI/UX Strategy", description: "Designing intuitive interfaces grounded in user psychology and interaction logic." },
  { icon: Globe, title: "Web Technologies", description: "Building high-performance, responsive applications using modern frameworks." },
];

export default function About() {
  return (
    <div className="pt-[150px] pb-32">
      {/* Disclaimer Banner */}
      <div className="max-w-7xl mx-auto px-8 mb-20">
        <div className="bg-white/5 border border-white/10 p-4 text-[10px] uppercase tracking-[0.4em] text-white/40 text-center">
          Note: This is a placeholder portfolio showcase. All content is for demonstration purposes.
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-12 mb-12">
           <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            className="text-[10px] uppercase tracking-[0.5em] font-black mb-6"
          >
            The Persona / 05
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[60px] md:text-[100px] font-black tracking-tighter leading-[0.9] uppercase"
          >
            Driven by <br />
            <span className="text-stroke italic">Curiosity.</span>
          </motion.h1>
        </div>

        <div className="lg:col-span-7 space-y-12">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-2xl font-light leading-relaxed text-white/80">
              I am a multidisciplinary designer and developer based in Brooklyn. With over 6 years of experience, I bridge the gap between complex digital architecture and aesthetic minimalism.
            </p>
            <p className="text-lg text-white/50 leading-relaxed font-light">
              My work is defined by a rigorous attention to detail and a commitment to functional clarity. I believe that every digital touchpoint should not only look beautiful but serve a clear, purpose-driven objective.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/10">
            <div>
               <h3 className="text-[10px] uppercase font-black tracking-widest mb-6 opacity-30">Our Philosophy</h3>
               <p className="text-sm leading-relaxed text-white/60">
                 We don't just build websites; we create digital environments. Environments that respond, engage, and elevate the standard of the modern web.
               </p>
            </div>
            <div>
               <h3 className="text-[10px] uppercase font-black tracking-widest mb-6 opacity-30">Recognition</h3>
               <div className="flex gap-4">
                  <Award className="w-5 h-5 text-white/40" />
                  <p className="text-sm italic font-medium">Winner of the International Design Excellence Award 2024</p>
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8">
           {skills.map((skill, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.1 * idx }}
               viewport={{ once: true }}
               className="p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
             >
                <skill.icon className="w-8 h-8 mb-6 text-white/30 group-hover:text-white transition-colors" />
                <h4 className="text-xl font-bold uppercase mb-2">{skill.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed">{skill.description}</p>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Experience Timeline Style snippet */}
      <section className="mt-40 bg-[#F5F5F5] text-[#0A0A0A] py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.4em] font-black mb-12 opacity-50">Milestones / 06</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { year: "2021-26", role: "Creative Lead", company: "Lumina Labs" },
              { year: "2018-21", role: "Senior Designer", company: "Orbit Interactive" },
              { year: "2015-18", role: "UI Intern", company: "Visual Syntax" }
            ].map((exp, idx) => (
              <div key={idx} className="border-l-2 border-black/10 pl-8 py-4">
                <span className="text-[10px] font-black tracking-widest mb-2 block opacity-40">{exp.year}</span>
                <h5 className="text-2xl font-black uppercase tracking-tighter">{exp.role}</h5>
                <p className="text-sm font-medium opacity-60 italic">{exp.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
