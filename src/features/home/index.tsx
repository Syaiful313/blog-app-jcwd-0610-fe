import BlogList from "./components/BlogList";
import HeroSection from "./components/HeroSection";

const HomePage = () => {
  return (
    <main className="container mx-auto px-4">
      <HeroSection />
      <BlogList />
    </main>
  );
};

export default HomePage;
