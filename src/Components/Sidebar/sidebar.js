// import React from 'react'
// import PropTypes from 'prop-types'
// import { withStyles } from '@material-ui/core/styles'
// import Drawer from '@material-ui/core/Drawer'
// import CssBaseline from '@material-ui/core/CssBaseline'
// import AppBar from '@material-ui/core/AppBar'
// import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'
// import Divider from '@material-ui/core/Divider'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
// import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import Router from './routes'
import { Link, withRouter } from 'react-router-dom'
import { MenuList, MenuItem } from '@material-ui/core'
import { connect } from 'react-redux'

// const drawerWidth = 240

// const styles = theme => ({
//   root: {
//     display: 'flex'
//   },
//   appBar: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: drawerWidth,
//     backgroundColor: '#090909'
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0
//   },
//   drawerPaper: {
//     width: drawerWidth
//   },
//   toolbar: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing.unit * 3
//   },
//   button: {
//     margin: theme.spacing.unit,
//     color: '#f8f8f8'
//   },
//   input: {
//     display: 'none'
//   }
// })

// class Sidebar extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {}
//   }

//   activeRoute (routeName) {
//     return this.props.location.pathname.indexOf(routeName) > -1
//   }
//   sideList = Router => {
//     return Router.map((prop, key) => {
//       return (
//         <Link to={prop.path} style={{ textDecoration: 'none' }} key={key}>
//           <MenuItem selected={this.activeRoute(prop.path)}>
//             <ListItemIcon>
//               <prop.icon />
//             </ListItemIcon>
//             <ListItemText primary={prop.sidebarName} />
//           </MenuItem>
//         </Link>
//       )
//     })
//   }
//   render () {
//     const { classes } = this.props
//     return (
//       <div className={classes.root}>
//         <CssBaseline />
//         <AppBar position='fixed' className={classes.appBar}>
//           <Toolbar>
//             <Typography variant='h6' color='inherit' noWrap>
//               {localStorage.getItem('user')}
//               <Button
//                 color='primary'
//                 style={{
//                   width: '15px',
//                   marginTop: '15px',
//                   marginRight: '40px',
//                   position: 'absolute',
//                   top: 0,
//                   right: 0
//                 }}
//                 className={classes.button}
//               >
//                 Sign out
//               </Button>
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Drawer
//           className={classes.drawer}
//           variant='permanent'
//           classes={{
//             paper: classes.drawerPaper
//           }}
//           anchor='left'
//         >
//           <Typography
//             variant='h5'
//             color='inherit'
//             style={{ textAlign: 'center', marginTop: '20px' }}
//             noWrap
//           >
//             OMS-CLIENT
//           </Typography>

//           <Divider style={{ marginTop: '12px' }} />

//           <MenuList>{this.sideList(Router)}</MenuList>
//         </Drawer>
//       </div>
//     )
//   }
// }

// Sidebar.propTypes = {
//   classes: PropTypes.object.isRequired
// }

// export default withRouter(connect()(withStyles(styles)(Sidebar)))

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
    // position: 'absolute',
    // marginTop: '-20px'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
})

class Sidebar extends React.Component {
  state = {
    open: false
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  activeRoute (routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1
  }
  sideList = Router => {
    return Router.map((prop, key) => {
      return (
        <Link to={prop.path} style={{ textDecoration: 'none' }} key={key}>
          <MenuItem selected={this.activeRoute(prop.path)}>
            <ListItemIcon>
              <prop.icon />
            </ListItemIcon>
            <ListItemText primary={prop.sidebarName} />
          </MenuItem>
        </Link>
      )
    })
  }

  render () {
    const { classes, theme } = this.props
    const { open } = this.state

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h8' color='inherit' noWrap>
              Order Management System
              <Button
                style={{
                  width: '83px',
                  paddingLeft: '6px',
                  marginTop: '15px',
                  marginRight: '40px',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  color: 'white'
                }}
                className={classes.button}
              >
                Sign out
              </Button>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Typography
            variant='h10'
            color='inherit'
            style={{ textAlign: 'center', marginTop: '20px' }}
            noWrap
          >
            {localStorage.getItem('user')}
          </Typography>
          <div className={classes.drawerHeader} style={{ marginTop: '-45px' }}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <MenuList>{this.sideList(Router)}</MenuList>
        </Drawer>
      </div>
    )
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withRouter(
  connect()(withStyles(styles, { withTheme: true })(Sidebar))
)
