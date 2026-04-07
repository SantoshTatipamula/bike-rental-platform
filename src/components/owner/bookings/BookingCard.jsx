import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui/button";

const BookingCard = ({ booking }) => {
  return (
    <div
      className="
        h-full flex flex-col justify-between
        bg-card rounded-xl p-4 shadow-sm
        transition-all duration-300
        hover:shadow-md hover:-translate-y-1
      "
    >
      {/* Top Section */}
      <div className="space-y-3">

        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-sm sm:text-base">
            {booking.bikeName}
          </h3>
          <StatusBadge status={booking.status} />
        </div>

        <div className="text-xs sm:text-sm text-textSecondary space-y-1">
          <p>Customer: {booking.user}</p>
          <p>Date: {booking.date}</p>
        </div>

      </div>

      {/* Bottom Section (sticks to bottom) */}
      {booking.status === "pending" && (
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button size="sm" className="w-full sm:w-auto">
            Accept
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="w-full sm:w-auto"
          >
            Reject
          </Button>
        </div>
      )}

    </div>
  );
};

export default BookingCard;