'use client'

import { motion } from 'framer-motion'
import { executiveProof } from '@/lib/content'

export default function ExecutiveProof() {
  return (
    <section className="py-24 bg-white" id="executive-proof">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-600 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
            Executive Proof Snapshot
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
            Evidence at a Glance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {executiveProof.map((item, index) => (
            <motion.div
              key={index}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <p className="text-slate-700 leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
