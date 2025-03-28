import HeroCarousel from "@/components/Explore/HeroCarousel";
import DiningSection from "@/components/Explore/DiningSection";
import ExperiencesSection from "@/components/Explore/ExperiencesSection";
import AttractionsCarousel from "@/components/Explore/AttractionsCarousel";
import GalleryPreview from "@/components/Explore/GalleryPreview";

const ExplorePage = () => {
  return (
    <main className="bg-dark text-light">
      <HeroCarousel />
      <DiningSection />
      <ExperiencesSection />
      <AttractionsCarousel />
      <GalleryPreview />
    </main>
  );
};

export default ExplorePage;
