import { useEffect, useState } from "react";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";

// User Controller
function useGetSingleCourse(id) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState({});

  useEffect(() => {
    const getCourse = async () => {
      setIsLoading(true);
      try {
        const res = await makeRequest.get(`/course/get/${id}`);
        if (!res.data) {
          return toast.error("Not Found Course 😥");
        } else setCourse(res.data);
      } catch (error) {
        setError(error.message);
        toast.error(`${error.message} 😥`);
      } finally {
        setIsLoading(false);
      }
    };
    getCourse();
  }, []);

  return { isLoading, error, course };
}

export default useGetSingleCourse;
