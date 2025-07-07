'use client'

import { motion } from 'framer-motion'
import { Button } from '@/app/components/ui/button'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-45 from-transparent to-blue-500/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-sm font-medium text-white mb-8 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <span>🚀</span>
            <span>Digital Transformation Leader</span>
          </motion.div>
          <h1 className="text-6xl lg:text-8xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Alberto (JAG) Pascoe
          </h1>
          <p className="text-2xl text-white/80 mb-4 max-w-2xl">
            Chief Digital Executive & Strategic Technology Leader
          </p>
          <p className="text-lg text-white/70 mb-12 max-w-xl">
            25+ Years Converting Business Vision into Revenue-Generating Digital Assets
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg" onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              Start Conversation
              <motion.span 
                className="ml-2" 
                whileHover={{ x: 5 }}
              >
                &rarr;
              </motion.span>
            </Button>
            <Button variant="secondary" size="lg" onClick={() => {
              const el = document.getElementById('about');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              Learn More
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="flex-1 flex justify-center items-center min-h-[630px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative flex justify-center items-center w-full">
            <Image
              src="/images/hero-photo.jpg"
              alt="Alberto (JAG) Pascoe headshot"
              width={630}
              height={630}
              className="rounded-3xl object-cover border-4 border-white/20 bg-white/10 shadow-2xl shadow-blue-500/10 backdrop-blur-md mx-auto"
              priority
            />
            <div className="absolute inset-0 rounded-3xl pointer-events-none ring-4 ring-blue-400/30 mx-auto" aria-hidden="true"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 