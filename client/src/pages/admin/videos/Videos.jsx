import { useState, useRef, useEffect } from "react";
import useGetAllVideos from "../../../hooks/admin/useGetAllVideos";
import useGetAllCourses from "../../../hooks/admin/useGetAllCourses";
import { useDispatch } from "react-redux";
import { makeRequest } from "../../../requestMethod";
import { deleteVideo, addVideo } from "../../../redux/videoSlice";
import Spinner from "../../../components/spinner/Spinner";
import upload from "../../../upload";
import { toast } from "react-toastify";

function Videos() {
  const { videos, status, error } = useGetAllVideos();
  const { courses } = useGetAllCourses();
  const [sections, setSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [courseId, setCourseId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSections = async () => {
      if (courseId) {
        try {
          const response = await makeRequest.get(
            `/section/get/all/${courseId}`
          );
          setSections(response.data);
        } catch (error) {
          console.error("Failed to fetch sections:", error.message);
        }
      }
    };

    fetchSections();
  }, [courseId]);

  useEffect(() => {
    if (courseId) {
      const filtered = sections.filter(
        (section) => section.courseId.toString() === courseId.toString()
      );
      setFilteredSections(filtered);
    } else {
      setFilteredSections([]);
    }
  }, [courseId, sections]);

  // Filter videos based on search term
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastVideo = currentPage * itemsPerPage;
  const indexOfFirstVideo = indexOfLastVideo - itemsPerPage;
  const currentVideos = filteredVideos.slice(
    indexOfFirstVideo,
    indexOfLastVideo
  );
  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.querySelector("input").focus();
    }
  }, [isModalOpen]);

  // Handle Add
  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploading(true);

    try {
      let url = "";

      if (videoFile) {
        const uploadedUrl = await upload(videoFile, setProgress);
        setVideoUrl(uploadedUrl);
        url = uploadedUrl;
      }

      if (!title || !videoLink || !courseId || !sectionId) {
        throw new Error("All fields are required");
      }

      const newVideo = { title, videoUrl: videoLink, courseId, sectionId };
      await makeRequest.post("/video/create", newVideo);
      dispatch(addVideo(newVideo));
      setTitle("");
      // setVideoFile(null);
      // setVideoUrl("");
      setCourseId("");
      setSectionId("");
      setIsModalOpen(false);
      toast.success(" 😍 تمت الاضافة بنجاح");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Failed to add video:", error.message);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("هل انت متاكد ؟؟")) {
      try {
        await makeRequest.delete(`/video/delete/${id}`);
        dispatch(deleteVideo(id));
        toast.success(" 😍 تم الحذف بنجاح");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Failed to delete video:", error.message);
      }
    }
  };

  return (
    <div className="sections">
      <div className="headerAdmin">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1>الفيديوهات</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="ابحث الان"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="videoSearch"
              style={{
                padding: "10px",
                border: "1px solid gray",
                borderRadius: "10px",
              }}
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
            <h2 style={{ color: "lightslategray" }}>اضافة فيديو</h2>
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
                اللينك
                <input
                  type="text"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  required
                />
              </label>

              {/* <label style={{ color: "lightslategray" }}>
                Video File:
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  required
                />
              </label> */}
              <label style={{ color: "lightslategray" }}>
                الكورس
                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  required
                >
                  <option value="">اختار الكورس</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </label>
              <label style={{ color: "lightslategray" }}>
                السكشن
                <select
                  value={sectionId}
                  onChange={(e) => setSectionId(e.target.value)}
                  required
                >
                  <option value="">اختار السكشن</option>
                  {filteredSections.length ? (
                    filteredSections.map((section) => (
                      <option key={section._id} value={section._id}>
                        {section.title}
                      </option>
                    ))
                  ) : (
                    <option value="">No sections available</option>
                  )}
                </select>
              </label>
              <button type="submit" disabled={uploading}>
                {uploading ? "...جاري الاضافة" : "اضافة"}
              </button>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                كنسل
              </button>
              {loading && (
                <div className="loading-overlay">
                  <div className="spinner"></div>
                </div>
              )}
              {uploading && (
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {status === "loading" ? (
        <Spinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>اسم الفيديو</th>
                <th>عنوان الكورس</th>
                <th>عنوان السكشن</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentVideos.map((video, i) => (
                <tr key={i}>
                  <td>{video.title}</td>
                  <td>{video?.courseId?.title || "No Course Title"}</td>
                  <td>{video?.sectionId?.title || "No Section Title"}</td>
                  <td>
                    <button
                      className="delete"
                      onClick={() => handleDelete(video._id)}
                      style={{
                        color: "white",
                        cursor: "pointer",
                        padding: "10px",
                        border: "none",
                        borderRadius: "10px",
                        backgroundColor: "lightcoral",
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
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
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

export default Videos;
