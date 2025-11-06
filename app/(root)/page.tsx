import CategoryMenu from "@/components/category-menu";
import Container from "@/components/container";
import Features from "@/components/features";
import ProductListing from "@/components/product-listing";
import HeroSection from "@/components/sections/hero-section";
import SectionHeader from "@/components/sections/section-header";
import { Separator } from "@/components/ui/separator";

export default function Home() {
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
          <CategoryMenu />
          <ProductListing />
        </Container>
      </section>
    </div>
  );
}
