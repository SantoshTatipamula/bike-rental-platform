import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import LocationSelector from "./LocationSelector";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [authUser, setAuthUser] = useState({
    name: "Santosh",
    role: "customer",
  });

  const [showSearch, setShowSearch] = useState(false);

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
          <NavLinks user={authUser} />
        </div>

        {/* RIGHT: Search + User */}
        <div className="hidden md:flex items-center gap-4 ml-auto flex justify-between">
          <SearchBar />
          <UserMenu user={authUser} setUser={setAuthUser} />
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
          <NavLinks user={authUser} isMobile setMenuOpen={setMenuOpen} />
          <UserMenu
            user={authUser}
            setUser={setAuthUser}
            isMobile
            setMenuOpen={setMenuOpen}
          />
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