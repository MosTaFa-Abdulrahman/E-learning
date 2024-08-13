import "./home.scss";
import HeroSection from "../../components/user/heroSection/HeroSection";
import Cool from "../../components/user/cool/Cool";
import LandingPage from "../../components/user/landingPage/LandingPage";

import useGetRandomCourses from "../../hooks/user/useGetRandomCourses";
import Card from "../../components/user/card/Card";
import Spinner from "../../components/spinner/Spinner";
import { NavLink } from "react-router-dom";
import UserLookup from "../../components/user/userLookup/UserLookup";

function Home() {
  const { isLoading, error, courses } = useGetRandomCourses();

  return (
    <div>
      <HeroSection />
      <Cool />

      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>الكورسات</h1>
      </header>

      <div className="course-list">
        <div className="courses">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            "Error.. 😥"
          ) : (
            courses.map((course) => <Card key={course._id} course={course} />)
          )}
        </div>
      </div>

      <header
        className="titleCourses"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NavLink to="/courses">
          <button>كل الكورسات</button>
        </NavLink>
      </header>

      <LandingPage />

      <UserLookup />
    </div>
  );
}

export default Home;
