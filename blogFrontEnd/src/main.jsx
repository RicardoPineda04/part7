import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import notificationReducer from "./reducers/notificationReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        notification: notificationReducer,
    }
})

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
