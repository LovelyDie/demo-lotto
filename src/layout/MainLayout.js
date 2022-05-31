import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ErrorIcon from '@mui/icons-material/Error'
import HomeIcon from '@mui/icons-material/Home'
import CasinoIcon from '@mui/icons-material/Casino'
import { useState } from 'react'
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

const MainLayout = ({children, classes, setDarkMode, darkMode}) => {
    const history = useNavigate()
    const [openDrawer, setOpenDrawer] = useState(false)

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
                        Home
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
                    <ListItem button onClick={() => history('/app/home')}>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Home Page"/>
                    </ListItem>
                    <ListItem button onClick={() => history('/app/application')}>
                        <ListItemIcon>
                            <CasinoIcon/>
                        </ListItemIcon>
                        <ListItemText primary="App Page"/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button onClick={() => history('/error')}>
                        <ListItemIcon>
                            <ErrorIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Error Page"/>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                {children}
            </main>
        </div>
    )
}

MainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainLayout)