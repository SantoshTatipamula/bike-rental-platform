import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getOwnerBookings, getUserBookings } from "@/services/bookingService";
import { getAllBikes } from "@/services/bikeService";

import DashboardHeader from "@/components/owner/dashboard/DashboardHeader";
import StatsCards from "@/components/owner/dashboard/StatsCard";
import QuickActions from "@/components/owner/dashboard/QuickActions";
import RecentBookings from "@/components/owner/dashboard/RecentBookings";
import RecentRequests from "@/components/owner/dashboard/RecentRequests";

const OwnerDashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalBikes: 0,
    totalBookings: 0,
    activeRentals: 0,
    earnings: 0,
    spent: 0,
  });

  const [bookings, setBookings] = useState([]); // owner booked others
  const [requests, setRequests] = useState([]); // customers booked owner bikes

  useEffect(() => {
    const loadDashboard = async () => {
      if (!user?.uid) return;

      try {
        const allBikes = await getAllBikes();
        const ownerBookings = await getOwnerBookings(user.uid); // requests
        const userBookings = await getUserBookings(user.uid);   // bookings

        const ownerBikes = allBikes.filter(
          (bike) => String(bike.ownerId) === String(user.uid)
        );

        // 🔥 ACTIVE RENTALS
        const activeRentals = ownerBookings.filter(
          (b) => b.status === "approved"
        );

        // 🔥 EARNINGS
        const earnings = activeRentals.reduce(
          (sum, b) => sum + (Number(b.price) || 0),
          0
        );

        // 🔥 SPENT
        const spent = userBookings.reduce(
          (sum, b) => sum + (Number(b.price) || 0),
          0
        );

        setStats({
          totalBikes: ownerBikes.length,
          totalBookings: userBookings.length,
          activeRentals: activeRentals.length,
          earnings:activeRentals.reduce(
            (sum,b) => sum + (Number(b.price) || 0),
            0
          ),
          spent: userBookings.reduce(
            (sum,b) => sum + (Number(b.price) || 0),
            0
          ),
        });

        // ✅ CORRECT ASSIGNMENT
        setBookings(userBookings.slice(-5).reverse());
        setRequests(ownerBookings.slice(-5).reverse());

      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    loadDashboard();
  }, [user]);

  return (
    <div className="bg-background min-h-screen p-4 md:p-6 space-y-6">
      <DashboardHeader user={user} />

      <StatsCards stats={stats} />

      <QuickActions />

      {/* ✅ FIXED */}
      <RecentRequests requests={requests} />

      {/* ✅ FIXED */}
      <RecentBookings bookings={bookings} />
    </div>
  );
};

export default OwnerDashboard;