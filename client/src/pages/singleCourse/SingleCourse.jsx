import "./singleCourse.scss";
import { useParams } from "react-router-dom";
import useGetSingleCourse from "../../hooks/user/useGetSingleCourse";
import CollapsibleSection from "../../components/user/collapsibleSection/CollapsibleSection";
import Spinner from "../../components/spinner/Spinner";
import useGetSectionsBelongToCourse from "../../hooks/user/useGetSectionsBelongToCourse";
import { useSelector } from "react-redux";
import { useState } from "react";
import PayModal from "../../components/payModal/PayModal";

function SingleCourse() {
  const { userInfo: currentUser } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { isLoading, error, course } = useGetSingleCourse(id);
  const {
    isLoading: loadingSections,
    error: errSections,
    sections,
  } = useGetSectionsBelongToCourse(id);

  const [isModalOpen, setModalOpen] = useState(false);

  const handlePayClick = () => {
    setModalOpen(true);
  };

  if (isLoading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  // Check Paid or Not
  const hasPurchasedCourse = currentUser?.purchasedCourses?.some(
    (course) => course?.courseId === id
  );

  return (
    <div className="singleCourse">
      <div className="contUserCourseInfo">
        <div className="userDetails">
          {course?.createdBy?.profilePic && (
            <img
              src={course?.createdBy?.profilePic}
              alt={course?.createdBy?.username}
              className="user-image"
            />
          )}
          <div className="userInfoName">
            <div>{course?.createdBy?.firstName}</div>
            <div>{course?.createdBy?.lastName}</div>
          </div>
          <div className="userStar">
            <img
              src="https://cdn-icons-png.flaticon.com/128/616/616490.png"
              className="starIcon"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/616/616490.png"
              className="starIcon"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/616/616490.png"
              className="starIcon"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/616/616490.png"
              className="starIcon"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/616/616490.png"
              className="starIcon"
            />
          </div>
          <div className="simpleUserDesc">
            <p style={{ color: "black" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>

        <div className="course-details">
          {course.courseImg && (
            <img
              src={course?.courseImg}
              alt={course?.title}
              className="course-image"
            />
          )}
          <h1 className="course-title">{course.title}</h1>
          <p className="course-className" style={{ color: "lightslategrey" }}>
            {course.className}
          </p>
          <p className="course-description">{course.description}</p>
        </div>
      </div>

      <div className="course-sections">
        {hasPurchasedCourse ? (
          <div>
            {loadingSections ? (
              <Spinner />
            ) : errSections ? (
              "Error... 😥"
            ) : sections.length > 0 ? (
              sections?.map((section) => (
                <CollapsibleSection key={section._id} section={section} />
              ))
            ) : (
              <p>لا توجد وحدات متاحة حاليا</p>
            )}
          </div>
        ) : (
          <div className="payContainer">
            <button className="payBtn" onClick={handlePayClick}>
              ادفع
            </button>
          </div>
        )}
      </div>

      <PayModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default SingleCourse;
