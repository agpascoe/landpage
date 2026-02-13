'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { ventures } from '@/lib/content'

export default function Ventures() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="py-32 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-slate-50 text-blue-500 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
            Ventures
          </div>
          <h2 className="text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
            Strategic Ventures
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Leading innovation across PropTech, AI/ML, and FinTech sectors with proven track record of scaling ventures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ventures.map((venture, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl p-10 border border-slate-200 relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -12 }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-400"></div>
              
              {/* Logo image */}
              <div className={`${venture.id === 'keryu' ? 'w-28 h-28' : 'w-24 h-24'} flex items-center justify-center mb-6 rounded-2xl ${
                venture.id === 'data-intelligence-factory' ? 'bg-[#0a2342]' : ''
              }`}>
                {venture.logo ? (
                  <Image
                    src={venture.logo}
                    alt={venture.title + ' logo'}
                    width={venture.id === 'keryu' ? 112 : 96}
                    height={venture.id === 'keryu' ? 112 : 96}
                    className={`object-contain rounded-2xl ${
                      venture.id === 'keryu' ? 'w-full h-full' : 'w-full h-full bg-white shadow-md border border-slate-100'
                    }`}
                  />
                ) : (
                  <span className="text-white font-bold text-xl">{venture.icon}</span>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {venture.title}
              </h3>
              
              <p className="text-blue-500 font-semibold text-sm uppercase tracking-wide mb-4">
                {venture.role}
              </p>
              
              <p className="text-slate-600 leading-relaxed">
                {venture.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 