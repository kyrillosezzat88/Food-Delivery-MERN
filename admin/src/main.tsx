import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "@routes/AppRouter";
import "@services/axiosGlobal";
import { Provider } from "react-redux";
import store from "./store/store";
import "./services/axiosGlobal";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
);
