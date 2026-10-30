


import FeaturesSection from '@/components/home/FeaturesSection';
import HeroSection from '@/components/home/HeroSection';
import ImpactGallery from '@/components/home/ImpactGallery';
import UpcomingEvents from '@/components/home/Upcomming-Event';



const page = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
     
      <UpcomingEvents />
      <ImpactGallery />
      
    </div>
  );
};

export default page;