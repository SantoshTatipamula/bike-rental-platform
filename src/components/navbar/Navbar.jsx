import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import LocationSelector from "./LocationSelector";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const {user} = useAuth();

  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  return (
    <nav
      className={`${styles.navbar} w-full border-b bg-background text-foreground sticky top-0 z-50`}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center">
        {/* LEFT: Logo + Location */}
        <div className="flex items-center gap-3">
          <Logo />
          <LocationSelector />
        </div>

        {/* CENTER: NavLinks */}
        <div className="hidden md:flex flex-1 justify-center gap-6">
          <NavLinks />
        </div>

        {/* RIGHT: Search + User */}
        <div className="hidden md:flex items-center gap-4 ml-auto justify-between">
        <div className={`flex items-center border rounded-md px-3 py-1.5 ${user ? "w-auto" : "w-1/2" } bg-background`}>
          <SearchBar />
        </div>
          {user ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* MOBILE ACTIONS */}
        <div className="flex items-center gap-3 ml-auto md:hidden">
          {/* Search */}
          <button
            onClick={() => {
              setShowSearch(!showSearch);
              setMenuOpen(false);
            }}
          >
            <Search size={22} />
          </button>

          {/* Menu */}
          <button
            onClick={() => {
              setMenuOpen(!menuOpen);
              setShowSearch(false);
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 bg-background border-t">
          <NavLinks isMobile setMenuOpen={setMenuOpen} />
          {user ? (
            <UserMenu
              isMobile
              setMenuOpen={setMenuOpen}
            />
          ) : (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                Login
              </button>

              <button
                onClick={() => {
                  navigate("/signup");
                  setMenuOpen(false);
                }}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}

      {/* MOBILE SEARCH */}
      {showSearch && (
        <div className="md:hidden px-4 py-3 border-t bg-background">
          <SearchBar />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
