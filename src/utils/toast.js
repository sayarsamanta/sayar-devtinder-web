import toast from "react-hot-toast";

export const showToast = (message, type = "success") => {
  //use react-hot-toast to show toast message
  // type can be success, error, warning, info
  if (type === "success") {
    toast.success(message, {
      position: "bottom-right",
    });
  } else if (type === "error") {
    toast.error(message, {
      position: "bottom-right",
    });
  } else if (type === "warning") {
    toast.warning(message, {
      position: "bottom-right",
    });
  } else if (type === "info") {
    toast.info(message, {
      position: "bottom-right",
    });
  }
};
