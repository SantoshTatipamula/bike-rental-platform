import Categories from "@/components/home/Categories";
import CTA from "@/components/home/CTA";
import FeaturedBikes from "@/components/home/FeaturedBikes";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import PopularBikes from "@/components/home/PupularBikes";
import WhyChoose from "@/components/home/WhyChoose";

const Home = () => {
  return (
    <div >
      <HeroSection />
      <WhyChoose/>
      <Categories/>
      <FeaturedBikes/>
      <PopularBikes/>
      <HowItWorks/>
      <CTA/>
    </div>
  );
};

export default Home;