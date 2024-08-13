import { useEffect, useState } from "react";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";

// User Controller
function useGetSectionsBelongToCourse(id) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const getSectionsForCourse = async () => {
      setIsLoading(true);
      try {
        const res = await makeRequest.get(`/section/get/${id}`);
        if (!res.data) {
          return toast.error("Not Found Sections for this Course 😥");
        } else setSections(res.data);
      } catch (error) {
        setError(error.message);
        toast.error(`${error.message} 😥`);
      } finally {
        setIsLoading(false);
      }
    };
    getSectionsForCourse();
  }, []);

  return { isLoading, error, sections };
}

export default useGetSectionsBelongToCourse;
