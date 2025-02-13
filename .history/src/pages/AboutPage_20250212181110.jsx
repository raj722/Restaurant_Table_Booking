import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="py-10 text-center text-white bg-blue-950">
        <h1 className="text-4xl font-bold md:text-5xl">About Us</h1>
        <p className="mt-4 text-lg md:text-xl">
          Learn more about our mission, values, and what we stand for.
        </p>
      </header>

      {/* Mission Section */}
      <section className="max-w-6xl px-4 py-12 mx-auto">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-900">
          Our Mission
        </h2>
        <p className="leading-relaxed text-center text-gray-700 md:text-lg">
  At <span className="font-semibold">Our Restaurant App</span>, our mission is
  to deliver exceptional dining experiences and unparalleled convenience
  to our customers. We believe in innovation, collaboration, and excellence,
  striving to redefine how people discover, order, and enjoy their favorite meals.
</p>

      </section>

      {/* Team Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center text-blue-900">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Raj Tamang",
                role: "Front-end Developer",
                image: "/images/raj.jpg",
              },
              {
                name: "Chandra  Koirala",
                role: "Front-end Developer",
                image: "/images/chandra.jpg",
              },
              {
                name: "Dikshya Adhikari",
                role: "Back-end Developer",
                image: "/images/sumitra.jpg",
              },
              {
                name: "Sumitra Tamang",
                role: "Back-end Developer",
                image: "/images/sumitra.jpg",
              },
            ].map((teamMember) => (
              <div
                key={teamMember.name}
                className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md"
              >
                <img
                  src={teamMember.image}
                  alt={teamMember.name}
                  className="object-cover w-32 h-32 mb-4 rounded-full"
                />
                <h3 className="text-xl font-semibold">{teamMember.name}</h3>
                <p className="text-gray-600">{teamMember.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-6xl px-4 py-12 mx-auto">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-900">
          Our Values
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
              className="p-6 text-center bg-white rounded-lg shadow-md"
            >
              <h3 className="mb-4 text-2xl font-semibold text-blue-900">
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