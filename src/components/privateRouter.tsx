import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

export function PrivateRoutes() {
    let userid = useAppSelector((state) => state.auth.isLogin);
    return (
        <>
            {userid ? <Outlet  /> : <Navigate to="/login" />};
        </>

    )

}

export  function PrivateLogin() {
    let  isAuth = useAppSelector((state) => state.auth.isLogin )
   
    return (
        <>
            {isAuth?   <Navigate to="/" /> : <Outlet  /> };
            
        </>

    )

}
