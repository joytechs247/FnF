import HeroSection from '@/components/sections/HeroSection'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import Categories from '@/components/sections/Categories'
import BrandStory from '@/components/sections/BrandStory'
import Testimonials from '@/components/sections/Testimonials'
import Newsletter from '@/components/sections/Newsletter'
import TrustStrip from '@/components/sections/TrustStrip'
import MidLifestyleBanner from '@/components/sections/MidLifestyleBanner'
import LimitedDropBanner from '@/components/sections/LimitedDropBanner'


import { getNewProducts } from '@/lib/products'


export default async function Home() {

  const newProducts = await getNewProducts(4)

  
  return (
    <div className="space-y-5">
      <HeroSection />
      <FeaturedProducts products={newProducts}/>
      <TrustStrip />
      <FeaturedProducts products={newProducts}/>
      <LimitedDropBanner />
      <FeaturedProducts products={newProducts}/>
      <Categories />
      <MidLifestyleBanner />
      <FeaturedProducts products={newProducts}/>
      <BrandStory />
      <FeaturedProducts products={newProducts}/>
      <Testimonials />
      <FeaturedProducts products={newProducts}/>
      {/* <Newsletter /> */}
    </div>
  )
}