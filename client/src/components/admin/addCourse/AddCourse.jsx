import "./addCourse.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCourse } from "../../../redux/courseSlice";
import Spinner from "../../../components/spinner/Spinner";
import { toast } from "react-toastify";
import { makeRequest } from "../../../requestMethod";

// Custom Hooks ((Upload))
import useGoogleDriveUpload from "../../../uploadDrive";
import upload from "../../../upload";

function AddCourse({ setOpen }) {
  const { userInfo: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const { upload, loading, error } = useGoogleDriveUpload();

  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(200);
  const [className, setClassName] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imgUrl = "";
      if (file) {
        imgUrl = await upload(file);
      }

      const courseData = {
        createdBy: currentUser?._id,
        title,
        description,
        courseImg: imgUrl,
        className,
        price,
      };

      const { data } = await makeRequest.post("course/create", courseData);
      dispatch(addCourse(data));
      setOpen(false);
      toast.success("😍 تمت الاضافة بنجاح");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1 style={{ marginBottom: "10px" }}>اضافة كورس جديد</h1>

        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>العنوان</label>
            <input
              type="text"
              placeholder="عنوان الكورس"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="item">
            <label>الوصف</label>
            <textarea
              type="text"
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
            <label>(EGP)السعر</label>
            <input
              type="number"
              placeholder="سعر الكورس 500"
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

          <button type="submit" disabled={isLoading}>
            {isLoading ? "...جاري الاضافة" : "اضافة"}
          </button>
        </form>

        {isLoading && (
          <div className="loading-overlay">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddCourse;
