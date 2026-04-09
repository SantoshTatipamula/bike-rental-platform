import BikeActions from "./BikeActions";

const BikeTable = ({ bikes }) => {
  return (
    <div className="bg-card rounded-xl shadow-sm overflow-hidden">

      {/* ✅ MOBILE FIX: horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">

          <thead className="bg-gray-100 text-sm text-textSecondary">
            <tr>
              <th className="p-4">Bike</th>
              <th className="p-4">Location</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bikes.map((bike) => (
              <tr key={bike.id} className="border-t">

                <td className="p-4 font-medium">
                  {bike.name}
                </td>

                <td className="p-4">
                  {bike.location}
                </td>

                <td className="p-4">
                  ₹{bike.price}/day
                </td>

                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      bike.availability
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {bike.availability ? "Available" : "Unavailable"}
                  </span>
                </td>

                <td className="p-4">
                  <BikeActions />
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default BikeTable;