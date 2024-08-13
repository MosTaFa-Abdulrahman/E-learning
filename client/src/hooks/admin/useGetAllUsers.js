import { useEffect, useState } from "react";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";

// Admin Controller
function useGetAllUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      setIsLoading(true);
      try {
        const res = await makeRequest.get("/user/get/all");
        if (!res.data) {
          return toast.error("Not Found Users 😥");
        } else setUsers(res.data);
      } catch (error) {
        setError(error.message);
        toast.error(`${error.message} 😥`);
      } finally {
        setIsLoading(false);
      }
    };
    getAllUsers();
  }, []);

  return { isLoading, error, users };
}

export default useGetAllUsers;
