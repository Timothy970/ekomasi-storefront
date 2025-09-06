import CustomerTestimonials from "@/components/CustomerTestimonials";
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
      <NowTrending />
      <CustomerTestimonials />
      <TalkToUs />
      <MothersDayBundle />
      <OurPartners />
    </Navigation>
  );
}
