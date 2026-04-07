import DashboardHeader from "@/components/owner/dashboard/DashboardHeader";
import StatsCards from "@/components/owner/dashboard/StatsCard";
import QuickActions from "@/components/owner/dashboard/QuickActions"
import RecentBookings from "@/components/owner/dashboard/RecentBookings";

const OwnerDashboard = () => {
  return (
    <div className="bg-background min-h-screen p-4 md:p-6 space-y-6">
      <DashboardHeader />
      <StatsCards />
      <QuickActions />
      <RecentBookings />
    </div>
  );
};

export default OwnerDashboard;