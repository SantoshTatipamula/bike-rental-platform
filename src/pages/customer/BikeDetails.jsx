import { useParams } from "react-router-dom";
import bikesData from "@/data/bikesData";
import BikeHero from "@/components/bikeDetails/BikeHero";
import BikeDescription from "@/components/bikeDetails/BikeDescription";
import BikeOwner from "@/components/bikeDetails/BikeOwner";
import BikeMap from "@/components/bikeDetails/BikeMap";

const BikeDetails = () => {
  const { id } = useParams();
  const bike = bikesData.find((b) => b.id === Number(id));

  if (!bike) return <div>Bike not found</div>;

  return (
    <>
      <BikeHero bike={bike} />
      <BikeDescription bike={bike} />
      <BikeOwner bike={bike} />
      <BikeMap bike={bike} />
    </>
  );
};

export default BikeDetails;
