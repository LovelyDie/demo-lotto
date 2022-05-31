import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ErrorIcon from '@mui/icons-material/Error'
import HistoryIcon from '@mui/icons-material/History'
import CasinoIcon from '@mui/icons-material/Casino'
import LogoutIcon from '@mui/icons-material/Logout'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
    AppBar,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { deleteUserFromCookie, getTokenFromCookie } from '../helper/AuthUtil'

const drawerWidth = 240

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
})

const MainLayout = ({children, classes}) => {
    const navigate = useNavigate()
    const auth = getTokenFromCookie()
    const [openDrawer, setOpenDrawer] = useState(false)

    useEffect(() => {
        if (!auth) {
            navigate('/login')
        }
    }, [])

    const handleLogout = async () => {
        try {
            deleteUserFromCookie()
            navigate('/login')
        } catch (e) {
            // handle in interceptor
        }
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="absolute"
                className={classNames(classes.appBar, openDrawer && classes.appBarShift)}
            >
                <Toolbar
                    disableGutters={!openDrawer}
                    classes={classes.toolbar}
                >
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={() => setOpenDrawer(true)}
                        className={classNames(classes.menuButton, openDrawer && classes.menuButtonHidden,)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        className={classes.title}
                        color="inherit"
                        noWrap
                    >
                        ONE NIGHT APPLICATION DEMO
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                open={openDrawer}
                classes={{
                    paper: classNames(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
                }}
            >
                <div className={classes.toolbarIcon}>
                    <Typography
                        component="h1"
                        variant="h6"
                        className={classes.title}
                        color="inherit"
                        noWrap
                    >
                        Menu
                    </Typography>
                    <IconButton onClick={() => setOpenDrawer(false)}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem button onClick={() => navigate('/application')}>
                        <ListItemIcon>
                            <CasinoIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Application"/>
                    </ListItem>
                    <ListItem button onClick={() => navigate('/history')}>
                        <ListItemIcon>
                            <HistoryIcon/>
                        </ListItemIcon>
                        <ListItemText primary="History"/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button onClick={() => navigate('/error')}>
                        <ListItemIcon>
                            <ErrorIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Error Page"/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Logout"/>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <div style={{display: 'block'}} className="px-5">
                    {children}
                </div>
            </main>
        </div>
    )
}

MainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainLayout)