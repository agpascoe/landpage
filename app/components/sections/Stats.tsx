'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { stats } from '@/lib/content'

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Group stats by perspective
  const groupedStats = stats.reduce((acc, stat) => {
    if (!acc[stat.perspective]) {
      acc[stat.perspective] = []
    }
    acc[stat.perspective].push(stat)
    return acc
  }, {} as Record<string, typeof stats>)

  const perspectives = ['Financial', 'Client', 'Process', 'Capabilities']

  return (
    <section className="py-32 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block bg-blue-100 text-blue-600 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
            Professional ScoreCard
          </div>
          <h2 className="text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
            Strategic Performance Metrics
          </h2>
        </div>

        <div className="space-y-12">
          {perspectives.map((perspective, perspectiveIndex) => (
            <motion.div
              key={perspective}
              className="bg-slate-50 rounded-3xl p-8"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: perspectiveIndex * 0.1 }}
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                {perspective}
              </h3>
              <div className="flex justify-center">
                <div className={`grid gap-6 justify-items-center ${
                  groupedStats[perspective]?.length === 1 
                    ? 'grid-cols-1' 
                    : groupedStats[perspective]?.length === 2 
                    ? 'grid-cols-1 md:grid-cols-2' 
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {groupedStats[perspective]?.map((stat, index) => (
                    <motion.div
                      key={`${perspective}-${index}`}
                      className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 min-h-[160px] w-full max-w-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: (perspectiveIndex * 0.1) + (index * 0.1) }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-4xl font-extrabold text-blue-500 mb-3 leading-none">
                        {stat.number}
                      </div>
                      <div className="text-slate-600 font-semibold uppercase tracking-wide text-sm">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 