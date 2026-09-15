import { Outlet } from "react-router-dom"

export const Layout = () =>{
    return(
        <div className="container py-5 vh-100">
            <Outlet />
        </div>
    )
}