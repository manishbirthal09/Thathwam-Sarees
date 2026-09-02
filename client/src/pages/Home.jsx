import { useState } from 'react'


import HeroSection from './Herosection'


import FeaturedProducts from './Featuredproducts'
import InstagramFeed from './Instagramfeed'

import USPSlider from './USPSlider'

function Home() {
  

  return (
    <>
    
     <HeroSection /> 
     
     <FeaturedProducts />
     
     
     <InstagramFeed />
     <USPSlider />
      
    </>
  )
}

export default Home
