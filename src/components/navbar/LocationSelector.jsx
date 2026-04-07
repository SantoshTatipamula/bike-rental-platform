import { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import areas from "@/data/locationsData";


const LocationSelector = () => {
  const { location, setLocation } = useAppContext();
  const [open, setOpen] = useState(false);

  const handleSelect = (area) => {
    setLocation(area);
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 border px-2 py-1.5 rounded-md text-sm max-w-[140px] md:max-w-none hover:bg-muted transition"
      >
        <MapPin size={14} className="text-brand" />
        <span className="truncate">{location || "Select"}</span>
        <ChevronDown size={14} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-48 bg-card border rounded-lg shadow-md z-50">
          {areas.map((area) => (
            <button
              key={area}
              onClick={() => handleSelect(area)}
              className="w-full text-left px-4 py-2 hover:bg-muted text-sm"
            >
              {area}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
