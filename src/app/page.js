


import FeaturesSection from '@/components/home/FeaturesSection';
import HeroSection from '@/components/home/HeroSection';
import ImpactGallery from '@/components/home/ImpactGallery';
import ImpactStatistics from '@/components/home/ImpactStatistics';
import Newsletter from '@/components/home/Newsletter';
import UpcomingEvents from '@/components/home/UpcommingEvent';



const page = () => {
  return (
    <main>
      <HeroSection />
      <ImpactStatistics /> 
      <FeaturesSection />
     
      <UpcomingEvents />
      <ImpactGallery />
      <Newsletter />
      
    </main>
  );
};

export default page;