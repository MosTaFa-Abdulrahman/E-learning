import { useEffect, useState } from "react";
import { makeRequest } from "../../requestMethod";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
} from "../../redux/courseSlice";

// Admin Controller
function useGetAllCourses() {
  const [error, setError] = useState(null);
  const { courses, isLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const fetchCourses = async () => {
    dispatch(fetchStart());

    try {
      const res = await makeRequest.get("/course/get/all");
      if (!res.data) {
        return toast.error("Not Found Courses 😥");
      } else {
        dispatch(fetchSuccess(res.data));
      }
    } catch (error) {
      setError(error.message);
      dispatch(fetchFailure(error.message));
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return { isLoading, error, courses };
}

export default useGetAllCourses;
