import CustomerTestimonials from "@/components/CustomerTestimonials";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import Navigation from "@/components/Navigation";
import NowTrending from "@/components/NowTrending";
import TalkToUs from "@/components/TalkToUs";

export default function Home() {
  return (
    <Navigation>
      <HomeBanner />
      <HomeCategories />
      <NowTrending />
      <CustomerTestimonials />
      <TalkToUs />



    </Navigation>
  );
}
