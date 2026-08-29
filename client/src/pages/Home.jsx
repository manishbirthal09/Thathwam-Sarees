import { useState } from 'react'


import HeroSection from './Herosection'

import Footer from './Footer'
import FeaturedProducts from './Featuredproducts'
import InstagramFeed from './Instagramfeed'
import Navbar from './Navbar'
import AnnouncementBar from './AnnouncementBar'
import USPSlider from './USPSlider'

function Home() {
  

  return (
    <>
    <AnnouncementBar />
     <Navbar /> 
     <HeroSection /> 
     
     <FeaturedProducts />
     
     
     <InstagramFeed />
     <USPSlider />
     <Footer /> 
    </>
  )
}

export default Home
