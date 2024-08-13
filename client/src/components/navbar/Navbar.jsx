import "./navbar.scss";
import { useSelector } from "react-redux";
import useLogout from "../../hooks/user/useLogout";

function Navbar() {
  const { userInfo: currentUser } = useSelector((state) => state.auth);
  const { handleLogout } = useLogout();

  return (
    <div className="navbar">
      <div className="logo">
        <img
          src="https://img.icons8.com/?size=80&id=vYfAxBxyukFs&format=png"
          alt=""
          style={{ width: "30px", height: "30px", borderRadius: "5px" }}
        />
        <span>Darsh</span>
      </div>

      <div className="icons">
        <div className="user">
          <img
            src={
              currentUser?.profilePic ||
              "https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            }
            alt=""
          />
          <span>
            {currentUser?.username ? currentUser?.username : "Username"}
          </span>
        </div>

        <button className="logoutBtn" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
