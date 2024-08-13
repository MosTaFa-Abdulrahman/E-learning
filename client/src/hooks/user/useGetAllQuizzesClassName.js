import { useEffect, useState } from "react";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";

// User Controller
function useGetAllQuizzesClassName() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quizzs, setQuizzs] = useState([]);

  useEffect(() => {
    const fetchQuizzs = async () => {
      setIsLoading(true);

      try {
        const res = await makeRequest.get("/quiz/get/all/quizzes");
        if (!res.data) {
          return toast.error("Not Found Qizzs 😥");
        } else {
          setQuizzs(res.data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(true);
      }
    };
    fetchQuizzs();
  }, []);

  return { isLoading, error, quizzs };
}

export default useGetAllQuizzesClassName;
