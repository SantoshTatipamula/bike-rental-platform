import { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import areas from "@/data/locationsData";

const LocationSelector = () => {
  const { location, setLocation } = useAppContext();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (area) => { setLocation(area); setOpen(false); };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 border px-2 py-1.5 rounded-md text-sm hover:bg-muted transition"
      >
        <MapPin size={14} className="text-brand flex-shrink-0" />
        <span className="hidden xs:block truncate max-w-[100px]">{location || "Location"}</span>
        <ChevronDown size={13} className="flex-shrink-0" />
      </button>

      {open && (
        <div className="absolute top-full mt-2 w-48 bg-card border rounded-lg shadow-md z-50 overflow-hidden">
          <button onClick={() => handleSelect("")}
            className="w-full text-left px-4 py-2 hover:bg-muted text-sm text-gray-500">
            All Locations
          </button>
          {areas.map((area) => (
            <button key={area} onClick={() => handleSelect(area)}
              className={`w-full text-left px-4 py-2 hover:bg-muted text-sm ${location === area ? "text-brand font-medium" : ""}`}>
              {area}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
