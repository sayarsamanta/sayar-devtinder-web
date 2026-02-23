export const getErrorMessage = (error) => {
  if (!error.response) {
    return "Network error. Please check your internet connection.";
  }

  const { status, data } = error.response;

  switch (status) {
    case 400:
      return data?.message || "Bad request. Please check your input.";

    case 401:
      return "Unauthorized. Please login again.";

    case 403:
      return "You don’t have permission to perform this action.";

    case 404:
      return "Requested data not found.";

    case 409:
      return data?.message || "Conflict occurred.";

    case 422:
      return data?.message || "Validation failed.";

    case 500:
      return "Server error. Please try again later.";

    default:
      return data?.message || "Something went wrong.";
  }
};
