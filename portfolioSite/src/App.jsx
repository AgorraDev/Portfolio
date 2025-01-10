import { useState } from 'react'
import './App.css'
import Gallery from './components/gallery'
import Navigation from './components/navigation'
import Contact from './components/contact'
import About from './components/about'

function App() {

  return (
    <>
    <div className='wrapper'>
      <section id='hero-container'>
        <div className='my-info'>
          <ul>
            <li>Hagen Annan</li>
            <li className='animate-text-change'>Web Designer</li>
            <li className='working'>//Available for work</li>
          </ul>
        </div>
        <Navigation />
      </section>
        <Contact />
        <Gallery />
        <About />
      </div>
    </>
  )
}

export default App
