const Card = ({ title, description, icon }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
      
      <div className="text-3xl mb-4">{icon}</div>

      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>

      <p className="text-gray-600">
        {description}
      </p>

    </div>
  );
};

export default Card;