import React from "react";
import useRequests from "../hook/getRequests";
import { useSelector } from "react-redux";
import RequestCard from "../components/RequestCard";
import useAcceptOrRejectRequest from "../hook/acceptOrRejectRequest";
import { showToast } from "../utils/toast";

const Requests = () => {
  const { loading, error } = useRequests();
  const requests = useSelector((state) => state.user.requests);
  const { acceptOrRejectRequest } = useAcceptOrRejectRequest();

  const acceptOrReject = async (requestId, status) => {
    // Implement the logic to accept or reject the request
    try {
      await acceptOrRejectRequest(requestId, status);
      showToast("Request " + status + " successfully.", "success");
    } catch (error) {
      showToast("Failed to update request status. Please try again.", "error");
    }
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
  if (!requests || requests?.message) {
    return (
      <div className="flex justify-center items-center text-lg text-white my-6">
        No requests received.
      </div>
    );
  }
  if (requests && requests.length > 0) {
    return (
      <div className="flex flex-col justify-center items-center mt-5">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Received Requests
        </h2>
        <ul className="space-y-4 flex flex-col justify-between p-4">
          {requests.map((request) => (
            <RequestCard
              user={request?.fromUserId}
              onAccept={() => {
                acceptOrReject(request._id, "accepted");
              }}
              onReject={() => {
                acceptOrReject(request._id, "rejected");
              }}
            />
          ))}
        </ul>
      </div>
    );
  }
};

export default Requests;
