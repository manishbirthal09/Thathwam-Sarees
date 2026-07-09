import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import HeroSection from './pages/Herosection'
import FeaturedCollections from './pages/Featuredcollections'
import BrandStory from './pages/Brandstory'
import Footer from './pages/Footer'
import FeaturedProducts from './pages/Featuredproducts'
import InstagramFeed from './pages/Instagramfeed'
import Navbar from './pages/Navbar'
import AnnouncementBar from './pages/AnnouncementBar'
import USPSlider from './pages/USPSlider'

function App() {
  

  return (
    <>
    <AnnouncementBar />
     <Navbar /> 
     <HeroSection /> 
     <FeaturedCollections /> 
     <FeaturedProducts />
     <BrandStory /> 
     
     <InstagramFeed />
     <USPSlider />
     <Footer /> 
    </>
  )
}

export default App
