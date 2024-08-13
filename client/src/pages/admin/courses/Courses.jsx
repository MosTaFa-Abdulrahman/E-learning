import { useState } from "react";
import useGetAllCourses from "../../../hooks/admin/useGetAllCourses";
import Spinner from "../../../components/spinner/Spinner";
import CourseTable from "../../../components/admin/courseTable/CourseTable";
import AddCourse from "../../../components/admin/addCourse/AddCourse";
import UpdateCourse from "../../../components/admin/updateCourse/UpdateCourse";

const columns = [
  {
    field: "_id",
    headerName: "ID",
    width: 70,
  },
  {
    field: "courseImg",
    headerName: "الصورة",
    width: 55,
    renderCell: (params) => {
      return (
        <img
          src={
            params.row.courseImg ||
            "https://cdn-icons-png.freepik.com/256/13445/13445069.png?ga=GA1.1.1667782128.1709944355&semt=ais_hybrid"
          }
          alt="Course"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src =
              "https://cdn-icons-png.freepik.com/256/13445/13445069.png?ga=GA1.1.1667782128.1709944355&semt=ais_hybrid";
          }}
        />
      );
    },
  },
  {
    field: "title",
    type: "string",
    headerName: "العنوان",
    width: 150,
  },
  {
    field: "price",
    type: "number",
    headerName: "السعر",
    width: 100,
  },
  {
    field: "className",
    type: "string",
    headerName: "الصف الدراسي",
    width: 150,
  },
  {
    field: "description",
    type: "string",
    headerName: "الوصف",
    width: 300,
  },
];

function Courses() {
  const { isLoading, courses } = useGetAllCourses();
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleUpdate = (course) => {
    setSelectedCourse(course);
    setOpenUpdate(true);
  };

  return (
    <div className="users" style={{ height: "100vh" }}>
      <div className="info" style={{ display: "flex", alignItems: "center" }}>
        <h1>الكورسات</h1>
        <button
          onClick={() => setOpen(true)}
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
          }}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <CourseTable columns={columns} rows={courses} onUpdate={handleUpdate} />
      )}

      {open && <AddCourse setOpen={setOpen} />}

      {openUpdate && (
        <UpdateCourse course={selectedCourse} setOpen={setOpenUpdate} />
      )}
    </div>
  );
}

export default Courses;
