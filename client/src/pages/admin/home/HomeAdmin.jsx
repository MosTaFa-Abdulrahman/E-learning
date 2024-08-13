import "./homeAdmin.scss";
import TopBox from "../../../components/admin/chart/topBox/TopBox";
import ChartBox from "../../../components/admin/chart/chartBox/ChartBox";
import PieChartBox from "../../../components/admin/chart/pieCartBox/PieChartBox";
import BigChartBox from "../../../components/admin/chart/bigChartBox/BigChartBox";
import BarChartBox from "../../../components/admin/chart/barChartBox/BarChartBox";
import { barChartBoxRevenue, barChartBoxVisit } from "../../../dummyData";

import Spinner from "../../../components/spinner/Spinner";
import useGetAllUsers from "../../../hooks/admin/useGetAllUsers";
import useGetPreviousCountusers from "../../../hooks/admin/useGetPreviousCountusers";
import useGetAllCourses from "../../../hooks/admin/useGetAllCourses";
import useGetPreviousCountCourses from "../../../hooks/admin/useGetPreviousCountCourses";

function HomeAdmin() {
  // Handle Users && Courses Chart
  const {
    users,
    isLoading: usersLoading,
    error: usersError,
  } = useGetAllUsers();
  const {
    previousUserCount,
    isLoading: previousLoading,
    error: previousError,
  } = useGetPreviousCountusers();

  const {
    courses,
    isLoading: coursesLoading,
    error: coursesError,
  } = useGetAllCourses();
  const {
    isLoading: previousLoadingCourse,
    error: previousErrorCourse,
    previousCoursesCount: previousCourseCount,
  } = useGetPreviousCountCourses();

  // if (usersLoading || previousLoading) return <Spinner />;
  if (usersError) return <div>Error: {usersError.message}</div>;
  if (previousError) return <div>Error: {previousError.message}</div>;

  // if (coursesLoading || previousLoadingCourse) return <Spinner />;
  if (coursesError) return <div>Error: {coursesError.message}</div>;
  if (previousErrorCourse)
    return <div>Error: {previousErrorCourse.message}</div>;

  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const calculatePercentageChangeCourse = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const userPercentageChange = calculatePercentageChange(
    users.length,
    previousUserCount
  );

  const coursePercentageChange = calculatePercentageChangeCourse(
    courses.length,
    previousCourseCount
  );

  const userChartBoxProps = {
    color: "#8884d8",
    icon: "https://img.icons8.com/?size=80&id=UWNhN9bLYG1k&format=png",
    title: "عدد الطلاب",
    number: users.length,
    dataKey: "users",
    navLink: "users",
    percentage: userPercentageChange.toFixed(2),
    chartData: users.map((user, index) => ({
      name: `User ${index + 1}`,
      users: index + 1,
    })),
  };

  const courseChartBoxProps = {
    color: "#82ca9d",
    icon: "https://img.icons8.com/?size=80&id=20aNIvfdFuPg&format=png",
    title: "عدد الكرسات",
    number: courses.length,
    dataKey: "courses",
    navLink: "courses",
    percentage: coursePercentageChange.toFixed(2),
    chartData: courses.map((course, index) => ({
      name: `Course ${index + 1}`,
      courses: index + 1,
    })),
  };

  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox {...userChartBoxProps} />
      </div>
      <div className="box box3">
        <ChartBox {...courseChartBoxProps} />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>

      <div className="box box7">
        <BigChartBox />
      </div>

      <div className="box box8">
        <BarChartBox {...barChartBoxVisit} />
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
    </div>
  );
}

export default HomeAdmin;
