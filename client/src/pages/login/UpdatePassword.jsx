import { useState } from "react";
import { toast } from "react-toastify";
import { makeRequest } from "../../requestMethod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

function UpdatePassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !newPassword) {
      return toast.warning("Please fill all fields");
    }

    if (newPassword.length < 6) {
      return toast.warning("Password must be at least 6 characters long");
    }

    setLoading(true);

    try {
      await makeRequest.put("/user/update-password", { email, newPassword });
      toast.success("Password Updated Success 🤩");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      toast.error(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authBody">
      <div className="containerRegister">
        <div className="title"> تعديل كلمة المرور</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">الايميل</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="اضف الايميل"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">الباسورد الجديد</span>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder=" ادخل الباسورد الجديد"
                    required
                  />
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </div>
              </div>
            </div>

            {error && (
              <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>
            )}

            <div className="button">
              <input
                type="submit"
                value={loading ? "جاري الحفظ..." : "حفظ"}
                disabled={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
