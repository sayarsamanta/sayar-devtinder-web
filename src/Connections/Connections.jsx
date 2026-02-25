import { useEffect } from "react";
import useConnections from "../hook/getConnections";
import { useDispatch, useSelector } from "react-redux";
import RequestCard from "../components/RequestCard";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { removeConnection } from "../app/slice/userSlice";
import { showToast } from "../utils/toast";
const Connections = () => {
  const connections = useSelector((state) => state.user.connections);
  console.log(connections);
  const { getConnections, loading, error } = useConnections();
  const dispatch = useDispatch();
  useEffect(() => {
    getConnections();
  }, []);
  const deleteConnection = async (connectionId) => {
    try {
      await axios.delete(API_BASE_URL + `disconnect/${connectionId}`, {
        withCredentials: true,
      });
      dispatch(removeConnection(connectionId));
      showToast("Connection deleted successfully.", "success");
    } catch (error) {
      showToast("Failed to delete connection. Please try again.", "error");
    }
    // Implement the logic to delete the connection
    await axios.delete(API_BASE_URL + `disconnect/${connectionId}`, {
      withCredentials: true,
    });

    dispatch(removeConnection(connectionId));
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center text-lg text-white my-6">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center text-lg text-white my-6">
        Error: {error}
      </div>
    );
  }
  if (connections?.message || connections.length === 0) {
    return (
      <div className="flex justify-center items-center text-lg text-white my-6">
        No connections received.
      </div>
    );
  }
  if (connections.length > 0) {
    return (
      <div className="flex flex-col justify-center items-center lg:ml-7 mt-5 h-[70vh]">
        <h2 className="text-2xl font-bold mb-4 text-white">Connections</h2>
        <ul className="space-y-4 flex flex-col justify-between p-4 overflow-y-auto scrollbar-hide">
          {connections.map((connection) => (
            <RequestCard
              user={connection?.fromUserId}
              status={connection?.status}
              onAccept={() => {}}
              onReject={() => {}}
              onDelete={() => {
                deleteConnection(connection._id);
              }}
            />
          ))}
        </ul>
      </div>
    );
  }
};

export default Connections;
