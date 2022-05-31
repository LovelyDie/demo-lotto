import MainLayout from '../../layout/MainLayout'
import { Route, Routes } from 'react-router-dom'
import React, { lazy, Suspense } from 'react'

const ViewHome = lazy(() => import('./Home'))
const ViewApp = lazy(() => import('./Application'))

const App = (props) => {
    return (
        <MainLayout>
            <Suspense fallback={<div className="loading"/>}>
                <Routes>
                    <Route exact path="/app/home" element={<ViewHome {...props} />}/>
                    <Route exact path="/app/application" element={<ViewApp {...props} />}/>
                </Routes>
            </Suspense>
        </MainLayout>
    )
}

export default App