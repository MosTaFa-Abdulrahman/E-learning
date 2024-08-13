import { useEffect, useState } from "react";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";

// Admin Controller
function useGetPreviousCountusers() {
  const [isLoading, setIsLoading] = useState(false);
  const [previousUserCount, setPreviousUserCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPreviousUsers = async () => {
      setIsLoading(true);
      try {
        const res = await makeRequest.get("/user/get/previous-count");
        if (!res.data) {
          return toast.error("Not Found Previous Users 😥");
        } else setPreviousUserCount(res.data.count);
      } catch (error) {
        setError(error.message);
        toast.error(`${error.message} 😥`);
      } finally {
        setIsLoading(false);
      }
    };
    getPreviousUsers();
  }, []);

  return { isLoading, error, previousUserCount };
}

export default useGetPreviousCountusers;
