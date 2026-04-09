const EmptyState = ({ message = "No data found" }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyState;