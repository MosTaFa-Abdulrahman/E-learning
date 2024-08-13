import "./heroSection.scss";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// http://res.cloudinary.com/dkqpzws52/image/upload/v1722829043/upload/iw7wvvyvj0qoav33ozqv.jpg

export default function HeroSection() {
  const { userInfo: currentUser } = useSelector((state) => state.auth);

  return (
    <section className="hero-section">
      <div className="hero-images">
        <img
          src="https://media.istockphoto.com/id/1708046305/photo/business-man-mature-and-portrait-outdoor-with-arms-crossed-for-professional-career-and.webp?b=1&s=170667a&w=0&k=20&c=IMp4BnZOaAookY7J8S4y9ln3AetcQ-_UoDOnC-KCZe0="
          alt="Student"
          className="main-image"
          style={{ width: "550px", height: "360px" }}
        />
        <div className="support-info">
          <p>رقم المدرس</p>
          <p>+020 1150336189</p>
        </div>
      </div>

      <div className="hero-text">
        <p>
          يتمتع المعلم الجيد بعلاقات قوية مع طلابه من خلال كونهم ودودين ومتاحين
          ولطيفين
        </p>

        {currentUser ? (
          <NavLink to={`/profile/${currentUser._id}`}>
            <button className="profileUser">حسابي</button>
          </NavLink>
        ) : (
          <>
            <NavLink to={`/register`}>
              <button
                className="find-courses-button"
                style={{ marginBottom: "5px" }}
              >
                انشاء حساب
              </button>
            </NavLink>
            <NavLink to={`/login`}>
              <button
                className="find-courses-button"
                style={{ marginLeft: "5px" }}
              >
                تسجيل دخول
              </button>
            </NavLink>
          </>
        )}
      </div>
    </section>
  );
}
