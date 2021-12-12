import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { setLogin, setLogout } from "store/auth";

export function RequireAuth({ children }: { children: JSX.Element }) {
    const location = useLocation();
    const dispatch = useDispatch();

    const authenticated = useSelector((state: any) => state.auth.authenticated)
    const token = localStorage.getItem("access_token");
  

    if(token) {
        dispatch(setLogin())
    } else {
        dispatch(setLogout())
    }


    if (!authenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}