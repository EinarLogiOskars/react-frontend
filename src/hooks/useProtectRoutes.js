import { Outlet, Navigate } from "react-router-dom";
import useToken from "./useToken";

export const ProtectRoutes = () => {
    const { token } = useToken();

    return token ? <Outlet/> : <Navigate to='/login' exact />
}