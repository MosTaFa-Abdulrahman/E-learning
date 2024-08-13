import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeRequest } from "../../requestMethod";
import { fetchStart, fetchSuccess, fetchFailure } from "../../redux/videoSlice";

function useGetAllVideos() {
  const { videos, status, error } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const fetchVideos = async () => {
    dispatch(fetchStart());
    try {
      const res = await makeRequest.get("/video/get/all");
      dispatch(fetchSuccess(res.data));
    } catch (error) {
      dispatch(fetchFailure(error.message));
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [dispatch]);

  return { videos, status, error };
}

export default useGetAllVideos;
