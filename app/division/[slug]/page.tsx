interface DivisionPageProps {
  params: {
    slug: string;
  };
}

export default function DivisionPage({ params }: DivisionPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Division: {params.slug}</h1>
      <div className="prose max-w-none">
        {/* Content will be populated based on the division slug */}
      </div>
    </div>
  );
}
