import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { makeRequest } from "../../../requestMethod";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteCourse } from "../../../redux/courseSlice";

const CourseTable = ({ columns, rows, onUpdate }) => {
  const dispatch = useDispatch();

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <div onClick={() => onUpdate(params.row)}>
            <img
              src="https://img.icons8.com/?size=64&id=118958&format=png"
              alt="Update"
            />
          </div>
          <button
            className="delete"
            onClick={() => handleDelete(params.row._id)}
            style={{
              color: "red",
              cursor: "pointer",
              padding: "10px",
              border: "none",
              borderRadius: "10px",
            }}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      );
    },
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this Course?"))
        return;
      await makeRequest.delete(`course/delete/${id}`);
      dispatch(deleteCourse(id));
      toast.success("😍 تم الحذف بنجاح");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(`${error.message} 😥`);
    }
  };

  return (
    <div className="dataTableWrapper">
      <div className="dataTable">
        <DataGrid
          className="dataGrid"
          rows={rows}
          columns={[...columns, actionColumn]}
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

export default CourseTable;
