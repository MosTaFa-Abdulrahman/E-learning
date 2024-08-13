import "./footer.scss";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="new_footer_area bg_color">
      <div className="colums">
        <div className="left">
          <h2>الروابط الرئيسية</h2>
          <div className="linksContainer">
            <NavLink to="/" className="linkLine">
              <div className="link">الرئيسية</div>
            </NavLink>
            <NavLink to="/courses" className="linkLine">
              <div className="link">الكورسات</div>
            </NavLink>
            <NavLink to="/quizzes" className="linkLine">
              <div className="link">الكويزات</div>
            </NavLink>
          </div>
        </div>

        <div className="middle">
          <h2>Enginners</h2>
          <div className="middleLinksContainer">
            <div className="titleContainer">
              <div className="title">Eng: MosTaFa Elbasha</div>
              <div className="title">Eng: Shehab Elbana</div>
            </div>
            <NavLink
              to="https://wa.link/f4d0br"
              target="_blank"
              className="linkLine"
            >
              <div className="mobileContainer">
                <img
                  src="https://cdn.pixabay.com/photo/2015/08/03/13/58/whatsapp-873316_1280.png"
                  alt=""
                />
                <div className="myNumber">01278496712</div>
              </div>
            </NavLink>
            <div className="mobileContainer">
              <img
                src="https://cdn.pixabay.com/photo/2021/09/27/22/30/phone-6662438_640.png"
                alt=""
              />
              <div className="myNumber">01278496712</div>
            </div>
          </div>
        </div>

        <div className="right">
          <h2>تواصل معنا</h2>
          <div className="iconsContainer">
            <i className="fa-brands fa-facebook icon"></i>
            <i className="fa-brands fa-whatsapp icon"></i>
            <i className="fa-solid fa-phone icon"></i>
          </div>
        </div>
      </div>

      <div className="new_footer_top">
        {/* Bike and Car */}
        <div className="footer_bg">
          <div className="footer_bg_one" />
          <div className="footer_bg_two" />
        </div>
        {/* Bike and Car */}
      </div>
    </footer>
  );
}

export default Footer;
// #5e2ced
