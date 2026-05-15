import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/AppRouter";
import "@services/axiosGlobal";
import { Provider } from "react-redux";
import store from "@store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ToastContainer position="top-right" autoClose={3000} />
    <AppRouter />
  </Provider>,
);
