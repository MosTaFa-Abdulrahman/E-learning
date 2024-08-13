import "./users.scss";
import { useState } from "react";
import DataTable from "../../../components/admin/dataTable/DataTable";
import useGetAllUsers from "../../../hooks/admin/useGetAllUsers";
import useGetAllCourses from "../../../hooks/admin/useGetAllCourses";
import Spinner from "../../../components/spinner/Spinner";
import { toast } from "react-toastify";
import { makeRequest } from "../../../requestMethod";

function Users() {
  const { isLoading: usersLoading, users } = useGetAllUsers();
  const { isLoading: coursesLoading, courses } = useGetAllCourses();
  const [selectedCourses, setSelectedCourses] = useState({});

  const handleCourseChange = (userId, courseId) => {
    setSelectedCourses((prev) => ({ ...prev, [userId]: courseId }));
  };

  const handlePay = async (userId) => {
    const courseId = selectedCourses[userId];
    if (!courseId) {
      return toast.warning("😏 اختار الكورس لكي تدفع");
    }
    try {
      await makeRequest.post("/user/pay", { userId, courseId });
      toast.success(" 😍 تم الدفع بنجاح");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(`Error processing payment: ${error.message}`);
    }
  };

  if (usersLoading || coursesLoading) {
    return <Spinner />;
  }

  return (
    <div className="users">
      <div className="info">
        <h1>الطلاب</h1>
      </div>

      <DataTable
        slug="admin/user"
        columns={(handlePay, handleCourseChange, selectedCourses, courses)}
        rows={users}
        handlePay={handlePay}
        handleCourseChange={handleCourseChange}
        selectedCourses={selectedCourses}
        courses={courses}
      />
    </div>
  );
}

export default Users;
