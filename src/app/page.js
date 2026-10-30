


import FeaturesSection from '@/components/home/FeaturesSection';
import HeroSection from '@/components/home/HeroSection';
import ImpactGallery from '@/components/home/ImpactGallery';
import Newsletter from '@/components/home/Newsletter';
import UpcomingEvents from '@/components/home/Upcomming-Event';



const page = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
     
      <UpcomingEvents />
      <ImpactGallery />
      <Newsletter />
      
    </div>
  );
};

export default page;