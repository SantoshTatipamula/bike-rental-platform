import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import PageWrapper from "./components/layout/PageWrapper";
import ScrollToTop from "@/components/common/ScrollToTop";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Loader from "./components/common/Loader";

// Lazy load all pages
const Home = lazy(() => import("./pages/public/Home"));
const Bikes = lazy(() => import("./pages/customer/Bikes"));
const Login = lazy(() => import("./pages/public/Login"));
const Signup = lazy(() => import("./pages/public/Signup"));
const BikeDetails = lazy(() => import("./pages/customer/BikeDetails"));
const Booking = lazy(() => import("./pages/customer/Booking"));
const Profile = lazy(() => import("./pages/customer/Profile"));
const BecomeOwner = lazy(() => import("./pages/customer/BecomeOwner"));
const MyBookings = lazy(() => import("./pages/customer/MyBookings"));
const OwnerDashboard = lazy(() => import("./pages/owner/OwnerDashboard"));
const AddBike = lazy(() => import("./pages/owner/AddBike"));
const OwnerBikes = lazy(() => import("./pages/owner/OwnerBikes"));
const OwnerBookings = lazy(() => import("./pages/owner/OwnerBookings"));
const ProtectedRoute = lazy(() => import("./components/common/ProtectedRoute"));

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-sectionLight">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow w-full">
        <ScrollToTop />
        <Suspense fallback={<Loader />}>
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

            <Route
              path="/customer/bookings"
              element={
                <PageWrapper>
                  <MyBookings />
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
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;