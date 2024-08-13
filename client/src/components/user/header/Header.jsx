import "./header.scss";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "../../../hooks/user/useLogout";

const Header = () => {
  const { userInfo: currentUser } = useSelector((state) => state.auth);
  const { handleLogout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const handleLogoutClick = () => {
    handleLogout();
    setIsOpen(false);
  };

  return (
    <nav className="header">
      <div className="header-brand">
        <div style={{ fontSize: "20px", color: "white" }}>
          <NavLink to="/" className="header-item" onClick={handleLinkClick}>
            Darsh
          </NavLink>
        </div>
      </div>

      <div
        className={`header-menu ${isOpen ? "is-active" : ""}`}
        ref={sidebarRef}
      >
        <NavLink to="/" className="header-item" onClick={handleLinkClick}>
          الرئيسية
        </NavLink>
        <NavLink
          to="/courses"
          className="header-item linkLine"
          onClick={handleLinkClick}
        >
          الكورسات
        </NavLink>
        <NavLink
          to="/quizzes"
          className="header-item linkLine"
          onClick={handleLinkClick}
        >
          الاختبارات
        </NavLink>
        {currentUser?.role === "admin" && (
          <NavLink
            to="/admin"
            className="header-item linkLine"
            onClick={handleLinkClick}
          >
            الادمن
          </NavLink>
        )}
        {currentUser ? (
          <div
            className="header-item linkLine"
            style={{ color: "red", cursor: "pointer" }}
            onClick={handleLogoutClick}
          >
            خروج
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="header-user">
        {currentUser && (
          <NavLink to={`/profile/${currentUser?._id}`}>
            <img
              src={
                currentUser?.profilePic ||
                "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
              }
              alt="Profile"
              className="profile-pic"
            />
          </NavLink>
        )}
        <span style={{ color: "lightgrey", fontWeight: "bold" }}>
          {currentUser?.username || "اسم المستخدم"}
        </span>
        <button className="header-toggler" onClick={toggleMenu}>
          {isOpen ? "✖" : "☰"}
        </button>
      </div>
    </nav>
  );
};

export default Header;
