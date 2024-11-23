import React from "react";

const Doctors = () => {
  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Oncologist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300",
    },
    {
      name: "Dr. Michael Chen",
      role: "Lead Radiologist",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300",
    },
    {
      name: "Dr. Emily Brown",
      role: "Senior Urologist",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300",
    },
  ];

  return (
    <section id="doctors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Expert Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div key={index} className="text-center">
              <img src={doctor.image} alt={doctor.name} className="w-48 h-48 object-cover rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
