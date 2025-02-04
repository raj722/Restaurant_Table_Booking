import { Link } from "react-router-dom"; // Add this line

// Inside the restaurant card mapping
<Link to={`/restaurant/${restaurant.id}`} key={restaurant.name}>
  <div className="overflow-hidden transition-transform duration-300 transform rounded-lg shadow-md bg-white/90 backdrop-blur-sm hover:scale-105 hover:shadow-lg">
    <img
      src={restaurant.image}
      alt={restaurant.name}
      className="object-cover w-full h-48"
    />
    <div className="p-4">
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-xl font-bold">
          {index + 1}. {restaurant.name}
        </h2>
        <div className="flex items-center">
          <span className="mr-2 text-sm">{restaurant.rating}</span>
          <span className="text-sm text-gray-500">({restaurant.reviews})</span>
        </div>
      </div>
      <div className="mb-4">
        <span className="text-gray-700">{restaurant.price}</span>
        <span className="mx-2">•</span>
        <span className="text-gray-700">{restaurant.cuisine}</span>
        <span className="mx-2">•</span>
        <span className="text-gray-700">{restaurant.location}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {restaurant.times.map((time) => (
          <button
            key={time}
            className="px-4 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  </div>
</Link>