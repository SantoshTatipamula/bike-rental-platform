import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import PageWrapper from "./components/layout/PageWraper";

import Home from "./pages/public/Home";
import Bikes from "./pages/Bikes";
import Owner from "./pages/Owner";
import Login from "./pages/Login";

import BikeCard from "./components/BikeCard";
import UserMenu from "./components/navbar/UserMenu";
import Navbar from "./components/navbar/Navbar";
import NavLinks from "./components/navbar/NavLinks";

import Footer from "./components/footer/Footer";

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
            path="/owner"
            element={
              <PageWrapper>
                <Owner />
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
