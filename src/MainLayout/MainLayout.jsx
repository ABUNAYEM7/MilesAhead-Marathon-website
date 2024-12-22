import React from 'react'
import Navbar from '../components/Shared/Navbar'
import Footer from '../components/Shared/Footer'
import { Outlet } from 'react-router-dom'
import Banner from '../components/Banner/Banner'

const MainLayout = () => {
  return (
    <div className='max-w-screen-2xl mx-auto border-2'>
      <header>
        <nav>
        <Navbar/>
        </nav>
      </header>
      <main className='min-h-screen border-2 border-black'>
        <Outlet/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default MainLayout
