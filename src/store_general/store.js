import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../modules/auth/store/auth/authSlice";
import { adminSlice } from "../modules/gestion_usuarios/store/admin/adminSlice";
import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
    reducer: {
        auth:  authSlice.reducer,
        admin: adminSlice.reducer,
        ui:    uiSlice.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});