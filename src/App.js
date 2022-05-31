import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HttpNotFound from './page/error/HttpNotFound'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

const ViewPage = lazy(() => import('./page'))
const ViewHome = lazy(() => import('./page/app/Home'))
const ViewApp = lazy(() => import('./page/app/Application'))

const ViewLogin = lazy(() => import('./page/public/Login'))

const App = (props) => {
    const theme = createTheme({
        palette: {
            type: 'dark'
        }
    })

    return (
        <Suspense fallback={<div className="loading"/>}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="*" element={<HttpNotFound {...props} />}/>
                        <Route exact path="" element={<ViewPage {...props} />}/>
                        <Route exact path="login" element={<ViewLogin {...props} />}/>
                        <Route exact path="home" element={<ViewHome {...props}/>}/>
                        <Route exact path="application" element={<ViewApp {...props}/>}/>
                    </Routes>
                </Router>
            </ThemeProvider>
        </Suspense>
    )
}

export default App
