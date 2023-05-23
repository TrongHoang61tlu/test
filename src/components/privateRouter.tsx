import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoutes() {
    let  userid = localStorage.getItem("accessToken") == null ? false : true;
    return (
        <>
            {userid ? <Outlet  /> : <Navigate to="/login" />};
        </>

    )

}