import "./topBox.scss";
import useGetRandomUsers from "../../../../hooks/admin/useGetRandomUsers";
import Spinner from "../../../spinner/Spinner";

function TopBox() {
  const { isLoading, error, randomUsers } = useGetRandomUsers();

  return (
    <div className="topBox">
      <h1>الطلاب</h1>
      <div className="list">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          "Error"
        ) : (
          randomUsers?.map((user) => (
            <div className="listItem" key={user._id}>
              <div className="user">
                <img src={user?.profilePic} />
                <div className="userTexts">
                  <span className="username">{user.username}</span>
                  <span className="email">{user.email}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TopBox;
