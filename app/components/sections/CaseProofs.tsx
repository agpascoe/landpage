'use client'

import { motion } from 'framer-motion'
import { caseProofs } from '@/lib/content'

export default function CaseProofs() {
  return (
    <section className="py-24 bg-white" id="case-proofs">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-600 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
            Selected Case Proofs
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
            Scope, Role, Results
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {caseProofs.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm font-semibold text-blue-600 mb-3">{item.scope}</p>
              <p className="text-slate-700 leading-relaxed">{item.result}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
