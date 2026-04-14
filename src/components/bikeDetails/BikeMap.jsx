import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix marker icon issue (important for React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const BikeMap = ({ bike }) => {
  if (!bike?.location) return null;

  const position = [
    bike.location.lat || 18.4386,
    bike.location.lng || 79.1288,
  ];

  return (
    <div className="mt-10 bg-[#f1f5f9] rounded-2xl p-6 relative z-0">
      <h2 className="text-xl font-semibold text-[#020617] mb-4">
        Pickup Location
      </h2>

      <div className="rounded-xl overflow-hidden">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={position}>
            <Popup>
              {bike.name} <br /> {bike.location.name}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default BikeMap;