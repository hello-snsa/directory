import React, { lazy, Suspense } from "react";
import { Route, Routes as RouteGroup } from "react-router-dom";

export default function Routes() {
    const Homepage = lazy(() => import('../pages/Homepage'));
    const Profile = lazy(() => import('../pages/Profile'));

    return (
        <Suspense fallback={<div className="loader"></div>} >
            <RouteGroup>
                <Route path="/" element={<Homepage />} />
                <Route path="profile" element={<Profile />} >
                    <Route path=":id" element={<Profile />} />
                </Route>
                <Route path="*" element={<h1 >Page not found </h1>} />
            </RouteGroup>
        </Suspense>
    );
}