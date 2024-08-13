import { useEffect, useState } from "react";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";

// User Controller
function useGetRandomCourses(id) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getRandomCourses = async () => {
      setIsLoading(true);
      try {
        const res = await makeRequest.get(`/course/get/random`);
        if (!res.data) {
          return toast.error("Not Found Courses 😥");
        } else setCourses(res.data);
      } catch (error) {
        setError(error.message);
        toast.error(`${error.message} 😥`);
      } finally {
        setIsLoading(false);
      }
    };
    getRandomCourses();
  }, []);

  return { isLoading, error, courses };
}

export default useGetRandomCourses;
