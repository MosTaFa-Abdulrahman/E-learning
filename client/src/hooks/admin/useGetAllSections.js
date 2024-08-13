import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeRequest } from "../../requestMethod";
import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
} from "../../redux/sectionSlice";

function useGetAllSections() {
  const { sections, status, error } = useSelector((state) => state.section);
  const dispatch = useDispatch();

  const fetchSections = async () => {
    dispatch(fetchStart());
    try {
      const res = await makeRequest.get("/section/find/all");
      dispatch(fetchSuccess(res.data));
    } catch (error) {
      dispatch(fetchFailure(error.message));
    }
  };

  useEffect(() => {
    fetchSections();
  }, [dispatch]);

  return { sections, status, error };
}

export default useGetAllSections;
