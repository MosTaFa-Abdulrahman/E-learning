import "./dataTable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { NavLink } from "react-router-dom";

const DataTable = (props) => {
  const {
    handlePay,
    handleCourseChange,
    selectedCourses,
    courses,
    purchasedCourses,
  } = props;

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "profilePic",
      headerName: "الصورة",
      width: 60,
      renderCell: (params) => (
        <img
          src={
            params.row.profilePic ||
            "https://cdn-icons-png.flaticon.com/128/17434/17434028.png"
          }
          alt=""
        />
      ),
    },
    {
      field: "username",
      type: "string",
      headerName: "الاسم",
      width: 100,
    },
    {
      field: "email",
      type: "string",
      headerName: "الايميل",
      width: 200,
    },
    {
      field: "phone",
      type: "string",
      headerName: "التليفون",
      width: 200,
    },
    {
      field: "selectCourse",
      headerName: "اختار الكورس",
      width: 200,
      renderCell: (params) => {
        const purchasedCourseIds = (params.row.purchasedCourses || []).map(
          (pc) => pc.courseId.toString()
        );
        const userSelectedCourse = selectedCourses[params.row._id];

        return (
          !purchasedCourseIds.includes(userSelectedCourse) && (
            <select
              value={userSelectedCourse || ""}
              onChange={(e) =>
                handleCourseChange(params.row._id, e.target.value)
              }
            >
              <option value="">اختار الكورس</option>
              {courses?.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          )
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const purchasedCourseIds = (params.row.purchasedCourses || []).map(
          (pc) => pc.courseId.toString()
        );
        const userSelectedCourse = selectedCourses[params.row._id];
        const isCoursePaid = purchasedCourseIds.includes(userSelectedCourse);

        return isCoursePaid ? (
          <button disabled style={{ padding: "2px", borderRadius: "5px" }}>
            تم الدفع مسبقا
          </button>
        ) : (
          <button
            style={{
              backgroundColor: "teal",
              color: "white",
              padding: "5px",
              border: "none",
              outline: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => handlePay(params.row._id)}
          >
            ادفع
          </button>
        );
      },
    },

    {
      field: "profile",
      headerName: "البروفايل",
      width: 100,
      renderCell: (params) => (
        <NavLink
          to={`/admin/user/${params.row._id}`}
          style={{ textDecoration: "none" }}
        >
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "5px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            الحساب
          </button>
        </NavLink>
      ),
    },
  ];

  return (
    <div className="dataTableWrapper">
      <div className="dataTable">
        <DataGrid
          className="dataGrid"
          rows={props.rows}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
        />
      </div>
    </div>
  );
};

export default DataTable;
