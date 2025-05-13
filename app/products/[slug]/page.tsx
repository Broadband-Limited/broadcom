interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product: {params.slug}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product details will go here */}
      </div>
    </div>
  );
}
