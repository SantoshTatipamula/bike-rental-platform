import Categories from "@/components/home/Categories";
import CTA from "@/components/home/CTA";
import FeaturedBikes from "@/components/home/FeaturedBikes";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import PopularBikes from "@/components/home/PopularBikes";
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
      <CTA
        title="Start your journey today 🚀"
        description="Find the best bikes near you."
        buttonText="Explore Bikes"
        link="/bikes"
      />
    </div>
  );
};

export default Home;