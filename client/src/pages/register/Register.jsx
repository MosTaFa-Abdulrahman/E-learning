import "./register.css";
import { useState } from "react";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import upload from "../../upload";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";

function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [fatherPhone, setFatherPhone] = useState("");
  const [className, setClassName] = useState("");
  const [profileFile, setProfileFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to validate phone number prefix
  const isValidPhonePrefix = (phone) => {
    const validPrefixes = ["011", "012", "010", "015"];
    const prefix = phone.substring(0, 3);
    return validPrefixes.includes(prefix);
  };

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !phone) {
      return toast.warning("Fill All This Fields Please 😍");
    }

    if (password.length < 6) {
      return toast.warning("Password less than 6 digits 🙄");
    }

    if (phone.length < 11 || phone.length > 11) {
      return toast.warning("Phone must be 11 digits 😎");
    }

    if (!isValidPhonePrefix(phone)) {
      return toast.warning("Phone must start with 011, 012, 010, or 015 😎");
    }

    if (fatherPhone.length < 11 || fatherPhone.length > 11) {
      return toast.warning("Father's Phone must be 11 digits 😎");
    }

    if (!isValidPhonePrefix(fatherPhone)) {
      return toast.warning(
        "Father's Phone must start with 011, 012, 010, or 015 😎"
      );
    }

    if (loading) return;
    setLoading(true);

    try {
      let profileUrl;
      profileUrl = profileFile
        ? await upload(profileFile)
        : "https://cdn-icons-png.flaticon.com/128/17434/17434028.png";

      const { data } = await makeRequest.post("auth/register", {
        username,
        email,
        password,
        firstName,
        lastName,
        className,
        phone,
        fatherPhone,
        profilePic: profileUrl,
      });
      dispatch(setCredentials(data));
      localStorage.setItem("userInfo", JSON.stringify(data));

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast.success("Registration Successful 😍");
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
        <div className="title">انشاء حساب</div>
        <div className="content">
          <form onSubmit={handleRegister}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">الاسم الاول</span>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="ادخل الاسم الاول"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">الاسم الثاني</span>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="ادخل الاسم الثاني"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">اسم المستخدم</span>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="اضف اسم المستخدم"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">الجيميل</span>
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
              <div className="input-box">
                <span className="details">صورة شخصية</span>
                <input
                  type="file"
                  name="profilePic"
                  id="profileFile"
                  onChange={(e) => setProfileFile(e.target.files[0])}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">رقم تليفون</span>
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="ادخل رقم الهاتف"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">تليفون الوالد</span>
                <input
                  type="text"
                  name="fatherPhone"
                  value={fatherPhone}
                  onChange={(e) => setFatherPhone(e.target.value)}
                  placeholder="رقم هاتف الوالد"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">الصف الدراسي</span>
                <select
                  name="className"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
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
            </div>
            <NavLink to="/login" className="linkLine">
              <div style={{ color: "blue" }}>Go Login</div>
            </NavLink>

            {error && (
              <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>
            )}

            <div className="button">
              <input
                type="submit"
                value={loading ? "جاري التسجيل..." : "انشاء حساب"}
                disabled={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
