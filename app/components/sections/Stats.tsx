'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { stats } from '@/lib/content'

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="py-32 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center text-center p-10 bg-white rounded-3xl border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 min-h-[180px]"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl font-extrabold text-blue-500 mb-3 leading-none">
                {stat.number}
              </div>
              <div className="text-slate-600 font-semibold uppercase tracking-wide text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 