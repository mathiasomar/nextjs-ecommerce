import Container from "@/components/container";
import Features from "@/components/features";
import ProductListing from "@/components/product-listing";
import HeroSection from "@/components/sections/hero-section";
import SectionHeader from "@/components/sections/section-header";
import { Separator } from "@/components/ui/separator";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <div className="">
      {/* Hero Section */}
      <HeroSection />
      <Features />

      {/* Latest products */}
      <section className="py-2 md:py-4 w-full h-auto">
        <Container>
          <SectionHeader
            title="Check out what's new"
            description="Latest of the trends we have to offer"
          />

          <Separator className="my-4" />

          {/* Category Tab */}
          <ProductListing category={category} />
        </Container>
      </section>
    </div>
  );
};

export default Home;
