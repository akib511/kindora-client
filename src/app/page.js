


import FeaturesSection from '@/components/home/FeaturesSection';
import HeroSection from '@/components/home/HeroSection';
import ImpactGallery from '@/components/home/ImpactGallery';
import Newsletter from '@/components/home/Newsletter';
import UpcomingEvents from '@/components/home/Upcomming-Event';



const page = () => {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
     
      <UpcomingEvents />
      <ImpactGallery />
      <Newsletter />
      
    </main>
  );
};

export default page;