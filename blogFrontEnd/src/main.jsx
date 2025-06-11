import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer"
import loginReducer from "./reducers/loginReducer"
import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        login: loginReducer
    }
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
        <App />
    </Provider>    
  </QueryClientProvider>
)
