import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { showToast } from "../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { setFeed } from "../app/slice/feedSlice";

const useSearchFeed = () => {
  const user = useSelector((state) => state.user);
  const { _id } = user?.user || {};
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const searchFeed = async (search) => {
    setLoading(true);
    try {
      const res = await axios.get(
        API_BASE_URL + `/user/feed?search=${search}`,
        {
          withCredentials: true,
        }
      );
      setFeed(res.data);
      dispatch(setFeed(res?.data || []));
    } catch (err) {
      showToast("Failed to fetch feed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return { searchFeed, loading };
};
export default useSearchFeed;
