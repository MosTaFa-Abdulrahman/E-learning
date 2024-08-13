import { useState, useEffect } from "react";
import { makeRequest } from "../../../requestMethod";
import { useDispatch } from "react-redux";
import { updateCourse } from "../../../redux/courseSlice";
import upload from "../../../upload";
import Spinner from "../../../components/spinner/Spinner";
import { toast } from "react-toastify";

function UpdateCourse({ course, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(course.courseImg || "");
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course?.description || "");
  const [price, setPrice] = useState(course.price);
  const [className, setClassName] = useState(course.className);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(course.title);
    setDescription(course?.description);
    setClassName(course.className);
    setPrice(course.price);
    setFilePreview(course?.courseImg);
  }, [course]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      setFilePreview(fileURL);
    } else {
      setFilePreview("");
    }
  };

  // Handle Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let courseImg;
      courseImg = file ? await upload(file) : course.courseImg;

      const updatedCourseData = {
        title,
        description,
        courseImg,
        className,
        price,
      };

      const { data } = await makeRequest.put(
        `course/update/${course._id}`,
        updatedCourseData
      );
      dispatch(updateCourse(data));
      setOpen(false);
      toast.success("😍 تم التعديل بنجاح");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1 style={{ marginBottom: "10px" }}>تعديل الكورس</h1>

        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>العنوان</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="item">
            <label>الوصف</label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{
                width: "90%",
                maxWidth: "100%",
                height: "70px",
                maxHeight: "80px",
                padding: "7px",
              }}
            />
          </div>
          <div className="item">
            <label>الصف الدراسي</label>
            <select
              name="className"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
              style={{ width: "80%", padding: "10px" }}
            >
              <option value="">اختار الصف الدراسي</option>
              <option value="أولي اعدادي">أولي اعدادي</option>
              <option value="ثانية اعدادي">ثانية اعدادي</option>
              <option value="ثالثة اعدادي">ثالثة اعدادي</option>
              <option value="أولي ثانوي">أولي ثانوي</option>
              <option value="ثانية ثانوي">ثانية ثانوي</option>
              <option value="ثالثة ثانوي">ثالثة ثانوي</option>
            </select>
          </div>
          <div className="item">
            <label>السعر</label>
            <input
              type="number"
              placeholder="سعر الكورس"
              onChange={(e) => setPrice(e.target.value)}
              required
              min={150}
              max={5000}
              value={price}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid gray",
                borderRadius: "10px",
              }}
            />
          </div>
          <div className="item">
            <label>الصورة</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {filePreview && (
              <div className="image-preview">
                <img
                  src={filePreview}
                  alt="Selected preview"
                  style={{
                    width: "80%",
                    height: "150px",
                    objectFit: "fill",
                  }}
                />
              </div>
            )}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "...جاري التعديل" : "تعديل"}
          </button>
        </form>

        {loading && (
          <div className="loading-overlay">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateCourse;
