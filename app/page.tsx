import CustomerTestimonials from "@/components/CustomerTestimonials";
import FlashDeals from "@/components/FlashDeals";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import MothersDayBundle from "@/components/MothersDayBundle";
import Navigation from "@/components/Navigation";
import NowTrending from "@/components/NowTrending";
import OurPartners from "@/components/OurPartners";
import TalkToUs from "@/components/TalkToUs";

export default function Home() {
  return (
    <Navigation>
      <HomeBanner />
      <HomeCategories />
      <div className="px-[1rem] lg:px-[3rem] max-w-[90rem] mx-auto w-full">
        <NowTrending title="Now Trending" />
      </div>

      <div className="px-[1rem] lg:px-[3rem] max-w-[90rem] mx-auto w-full">
        <FlashDeals title="Flash Sales" />
      </div>
      
      <CustomerTestimonials />
      <TalkToUs />
      <MothersDayBundle />
      <OurPartners />
    </Navigation>
  );
}
