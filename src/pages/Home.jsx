import About from "../components/Landing/About"
import Amenities from "../components/Landing/Amenities"
import ApartmentPlans from "../components/Landing/ApartmentPlans"
import FeatureListings from "../components/Landing/FeatureListings"
import Hero from "../components/Landing/Hero"
import OurServices from "../components/Landing/OurServices"

const Home = () => {
  return (
    <div>
        <Hero/>
        <About/>
        <OurServices/>
        <FeatureListings/>
        <ApartmentPlans/>
        <Amenities/>
    </div>
  )
}

export default Home