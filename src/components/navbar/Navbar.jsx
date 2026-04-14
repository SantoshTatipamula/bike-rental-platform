import { useState, useEffect, useRef } from "react";
import { Menu, X, Search, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebase";
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import LocationSelector from "./LocationSelector";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import styles from "./Navbar.module.css";

const NotificationBell = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!user?.uid) return;
    const q = query(collection(db, "notifications"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => {
          const aTime = a.createdAt?.toDate?.() || new Date(0);
          const bTime = b.createdAt?.toDate?.() || new Date(0);
          return bTime - aTime;
        });
      setNotifications(data);
    });
    return () => unsubscribe();
  }, [user?.uid]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = async (notif) => {
    if (!notif.read) {
      await updateDoc(doc(db, "notifications", notif.id), { read: true });
    }
  };

  const markAllRead = async () => {
    const unread = notifications.filter((n) => !n.read);
    await Promise.all(unread.map((n) => updateDoc(doc(db, "notifications", n.id), { read: true })));
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-full -left-3/4 -translate-x-1/2 mt-2 
            w-[95vw] max-w-sm 
            sm:left-auto sm:right-0 sm:translate-x-0 sm:w-80 
            bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <p className="font-semibold text-sm">Notifications</p>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs text-brand hover:underline">
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-72 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-6">No notifications yet</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markRead(n)}
                  className={`px-4 py-3 border-b last:border-none cursor-pointer hover:bg-gray-50 transition ${!n.read ? "bg-orange-50" : ""}`}
                >
                  <p className="text-sm text-gray-800 leading-snug">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {n.createdAt?.toDate ? n.createdAt.toDate().toLocaleString() : ""}
                  </p>
                  {!n.read && <span className="inline-block w-2 h-2 rounded-full bg-brand mt-1" />}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
        setShowSearch(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={`${styles.navbar} w-full border-b bg-background text-foreground sticky top-0 z-50 `}>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
        {/* LEFT */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Logo />
          <LocationSelector />
        </div>

        {/* CENTER — desktop nav */}
        <div className="hidden md:flex flex-1 justify-center gap-6">
          <NavLinks />
        </div>

        {/* RIGHT — desktop */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <div className="flex items-center border rounded-md px-3 py-1.5 bg-background min-w-[160px] max-w-[220px]">
            <SearchBar />
          </div>
          {user ? (
            <div className="flex items-center gap-2">
              <NotificationBell user={user} />
              <UserMenu />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={() => navigate("/login")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Login
              </button>
              <button onClick={() => navigate("/signup")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* RIGHT — mobile actions */}
        <div className="flex items-center gap-2 ml-auto md:hidden">
          {user && <NotificationBell user={user} />}
          <button onClick={() => { setShowSearch(!showSearch); setMenuOpen(false); }}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition">
            <Search size={20} />
          </button>
          <button onClick={() => { setMenuOpen(!menuOpen); setShowSearch(false); }}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {showSearch && (
        <div className="md:hidden px-4 py-2.5 border-t bg-background">
          <SearchBar autoFocus />
        </div>
      )}

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-background z-50 shadow-xl
        transform transition-transform duration-300 ease-in-out md:hidden
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4 flex flex-col gap-4 h-full overflow-y-auto">
          <div className="flex justify-between items-center">
            <Logo />
            <button onClick={() => setMenuOpen(false)} className="text-gray-500 p-1">
              <X size={22} />
            </button>
          </div>
          <div className="border-t border-gray-200 pt-3 flex flex-col gap-3">
            <NavLinks isMobile setMenuOpen={setMenuOpen} />
          </div>
          <div className="border-t border-gray-200 pt-3 mt-auto">
            {user ? (
              <UserMenu isMobile setMenuOpen={setMenuOpen} />
            ) : (
              <div className="flex flex-col gap-2">
                <button onClick={() => { navigate("/login"); setMenuOpen(false); }}
                  className="bg-orange-500 text-white px-4 py-2.5 rounded-lg font-medium">Login</button>
                <button onClick={() => { navigate("/signup"); setMenuOpen(false); }}
                  className="border border-orange-500 text-orange-500 px-4 py-2.5 rounded-lg font-medium">Sign Up</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
