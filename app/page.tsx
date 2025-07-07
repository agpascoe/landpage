import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import Stats from './components/sections/Stats'
import Ventures from './components/sections/Ventures'
import Timeline from './components/sections/Timeline'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Ventures />
        <Timeline />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
