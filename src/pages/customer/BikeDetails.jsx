import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBikeById } from "../../services/bikeService";
import Loader from "../../components/common/Loader";
import BikeHero from "@/components/bikeDetails/BikeHero";
import BikeDescription from "@/components/bikeDetails/BikeDescription";
import BikeOwner from "@/components/bikeDetails/BikeOwner";
import BikeMap from "@/components/bikeDetails/BikeMap";


const BikeDetails = () => {
  const { id } = useParams();

  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const data = await getBikeById(id);
        setBike(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBike();
  }, [id]);

  if (loading) return <Loader />;
  if (!bike) return <div>Bike not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <BikeHero bike={bike} />
      <BikeDescription bike={bike} />
      <BikeOwner bike={bike} />
      <BikeMap bike={bike} />
    </div>
  );
};

export default BikeDetails;
