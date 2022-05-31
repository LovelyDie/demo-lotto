import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HttpNotFound from './page/error/HttpNotFound'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

const ViewPage = lazy(() => import('./page'))
const ViewApp = lazy(() => import('./page/app'))

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
                        <Route exact path="app/*" element={<ViewApp {...props} />}/>
                    </Routes>
                </Router>
            </ThemeProvider>
        </Suspense>
    )
}

export default App
