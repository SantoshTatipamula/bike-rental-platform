import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import PageWrapper from "./components/layout/PageWrapper";

import Home from "./pages/public/Home";
import Bikes from "./pages/customer/Bikes";
// import Owner from "./pages/Owner";
import Login from "./pages/public/Login";

import BikeCard from "./components/bikes/BikeCard";
import UserMenu from "./components/navbar/UserMenu";
import Navbar from "./components/navbar/Navbar";
import NavLinks from "./components/navbar/NavLinks";

import Footer from "./components/footer/Footer";
import BikeDetails from "./pages/customer/BikeDetails";
import Booking from "./pages/customer/Booking";
import Profile from "./pages/customer/Profile";
import BecomeOwner from "./pages/customer/BecomeOwner";

import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AddBike from "./pages/owner/AddBike";
import OwnerBikes from "./pages/owner/OwnerBikes";
import OwnerBookings from "./pages/owner/OwnerBookings";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Signup from "./pages/public/Signup";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-sectionLight">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow w-full">
        <Routes>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/bikes"
            element={
              <PageWrapper>
                <Bikes />
              </PageWrapper>
            }
          />

          <Route
            path="/login"
            element={
              <PageWrapper>
                <Login />
              </PageWrapper>
            }
          />
          <Route
            path="/signup"
            element={
              <PageWrapper>
                <Signup />
              </PageWrapper>
            }
          />

          <Route
            path="/bikes/:id"
            element={
              <PageWrapper>
                <BikeDetails />
              </PageWrapper>
            }
          />

          <Route
            path="/booking/:id"
            element={
              <PageWrapper>
                <Booking />
              </PageWrapper>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/become-owner"
            element={
              <PageWrapper>
                <BecomeOwner />
              </PageWrapper>
            }
          />

          {/* Owner Routes */}
          <Route
            path="/profile/:id"
            element={
              <PageWrapper>
                <ProtectedRoute allowedRoles={["customer", "owner"]}>
                  <Profile />
                </ProtectedRoute>
              </PageWrapper>
            }
          />

          {/* Owner Routes */}
          <Route
            path="/owner/dashboard"
            element={
              <PageWrapper>
                <ProtectedRoute allowedRoles={["owner"]}>
                  <OwnerDashboard />
                </ProtectedRoute>
              </PageWrapper>
            }
          />

          <Route
            path="/owner/add-bike"
            element={
              <PageWrapper>
                <ProtectedRoute allowedRoles={["owner"]}>
                  <AddBike />
                </ProtectedRoute>
              </PageWrapper>
            }
          />

          <Route
            path="/owner/my-bikes"
            element={
              <PageWrapper>
                <ProtectedRoute allowedRoles={["owner"]}>
                  <OwnerBikes />
                </ProtectedRoute>
              </PageWrapper>
            }
          />

          <Route
            path="/owner/bookings"
            element={
              <PageWrapper>
                <ProtectedRoute allowedRoles={["owner"]}>
                  <OwnerBookings />
                </ProtectedRoute>
              </PageWrapper>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
