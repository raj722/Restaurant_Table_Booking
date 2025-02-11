import React from 'react';

const Reservations = () => {
  return (
    <div className="container p-8 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Reservations</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700">Manage Reservations</h2>
          <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
            <div className="p-6 transition-shadow duration-300 bg-gray-100 rounded-lg shadow-sm hover:shadow-md">
              <h3 className="text-lg font-medium text-gray-800">Edit/Cancel/Update Status</h3>
              <p className="mt-2 text-gray-600">
                Modify the status of any reservation, whether it's confirmed, canceled, or needs updating.
              </p>
            </div>
            
            <div className="p-6 transition-shadow duration-300 bg-gray-100 rounded-lg shadow-sm hover:shadow-md">
              <h3 className="text-lg font-medium text-gray-800">View Special Requests</h3>
              <p className="mt-2 text-gray-600">
                Easily view any special requests made by customers to ensure a smooth reservation process.
              </p>
            </div>
            
            <div className="p-6 transition-shadow duration-300 bg-gray-100 rounded-lg shadow-sm hover:shadow-md">
              <h3 className="text-lg font-medium text-gray-800">Assign Tables Manually (Optional)</h3>
              <p className="mt-2 text-gray-600">
                If necessary, assign tables to reservations manually for better control over table management.
              </p>
            </div>
          </div>
        </section>

        {/* Add any future dynamic content or functionality here */}
      </div>
    </div>
  );
};

export default Reservations;
