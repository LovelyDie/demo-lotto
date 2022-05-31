import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import HttpNotFound from './page/error/HttpNotFound'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { deleteTokenFromCookie, getTokenFromCookie } from './helper/AuthUtil'

const ViewPage = lazy(() => import('./page'))
const ViewApp = lazy(() => import('./page/app/Application'))
const ViewHistory = lazy(() => import('./page/app/History'))

const ViewLogin = lazy(() => import('./page/public/Login'))
const ViewRegister = lazy(() => import('./page/public/Register'))

const AuthRoute = ({path, component: Component, ...props}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const auth = getTokenFromCookie()

    const handleServerExpire = () => {
        deleteTokenFromCookie()
        navigate('/login')
    }

    return (
        <Route
            {...props}
            render={ref => {
                console.log(location)
                // if (auth) {
                return (<Component {...ref} />)
                // } else {
                //     deleteTokenFromCookie()
                //     return (
                //         <Navigate to="/login"/>
                //     )
                // }
            }}
        />
    )
}

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
                        <AuthRoute
                            path="/app"
                            component={ViewPage}
                            {...props}
                        />
                        {/*<AuthRoute exact path="/app" element={<ViewPage {...props} />}/>*/}
                        <Route exact path="login" element={<ViewLogin {...props} />}/>
                        <Route exact path="register" element={<ViewRegister {...props} />}/>
                        {/*<Route exact path="application" element={<ViewApp {...props}/>}/>*/}
                        {/*<Route exact path="history" element={<ViewHistory {...props}/>}/>*/}
                        <Route path="*" element={<HttpNotFound {...props} />}/>
                    </Routes>
                </Router>
            </ThemeProvider>
        </Suspense>
    )
}

export default App
