import { Outlet } from "react-router-dom"
import { GlobalLayout } from "../../../global/layouts/GlobalLayout";
import { routes } from "../../../global/routes/Routes";
import { GrAd } from "react-icons/gr";
import { MdAdsClick } from "react-icons/md";

export const Layout = () =>{
    
    const navs = [
        { title: 'Create Ad', route: routes.pannel.createAd, icon: MdAdsClick },
        { title: 'List Ad', route: routes.pannel.listAds, icon: GrAd },
    ];

    return(
        <GlobalLayout navs={navs}>
            <div className="py-md-4">
                <Outlet />
            </div>
        </GlobalLayout>
    )
}