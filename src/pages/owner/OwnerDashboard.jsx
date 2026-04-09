import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getOwnerBookings } from "@/services/bookingService";
import { getAllBikes } from "@/services/bikeService";

import DashboardHeader from "@/components/owner/dashboard/DashboardHeader";
import StatsCards from "@/components/owner/dashboard/StatsCard";
import QuickActions from "@/components/owner/dashboard/QuickActions";
import RecentBookings from "@/components/owner/dashboard/RecentBookings";

const OwnerDashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalBikes: 0,
    totalBookings: 0,
    earnings: 0,
  });

  const [bookings, setBookings] = useState([]);



useEffect(() => {
  const loadDashboard = async () => {
    if (!user?.id) return;

    const allBikes = await getAllBikes(); // ✅ FIX

    const ownerBikes = allBikes.filter(
      (bike) => String(bike.ownerId) === String(user.id)
    );

    const ownerBookings = getOwnerBookings(user.id);

    const earnings = ownerBookings
      .filter((b) => b.status === "approved")
      .reduce((sum, b) => sum + (Number(b.price) || 0), 0);

    setStats({
      totalBikes: ownerBikes.length,
      totalBookings: ownerBookings.length,
      earnings,
    });

    setBookings(ownerBookings.slice(-5).reverse());
  };

  loadDashboard();
}, [user]);

  return (
    <div className="bg-background min-h-screen p-4 md:p-6 space-y-6">
      <DashboardHeader user={user} />

      {/* 🔥 pass stats */}
      <StatsCards stats={stats} />

      <QuickActions />

      {/* 🔥 pass bookings */}
      <RecentBookings bookings={bookings} />
    </div>
  );
};

export default OwnerDashboard;