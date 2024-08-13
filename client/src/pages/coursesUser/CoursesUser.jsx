import "./coursesUser.scss";
import { useState, useEffect } from "react";
import Card from "../../components/user/card/Card";
import useGetAllCourses from "../../hooks/admin/useGetAllCourses";
import Spinner from "../../components/spinner/Spinner";

function CoursesUser() {
  const { isLoading, error, courses } = useGetAllCourses();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
    filterCourses(e.target.value);
  };

  const filterCourses = (searchValue) => {
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="courses-page">
        <div className="searchCardContainer">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by title..."
            className="search-input"
          />

          <div className="courses-grid">
            {currentCourses?.map((course) => (
              <Card key={course._id} course={course} />
            ))}
          </div>
        </div>

        <div className="pagination">
          {[
            ...Array(Math.ceil(filteredCourses.length / coursesPerPage)).keys(),
          ].map((number) => (
            <button key={number + 1} onClick={() => paginate(number + 1)}>
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default CoursesUser;
