import { NavLink } from "react-router-dom";

function Card({ course }) {
  return (
    <div className="course-card">
      <img src={course.courseImg} alt={course.title} />
      <div className="course-info">
        <span className="category" style={{ fontWeight: "bold" }}>
          رياضيات
        </span>
        <h4>{course.title}</h4>
        <p>
          <span className="course-meta">{course.className}</span>{" "}
          {/* <span className="course-meta">{course.duration}</span> */}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p className="course-fee">Price: {course.price} EGP</p>
          <NavLink to={`/course/${course._id}`}>
            <button
              style={{
                backgroundColor: "#7C00FE",
                color: "white",
                border: "none",
                outline: "none",
                padding: "10px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              التفاصيل
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Card;
