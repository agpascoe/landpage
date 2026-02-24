'use client'

import { motion } from 'framer-motion'
import { Button } from '@/app/components/ui/button'
import Image from 'next/image'
import { personalInfo } from '@/lib/content'

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
          className="flex-[1.25]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-6 leading-[1.05] tracking-tight">
            {personalInfo.title}
          </h1>

          <p className="text-xl text-white/80 mb-4 max-w-2xl">
            {personalInfo.tagline}
          </p>

          <p className="text-lg text-white/70 mb-6 max-w-2xl">
            {personalInfo.name}
          </p>

          <p className="text-white/75 mb-4 max-w-2xl">
            25+ years | up to 1500+ professionals led | large-scale AI/ML, payments, mortgage,
            insurance, and platform transformations.
          </p>

          <ul className="text-white/75 mb-10 max-w-2xl space-y-2 list-disc pl-6">
            <li>
              <span className="font-semibold text-white/90">Enterprise scale:</span> 30M+ people enabled via pension platform access and high-volume payment ecosystems.
            </li>
            <li>
              <span className="font-semibold text-white/90">Execution discipline:</span> flagship programs delivered on time and budget with continuity and governance controls.
            </li>
            <li>
              <span className="font-semibold text-white/90">Transformation leadership:</span> cross-industry execution across leading financial institutions, global consulting firms, and ventures.
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.open('/resume/Jag-Pascoe-Resume.pdf', '_blank', 'noopener,noreferrer')}
            >
              Download Resume (PDF)
              <motion.span className="ml-2" whileHover={{ x: 5 }}>
                &rarr;
              </motion.span>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const el = document.getElementById('contact')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Start Conversation
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const el = document.getElementById('about')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Learn More
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="flex-[0.75] flex justify-center items-center min-h-[630px]"
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
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none ring-4 ring-blue-400/30 mx-auto"
              aria-hidden="true"
            ></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
