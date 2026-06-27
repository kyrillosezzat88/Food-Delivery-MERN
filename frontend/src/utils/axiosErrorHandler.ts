import { isAxiosError } from "axios";
import { toast } from "react-toastify";
const UNEXPECTED_ERROR = "An unexpected error occurred";

const axiosErrorHandler = (error: unknown): string => {
  if (!isAxiosError(error)) return UNEXPECTED_ERROR;

  const message =
    error.response?.data?.errors?.map((e: { message: string }) => e.message) ||
    error.response?.data?.message ||
    error.message ||
    UNEXPECTED_ERROR;

  const status = error.response?.status;

  if (status === 401 && window.location.pathname !== "/auth") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth";
    return message;
  }

  if (status === 404) {
    window.location.href = "/notFound";
    return message;
  }

  if (import.meta.env.DEV) {
    console.error("Axios error:", {
      message: error.message,
      response: error.response?.data,
    });
  }
  if (Array.isArray(message)) {
    message.forEach((msg) => toast.error(msg));
  } else {
    toast.error(message);
  }
  return message;
};

export default axiosErrorHandler;
