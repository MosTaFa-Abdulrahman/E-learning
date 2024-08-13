import "./sections.scss";
import { useState, useRef, useEffect } from "react";
import useGetAllSections from "../../../hooks/admin/useGetAllSections";
import useGetAllCourses from "../../../hooks/admin/useGetAllCourses";
import Spinner from "../../../components/spinner/Spinner";
import { makeRequest } from "../../../requestMethod";
import { useDispatch } from "react-redux";
import { deleteSection, addSection } from "../../../redux/sectionSlice";

function Sections() {
  const { sections, status, error } = useGetAllSections();
  const { courses } = useGetAllCourses();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newSection = { title, courseId };
      await makeRequest.post("/section/create", newSection);
      dispatch(addSection(newSection));
      setTitle("");
      setCourseId("");
      setIsModalOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Failed to Add section:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل انت متاكد من الحذف ؟؟")) {
      setLoading(true);

      try {
        await makeRequest.delete(`/section/delete/${id}`);
        dispatch(deleteSection(id));
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Failed to delete section:", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      // Focus on the first input in the modal when it opens
      modalRef.current.querySelector("input").focus();
    }
  }, [isModalOpen]);

  // Filter sections based on the search term
  const filteredSections = sections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (section.courseId?.title || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastSection = currentPage * itemsPerPage;
  const indexOfFirstSection = indexOfLastSection - itemsPerPage;
  const currentSections = filteredSections.slice(
    indexOfFirstSection,
    indexOfLastSection
  );
  const totalPages = Math.ceil(filteredSections.length / itemsPerPage);

  return (
    <div className="sections">
      <div className="headerAdmin">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1>السكاشن</h1>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="...ابحث الان"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="sectionSearch"
              style={{ border: "1px solid gray" }}
            />
            <div className="buttons">
              <button
                onClick={() => setIsModalOpen(true)}
                style={{
                  color: "white",
                  cursor: "pointer",
                  padding: "10px",
                  border: "none",
                  borderRadius: "10px",
                  backgroundColor: "lightskyblue",
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <h2 style={{ color: "lightslategray" }}>اضافة سكشن</h2>
            <form onSubmit={handleAdd}>
              <label style={{ color: "lightslategray" }}>
                العنوان
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label style={{ color: "lightslategray" }}>
                الكورس
                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit">اضافة</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                كنسل
              </button>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : status === "loading" ? (
        <Spinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>اسم السكشن</th>
                <th>عنوان الكورس</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSections?.map((section) => (
                <tr key={section._id}>
                  <td>{section.title}</td>
                  <td>{section.courseId?.title || "No Course Title"}</td>
                  <td>
                    <button
                      className="delete"
                      onClick={() => handleDelete(section._id)}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sections;
