import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-80 bg-[url('/images/about-banner.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold">About Us</h1>
          <p className="mt-2 text-lg">Learn more about our mission and team</p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">Who We Are</h2>
          <p className="mt-4 text-lg text-gray-700">
            We are passionate about bringing people together through the love of food.
            Our goal is to provide the easiest and most enjoyable restaurant booking experience.
            Whether you're looking for a casual meal or a fine dining experience, we've got you covered.
          </p>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="px-6 py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center">Meet Our Team</h2>

          <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-3">
            {/* Team Member 1 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img src="/images/team1.jpg" alt="Team Member 1" className="object-cover w-full h-40 mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>

            {/* Team Member 2 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img src="/images/team2.jpg" alt="Team Member 2" className="object-cover w-full h-40 mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p className="text-gray-600">Marketing Director</p>
            </div>

            {/* Team Member 3 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img src="/images/team3.jpg" alt="Team Member 3" className="object-cover w-full h-40 mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold">Michael Brown</h3>
              <p className="text-gray-600">Head of Operations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
