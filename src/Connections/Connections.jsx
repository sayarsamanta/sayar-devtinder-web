import React, { useEffect } from "react";
import useConnections from "../hook/getConnections";
import { useSelector } from "react-redux";
import RequestCard from "../components/RequestCard";

const Connections = () => {
  const connections = useSelector((state) => state.user.connections);
  const { getConnections, loading, error } = useConnections();
  useEffect(() => {
    getConnections();
  }, []);
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
  if (connections.length === 0) {
    return (
      <div className="flex justify-center items-center text-lg text-white my-6">
        No connections received.
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center mt-5 h-[70vh]">
      <h2 className="text-2xl font-bold mb-4 text-white">Connections</h2>
      <ul className="space-y-4 flex flex-col justify-between p-4 overflow-y-auto scrollbar-hide">
        {connections.map((connection) => (
          <RequestCard
            user={connection?.fromUserId}
            status={connection?.status}
            onAccept={() => {}}
            onReject={() => {}}
          />
        ))}
      </ul>
    </div>
  );
};

export default Connections;
