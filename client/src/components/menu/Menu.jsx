import "./menu.scss";
import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <div className="menu">
      {/* Admin */}
      <div className="item">
        <span className="title">الادمن</span>
        <NavLink to="/admin" className="listItem">
          <img
            src="https://img.icons8.com/?size=50&id=73&format=png"
            className="icon"
          />
          <span className="listItemTitle">الرئيسية</span>
        </NavLink>
        <NavLink to="/admin/courses" className="listItem">
          <img
            src="https://cdn-icons-png.freepik.com/256/11185/11185639.png?ga=GA1.1.1667782128.1709944355&semt=ais_hybrid"
            className="icon"
          />
          <span className="listItemTitle">الكورسات</span>
        </NavLink>
        <NavLink to="/admin/sections" className="listItem">
          <img
            src="https://cdn-icons-png.freepik.com/256/16602/16602080.png?ga=GA1.1.1667782128.1709944355&semt=ais_hybrid"
            className="icon"
          />
          <span className="listItemTitle">الوحدات</span>
        </NavLink>
        <NavLink to="/admin/videos" className="listItem">
          <img
            src="https://cdn-icons-png.freepik.com/256/15114/15114197.png?ga=GA1.1.1667782128.1709944355&semt=ais_hybrid"
            className="icon"
          />
          <span className="listItemTitle">الفيديوهات</span>
        </NavLink>
        <NavLink to="/admin/users" className="listItem">
          <img
            src="https://img.icons8.com/?size=30&id=102261&format=png"
            className="icon"
          />
          <span className="listItemTitle">الطلاب</span>
        </NavLink>
        <NavLink to="/admin/quizzs" className="listItem">
          <img
            src="https://cdn-icons-png.freepik.com/256/8586/8586956.png?ga=GA1.1.1667782128.1709944355&semt=ais_hybrid"
            className="icon"
          />
          <span className="listItemTitle">الكويزات</span>
        </NavLink>
      </div>

      {/* User */}
      <div className="item">
        <span className="title">الطالب</span>
        <NavLink to="/" className="listItem">
          <img
            src="https://img.icons8.com/?size=40&id=21081&format=png"
            className="icon"
          />
          <span className="listItemTitle">المستخدم</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Menu;
