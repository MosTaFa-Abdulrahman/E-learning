import { useState } from "react";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.warning("Fill All This Fields Please 😍");
    }
    if (password.length < 6) {
      return toast.warning("Password less than 6 digits 🙄");
    }

    if (loading) return;
    setLoading(true);

    try {
      const { data } = await makeRequest.post("auth/login", {
        email,
        password,
      });
      dispatch(setCredentials(data));
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Redirect based on user role or default to home
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast.success("Login Successful 😍");
    } catch (error) {
      toast.error(`${error.response?.data?.error || error.message} 😥`);
      setError(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authBody">
      <div className="containerRegister">
        <div className="title">تسجيل الدخول</div>
        <div className="content">
          <form onSubmit={handleLogin}>
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
                <span className="details">الباسورد</span>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="اضف الباسورد"
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

              <NavLink
                to="/update-password"
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "end",
                  flex: 1,
                  textDecoration: "none",
                }}
              >
                <span>Forget Password?</span>
              </NavLink>
            </div>

            <NavLink to="/register" className="linkLine">
              <div style={{ color: "blue" }}>Go Register</div>
            </NavLink>

            {error && (
              <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>
            )}

            <div className="button">
              <input
                type="submit"
                value={loading ? "جاري التسجيل..." : "تسجيل الدخول"}
                disabled={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
