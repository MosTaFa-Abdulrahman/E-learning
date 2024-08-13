import "./userLookup.scss";
import { useState } from "react";
import { makeRequest } from "../../../requestMethod";

const UserLookup = () => {
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await makeRequest.get(
        `/user/get-user-by-email?email=${email}`
      );
      setUserData(data);
      setError("");
    } catch (error) {
      setError("User not found");
      setUserData(null);
    }
  };

  return (
    <div className="user-lookup-container">
      <div className="user-lookup">
        <h2>متابعة ولي الامر</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              :الايميل
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit">ابحث</button>
        </form>

        {error && <p className="error">{error}</p>}

        {userData && (
          <div className="user-info">
            <div className="profile-card">
              <img
                src={
                  userData?.profilePic ||
                  "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                }
                alt="Profile"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
              <div className="profile-details">
                <h3>{userData.username}</h3>
                <p>
                  {userData.firstName} <strong>:الاسم الاول</strong>
                </p>
                <p>
                  {userData.lastName} <strong>:الاسم الثاني</strong>
                </p>
                <p>
                  {userData.email} <strong>:الايميل</strong>
                </p>
                <p>
                  {userData.phone} <strong>:هاتف الطالب</strong>
                </p>
                <p>
                  {userData.fatherPhone || "N/A"}{" "}
                  <strong>:هاتف ولي الامر</strong>{" "}
                </p>
                <p>
                  <strong>الصف الدراسي:</strong> {userData.className || "N/A"}
                </p>
              </div>
            </div>
            <div className="details-card">
              <h3>معلومات تهم حضرتك</h3>
              <div className="card-section">
                <h4>:نتائج الاختبارات</h4>
                <ul>
                  {userData?.quizResults?.map((result, index) => (
                    <li key={index}>
                      {result.score} | {result.title}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-section">
                <h4>تاريخ الامتحانات المسبقة</h4>
                <ul>
                  {userData?.completedQuizzes?.map((completed, index) => (
                    <li key={index}>
                      {new Date(completed.completedAt).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-section">
                <h4>:الكورسات المدفوعة</h4>
                <ul>
                  {userData?.purchasedCourses?.map((course, index) => (
                    <li key={index}>
                      <strong>اسم الكورس:</strong> {course.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLookup;
