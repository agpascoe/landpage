'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { timeline } from '@/lib/content'

export default function Timeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="experience" className="py-32 bg-slate-50" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block bg-blue-100 text-blue-600 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
            Experience
          </div>
          <h2 className="text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
            Executive Leadership Journey
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Quarter-century of technology leadership across Fortune 500 companies and successful ventures.
          </p>
        </div>
        <div className="max-w-3xl mx-auto relative">
          {timeline.map((item, index) => (
            <motion.div
              key={item.id}
              className="mb-16 last:mb-0 relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="absolute -left-5 top-2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-blue-500 font-bold text-sm uppercase mb-2">
                  {item.period}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  {item.title}
                </h3>
                <div className="text-slate-500 font-semibold mb-2 italic">
                  {item.company}
                </div>
                <p className="text-slate-600 max-w-2xl">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 