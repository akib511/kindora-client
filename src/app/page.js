


import FeaturesSection from '@/components/home/FeaturesSection';
import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import ImpactGallery from '@/components/home/ImpactGallery';
import ImpactStatistics from '@/components/home/ImpactStatistics';
import Newsletter from '@/components/home/Newsletter';
import OurMission from '@/components/home/OurMission ';

import UpcomingEvents from '@/components/home/UpcommingEvent';



const page = () => {
  return (
    <main>
      <HeroSection />
      <ImpactStatistics /> 
      <FeaturesSection />
      <UpcomingEvents />
      <HowItWorks />
      <ImpactGallery />
       <OurMission />
      <Newsletter />
      
    </main>
  );
};

export default page;