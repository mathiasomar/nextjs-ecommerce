import Container from "@/components/container";
import ProductListing from "@/components/product-listing";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <Container>
      <ProductListing category={category} params="products" />
    </Container>
  );
};

export default ProductsPage;
