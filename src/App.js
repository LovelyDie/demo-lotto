import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HttpNotFound from './page/error/HttpNotFound'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

const ViewPage = lazy(() => import('./page'))
const ViewApp = lazy(() => import('./page/app/Application'))
const ViewHistory = lazy(() => import('./page/app/History'))

const ViewLogin = lazy(() => import('./page/public/Login'))
const ViewRegister = lazy(() => import('./page/public/Register'))

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
                        <Route exact path="/" element={<ViewPage {...props}/>}/>
                        <Route exact path="/application" element={<ViewApp {...props}/>}/>
                        <Route exact path="/history" element={<ViewHistory {...props}/>}/>
                        <Route exact path="/login" element={<ViewLogin {...props} />}/>
                        <Route exact path="/register" element={<ViewRegister {...props} />}/>
                    </Routes>
                </Router>
            </ThemeProvider>
        </Suspense>
    )
}

export default App
