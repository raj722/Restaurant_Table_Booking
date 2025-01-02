import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-blue-950 text-white py-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
        <p className="mt-4 text-lg md:text-xl">
          Learn more about our mission, values, and what we stand for.
        </p>
      </header>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-900">
          Our Mission
        </h2>
        <p className="text-gray-700 text-center md:text-lg leading-relaxed">
  At <span className="font-semibold">Our Restaurant App</span>, our mission is
  to deliver exceptional dining experiences and unparalleled convenience
  to our customers. We believe in innovation, collaboration, and excellence,
  striving to redefine how people discover, order, and enjoy their favorite meals.
</p>

      </section>

      {/* Team Section */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Raj Tamang",
                role: "Front-end Developer",
                image: "/images/raj.jpg",
              },
              {
                name: "Chandra  Koirala",
                role: "CTO",
                image: "/images/chandra.jpg",
              },
              {
                name: "Dikshya Adhikari",
                role: "Designer",
                image: "/images/sumitra.jpg",
              },
              {
                name: "Sumitra Tamang",
                role: "Developer",
                image: "/images/sumitra.jpg",
              },
            ].map((teamMember) => (
              <div
                key={teamMember.name}
                className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center"
              >
                <img
                  src={teamMember.image}
                  alt={teamMember.name}
                  className="w-32 h-32 rounded-full mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">{teamMember.name}</h3>
                <p className="text-gray-600">{teamMember.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-900">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Innovation",
              description:
                "We embrace change and continuously seek new ideas to drive progress.",
            },
            {
              title: "Integrity",
              description:
                "We value honesty and hold ourselves accountable to the highest ethical standards.",
            },
            {
              title: "Collaboration",
              description:
                "We believe teamwork and partnerships are key to success.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <h3 className="text-2xl font-semibold mb-4 text-blue-900">
                {value.title}
              </h3>
              <p className="text-gray-700">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
