import { personalInfo } from '@/lib/content'

export default function Footer() {
  return (
    <footer className="py-8 bg-slate-900 text-slate-200 text-center mt-16">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </div>
        <div className="flex gap-4 items-center justify-center">
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-400">LinkedIn</a>
          <a href={`mailto:${personalInfo.email}`} className="hover:underline text-blue-400">Email</a>
        </div>
      </div>
    </footer>
  )
} 