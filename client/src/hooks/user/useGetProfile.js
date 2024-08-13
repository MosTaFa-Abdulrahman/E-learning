import { useEffect, useState } from "react";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";

// User Controller
function useGetProfile(id) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);
      try {
        const res = await makeRequest.get(`/user/find/${id}`);
        if (!res.data) {
          return toast.error("Not Found User 😥");
        } else setUser(res.data);
      } catch (error) {
        setError(error.message);
        toast.error(`${error.message} 😥`);
      } finally {
        setIsLoading(false);
      }
    };
    getProfile();
  }, []);

  return { isLoading, error, user };
}

export default useGetProfile;
