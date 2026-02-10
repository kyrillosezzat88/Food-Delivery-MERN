import { isAxiosError } from "axios";

const axiosErrorHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    console.error("Axios error:", {
      message: error.message,
      response: error.response?.data,
    });
    return (
      error.response?.data?.message || error.message || "An error occurred"
    );
  } else {
    return "unexpected error";
  }
};

export default axiosErrorHandler;
