import "./profile.scss";
import { useEffect, useState } from "react";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/authSlice";
import { useParams } from "react-router-dom";
import useGetProfile from "../../hooks/user/useGetProfile";
import Spinner from "../../components/spinner/Spinner";

const Profile = () => {
  const { id } = useParams();
  const { isLoading, error, user } = useGetProfile(id);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    fatherPhone: "",
    className: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        fatherPhone: user.fatherPhone,
        className: user.className,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await makeRequest.put(
        `/user/update/${user._id}`,
        formData
      );
      dispatch(updateUser(data));
      setEditing(false);
      toast.success(`Update Success ${user.username} 😍`);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(`${error.response?.data?.error || error.message} 😥`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backgroundImage">
      {isLoading ? (
        <Spinner />
      ) : error ? (
        "error..."
      ) : (
        <div className="profile">
          <div className="profile-header">
            <img
              src={user?.profilePic || ""}
              alt={`${user.username}'s profile`}
              className="profile-pic"
            />
            <h2>{user.username}</h2>
            <button onClick={() => setEditing(!editing)} className="edit-btn">
              {editing ? "كنسل" : "تعديل"}
            </button>
          </div>
          {editing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <label>
                :اسم المستخدم
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                :الايميل
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                :الاسم الاول
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                :الاسم الثاني
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                :التليفون
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                :تليفون ولي الامر
                <input
                  type="tel"
                  name="fatherPhone"
                  value={formData.fatherPhone}
                  onChange={handleChange}
                  required
                />
              </label>
              <label style={{ display: "flex", flexDirection: "column" }}>
                <span className="details">الصف الدراسي</span>
                <select
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  required
                  style={{
                    padding: "10px",
                    marginTop: "5px",
                    border: "none",
                    outline: "none",
                    borderRadius: "10px",
                  }}
                >
                  <option value="">اختار الصف الدراسي</option>
                  <option value="أولي اعدادي">أولي اعدادي</option>
                  <option value="ثانية اعدادي">ثانية اعدادي</option>
                  <option value="ثالثة اعدادي">ثالثة اعدادي</option>
                  <option value="أولي ثانوي">أولي ثانوي</option>
                  <option value="ثانية ثانوي">ثانية ثانوي</option>
                  <option value="ثالثة ثانوي">ثالثة ثانوي</option>
                </select>
              </label>
              <button
                type="submit"
                className="submit-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                حفظ
              </button>
            </form>
          ) : (
            <>
              <div className="profile-details">
                <p>{user.email} :الايميل</p>
                <p>{user.firstName} :الاسم الاول</p>
                <p> {user.lastName} :الاسم الثاني</p>
                <p> {user.phone} :النليفون</p>
                <p>{user.fatherPhone} :رقم ولي الامر</p>
                <p> {user.className}</p>
                {/* <p>Role: {user.role}</p> */}
              </div>
              <div className="profile-section">
                <h3>الكورسات تمت دفعها</h3>
                <ul>
                  {user?.purchasedCourses?.length > 0 ? (
                    user?.purchasedCourses?.map((course) => (
                      <li key={course.courseId}>
                        <p>{course.title}</p>
                      </li>
                    ))
                  ) : (
                    <p>لا يوجد كورسات مدفوعة</p>
                  )}
                </ul>
              </div>
              <div className="profile-section">
                <h3>نتائج الاختبارات</h3>
                <ul>
                  {user?.quizResults?.length > 0 ? (
                    user?.quizResults?.map((result) => (
                      <li key={result.quizId}>
                        <p>{result.title} :اسم الامتحان</p>
                        <p>{result.score} :درجتك</p>
                      </li>
                    ))
                  ) : (
                    <p> لا يوجد نتائج اي اختبار</p>
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
