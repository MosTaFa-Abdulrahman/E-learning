import { useEffect, useState } from "react";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";

// Admin Controller
function useGetPreviousCountCourses() {
  const [isLoading, setIsLoading] = useState(false);
  const [previousCoursesCount, setPreviousCoursesCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPreviousCoursesCount = async () => {
      setIsLoading(true);
      try {
        const res = await makeRequest.get("/course/get/previous-count");
        if (!res.data) {
          return toast.error("Not Found Previous Courses Count 😥");
        } else setPreviousCoursesCount(res.data.count);
      } catch (error) {
        setError(error.message);
        toast.error(`${error.message} 😥`);
      } finally {
        setIsLoading(false);
      }
    };
    getPreviousCoursesCount();
  }, []);

  return { isLoading, error, previousCoursesCount };
}

export default useGetPreviousCountCourses;
