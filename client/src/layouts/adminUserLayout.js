import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import FooterAdmin from "../components/footerAdmin/FooterAdmin";
import Menu from "../components/menu/Menu";
import Navbar from "../components/navbar/Navbar";
import Header from "../components/user/header/Header";

const AdminLayout = () => {
  import("../styles/global.scss");

  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
      <FooterAdmin />
    </div>
  );
};

const UserLayout = () => {
  import("../styles/globalUser.scss");

  return (
    <div className="main">
      <Header />
      <div className="user-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export { AdminLayout, UserLayout };
