import { useEffect, useState } from "react";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";

// Admin Controller
function useGetRandomUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const [randomUsers, setRandomUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRandomUsers = async () => {
      setIsLoading(true);
      try {
        const res = await makeRequest.get("/user/get/random");
        if (!res.data) {
          return toast.error("Not Found Random Users 😥");
        } else setRandomUsers(res.data);
      } catch (error) {
        setError(error.message);
        toast.error(`${error.message} 😥`);
      } finally {
        setIsLoading(false);
      }
    };
    getRandomUsers();
  }, []);

  return { isLoading, error, randomUsers };
}

export default useGetRandomUsers;
