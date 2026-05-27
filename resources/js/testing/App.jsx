import React, { useEffect } from "react"
import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import { ApiPost } from "./pages/ApiPost"
import { routes } from "../global/routes/Routes";
import { UuidGenerator } from "./pages/UuidGenerator";

export const App = () =>{
    return (
        <HashRouter>
            <Routes>
                <Route path="/api/post" element={<ApiPost />} />
                <Route path="/uuid/generator" element={<UuidGenerator />} />
                <Route path="/" element={<Navigate to="/api/post" />} />
            </Routes>
        </HashRouter>
    )
}
