import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import AnnouncementBar from "../pages/AnnouncementBar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function Layout() {
     const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <>
    {isHome && <AnnouncementBar />}
      <Navbar />
      <main className={isHome ? "pt-24 md:pt-28" : "pt-16 md:pt-20"}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}