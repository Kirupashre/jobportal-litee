import { configureStore } from "@reduxjs/toolkit";

import alertReducer from './alertSlice';
import notificationsReducer from "./notifications";

const store = configureStore({
    reducer: {
        alert: alertReducer,
        notification : notificationsReducer,
    },
});

export default store;