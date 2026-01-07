import HeroSection from '@/components/sections/HeroSection'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import Categories from '@/components/sections/Categories'
import BrandStory from '@/components/sections/BrandStory'
import Testimonials from '@/components/sections/Testimonials'
import Newsletter from '@/components/sections/Newsletter'

export default function Home() {
  return (
    <div className="space-y-16 md:space-y-24">
      <HeroSection />
      <FeaturedProducts />
      <Categories />
      <BrandStory />
      <Testimonials />
      <Newsletter />
    </div>
  )
}