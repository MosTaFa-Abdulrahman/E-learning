import "./user.scss";
import { useParams } from "react-router-dom";
import useGetUserProfile from "../../../hooks/user/useGetUserProfile";
import Spinner from "../../../components/spinner/Spinner";

function User() {
  const { id } = useParams();

  const { isLoading, user } = useGetUserProfile(id);

  if (isLoading) {
    return <Spinner />;
  }
  if (!user) {
    return <h1>هذا الطالب غير موجود</h1>;
  }

  return (
    <div className="singleUser">
      <div className="profileHeader">
        <img
          src={
            user?.profilePic ||
            "https://cdn-icons-png.flaticon.com/128/17434/17434028.png"
          }
          alt={user.username}
        />
        <div className="userInfo">
          <h1 style={{ textAlign: "center" }}>{user.username}</h1>
          <p>
            {user.email} <strong>:الايميل</strong>
          </p>
          <p>
            {user.firstName} <strong>:الاسم الاول </strong>
          </p>
          <p>
            {user.lastName} <strong>:الاسم الثاني </strong>
          </p>
          <p>
            <strong>تليفون </strong> {user.phone}
          </p>
          <p>
            <strong>تليفون ولي الامر </strong> {user.fatherPhone}
          </p>
          <p>
            <strong>تاريخ الانضمام </strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>تاريخ التعديل </strong>{" "}
            {new Date(user.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="quizResults">
        <h2>نتائج الاختبارات</h2>
        {user?.quizResults?.length > 0 ? (
          <ul>
            {user?.quizResults?.map((result) => (
              <li key={result._id} className="quizResult">
                <h3>{result.title}</h3>
                <p>
                  <strong>الدرجة:</strong> {result.score}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p> 🙄 لا يوجد نتائج حاليا</p>
        )}
      </div>

      <div className="purchasedCourses">
        <h2>الكورسات المدفوعة</h2>
        {user?.purchasedCourses?.length > 0 ? (
          <ul>
            {user?.purchasedCourses?.map((course) => (
              <li key={course.courseId} className="purchasedCourse">
                <h3>{course.title}</h3>
              </li>
            ))}
          </ul>
        ) : (
          <p>🙄 لا يوجد كورسات مدفوعة حاليا </p>
        )}
      </div>
    </div>
  );
}

export default User;
