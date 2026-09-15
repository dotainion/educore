import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import { RoutesProvider } from "../../global/providers/RoutesProvider";
import { CreateAd } from "./pages/CreateAd";
import { Layout } from "./layouts/Layout";
import { ListAds } from "./pages/ListAds";
import { routes } from "../../global/routes/Routes";
import { UpdateAd } from "./pages/UpdateAd";
import { PreviewAd } from "./pages/PreviewAd";

const App = () => (
    <RoutesProvider>
        <Route element={<Layout />}>
            <Route path={routes.pannel.createAd} element={<CreateAd />} />
            <Route path={routes.pannel.updateAd()} element={<UpdateAd />} />
            <Route path={routes.pannel.listAds} element={<ListAds />} />
            <Route path={routes.pannel.previewAd()} element={<PreviewAd />} />
            <Route path={routes.default} element={<Navigate to={routes.pannel.listAds} />} />
        </Route>
    </RoutesProvider>
);

export default App;
