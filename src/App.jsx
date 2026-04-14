import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import PageWrapper from "./components/layout/PageWrapper";
import ScrollToTop from "@/components/common/ScrollToTop";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Loader from "./components/common/Loader";

// Core pages
const Home         = lazy(() => import("./pages/public/Home"));
const Bikes        = lazy(() => import("./pages/customer/Bikes"));
const Login        = lazy(() => import("./pages/public/Login"));
const Signup       = lazy(() => import("./pages/public/Signup"));
const BikeDetails  = lazy(() => import("./pages/customer/BikeDetails"));
const Booking      = lazy(() => import("./pages/customer/Booking"));
const Profile      = lazy(() => import("./pages/customer/Profile"));
const BecomeOwner  = lazy(() => import("./pages/customer/BecomeOwner"));
const MyBookings   = lazy(() => import("./pages/customer/MyBookings"));
const OwnerDashboard = lazy(() => import("./pages/owner/OwnerDashboard"));
const AddBike      = lazy(() => import("./pages/owner/AddBike"));
const OwnerBikes   = lazy(() => import("./pages/owner/OwnerBikes"));
const OwnerBookings = lazy(() => import("./pages/owner/OwnerBookings"));
const ProtectedRoute = lazy(() => import("./components/common/ProtectedRoute"));

// Footer pages
const About   = lazy(() => import("./pages/public/About"));
const Contact = lazy(() => import("./pages/public/Contact"));
const Help    = lazy(() => import("./pages/public/Help"));
const FAQ     = lazy(() => import("./pages/public/FAQ"));
const Terms   = lazy(() => import("./pages/public/Terms"));
const Privacy = lazy(() => import("./pages/public/Privacy"));

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-sectionLight">
      <Navbar />
      <main className="flex-grow w-full">
        <ScrollToTop />
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Public */}
            <Route path="/"           element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/bikes"      element={<PageWrapper><Bikes /></PageWrapper>} />
            <Route path="/bikes/:id"  element={<PageWrapper><BikeDetails /></PageWrapper>} />
            <Route path="/login"      element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/signup"     element={<PageWrapper><Signup /></PageWrapper>} />
            <Route path="/become-owner" element={<PageWrapper><BecomeOwner /></PageWrapper>} />

            {/* Footer pages */}
            <Route path="/about"   element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/help"    element={<PageWrapper><Help /></PageWrapper>} />
            <Route path="/faq"     element={<PageWrapper><FAQ /></PageWrapper>} />
            <Route path="/terms"   element={<PageWrapper><Terms /></PageWrapper>} />
            <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />

            {/* Protected — any logged-in user */}
            <Route path="/booking/:id" element={
              <PageWrapper>
                <ProtectedRoute allowedRoles={["customer","owner"]}><Booking /></ProtectedRoute>
              </PageWrapper>
            } />
            <Route path="/profile" element={
              <PageWrapper>
                <ProtectedRoute allowedRoles={["customer","owner"]}><Profile /></ProtectedRoute>
              </PageWrapper>
            } />
            <Route path="/profile/:id" element={
              <PageWrapper>
                <ProtectedRoute allowedRoles={["customer","owner"]}><Profile /></ProtectedRoute>
              </PageWrapper>
            } />
            <Route path="/customer/bookings" element={
              <PageWrapper>
                <ProtectedRoute allowedRoles={["customer","owner"]}><MyBookings /></ProtectedRoute>
              </PageWrapper>
            } />

            {/* Owner only */}
            <Route path="/owner/dashboard" element={
              <PageWrapper>
                <ProtectedRoute allowedRoles={["owner"]}><OwnerDashboard /></ProtectedRoute>
              </PageWrapper>
            } />
            <Route path="/owner/add-bike" element={
              <PageWrapper>
                <ProtectedRoute allowedRoles={["owner"]}><AddBike /></ProtectedRoute>
              </PageWrapper>
            } />
            <Route path="/owner/my-bikes" element={
              <PageWrapper>
                <ProtectedRoute allowedRoles={["owner"]}><OwnerBikes /></ProtectedRoute>
              </PageWrapper>
            } />
            <Route path="/owner/bookings" element={
              <PageWrapper>
                <ProtectedRoute allowedRoles={["owner"]}><OwnerBookings /></ProtectedRoute>
              </PageWrapper>
            } />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
