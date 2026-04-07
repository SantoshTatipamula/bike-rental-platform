import PageWrapper from "@/components/layout/PageWrapper";
import BikeTable from "@/components/owner/bikes/BikeTable";

const bikes = [
  {
    id: 1,
    name: "Royal Enfield",
    location: "Karimnagar",
    price: 500,
    available: true,
  },
  {
    id: 2,
    name: "Yamaha R15",
    location: "Hyderabad",
    price: 400,
    available: false,
  },
];

const OwnerBikes = () => {
  return (
    <PageWrapper>

      <div className="max-w-6xl mx-auto py-10 px-4">

        <h1 className="text-3xl font-bold mb-6">
          My Bikes
        </h1>

        <BikeTable bikes={bikes} />

      </div>

    </PageWrapper>
  );
};

export default OwnerBikes;