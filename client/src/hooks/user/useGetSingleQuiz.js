import { useEffect, useState } from "react";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";

// User Controller
function useGetSingleQuiz(id) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quiz, setQuiz] = useState({});

  useEffect(() => {
    const getQuiz = async () => {
      setIsLoading(true);
      try {
        const res = await makeRequest.get(`quiz/get/${id}`);
        if (!res.data) {
          return toast.error("Not Found Quiz 😥");
        } else setQuiz(res.data);
      } catch (error) {
        setError(error.message);
        toast.error(`${error.message} 😥`);
      } finally {
        setIsLoading(false);
      }
    };
    getQuiz();
  }, []);

  return { isLoading, error, quiz };
}

export default useGetSingleQuiz;
