import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Broadcom',
  description: 'Learn more about our company and mission',
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">About Us</h1>

        <div className="prose prose-lg">
          <p className="mb-6 text-gray-600">
            We are committed to delivering innovative solutions that drive the
            future of technology. Our team of experts works tirelessly to create
            cutting-edge products and services that help businesses thrive in
            the digital age.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Our Mission
              </h2>
              <p className="text-gray-600">
                To empower organizations through innovative technology solutions
                that drive digital transformation and sustainable growth.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Our Vision
              </h2>
              <p className="text-gray-600">
                To be the world&apos;s leading provider of enterprise software
                solutions, setting new standards for innovation and customer
                success.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
