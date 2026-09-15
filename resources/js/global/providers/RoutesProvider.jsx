import { HashRouter, Route, Routes } from "react-router-dom"
import { NotFound } from "../pages/NotFound"
import { AuthProvider } from "../context/AuthProvider"
import { ApiProvider } from "../context/ApiProvider"

export const RoutesProvider = ({displayChildrenEvenIfNotAuthenticted, catchAllOff, children}) =>{
    return(
        <HashRouter>
            <AuthProvider displayChildrenEvenIfNotAuthenticted={displayChildrenEvenIfNotAuthenticted}>
                <ApiProvider>
                    <Routes>
                        {children}
                        {!catchAllOff && (
                            <Route path="*" element={<NotFound />} />
                        )}
                    </Routes>
                </ApiProvider>
            </AuthProvider>
        </HashRouter>
    )
}