'use client'

import { motion } from 'framer-motion'
import { about } from '@/lib/content'

export default function About() {
  return (
    <section id="about" className="py-32 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block bg-slate-100 text-blue-500 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
            About
          </div>
          <h2 className="text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
            {about.sectionTitle}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {about.sectionDescription}
          </p>
        </div>
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-16 items-stretch min-h-[630px]">
          <motion.div
            className="flex flex-col justify-center text-2xl text-slate-700 space-y-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {about.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>
          <motion.div
            className="grid gap-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {about.skills.map((skill, i) => (
              <div key={i} className="p-6 bg-white border-l-4 border-blue-500 rounded-xl font-semibold text-slate-900 shadow-sm hover:translate-x-2 transition">
                {skill}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 