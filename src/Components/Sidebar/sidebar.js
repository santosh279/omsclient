import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import Router from './routes'
import { Link, withRouter } from 'react-router-dom'
import { MenuList, MenuItem, Snackbar } from '@material-ui/core'
import { connect } from 'react-redux'
import * as Actions from '../../actions'

const drawerWidth = 220

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: 'black'
    // height: '17%'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  button: {
    margin: theme.spacing.unit,
    color: '#f8f8f8'
  },
  input: {
    display: 'none'
  }
})

class Sidebar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      respMessage: '',
      respSuccess: false
    }
  }

  logOut = () => {
    const { dispatch } = this.props
    dispatch(Actions.logout())
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.logout &&
      nextProps.logout.error &&
      nextProps.logout.error.data &&
      !nextProps.logout.error.data.success
    ) {
      this.setState({
        respMessage: nextProps.logout.error.data.message,
        respSuccess: true
      })
    } else {
      if (
        nextProps.logout &&
        nextProps.logout.data &&
        nextProps.logout.data.success &&
        nextProps.logout.data.message
      ) {
        this.setState({
          respMessage: nextProps.logout.data.message,
          respSuccess: true
        })
        localStorage.clear()
        window.location.href = '/login'
      } else {
        this.setState({
          respMessage: '',
          respSuccess: false
        })
      }
    }
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
  handleClose = () => {
    this.setState({
      respSuccess: false
    })
  }
  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar>
            <div>{'Order Management Console'}</div>
            <Typography variant='h6' color='inherit' noWrap>
              <Button
                style={{
                  width: '83px',
                  paddingLeft: '6px',
                  marginTop: '15px',
                  marginRight: '40px',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  color: 'white',
                  outline: 'none'
                }}
                className={classes.button}
                onClick={this.logOut}
              >
                Sign out
              </Button>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant='permanent'
          classes={{
            paper: classes.drawerPaper
          }}
          anchor='left'
        >
          <Typography
            variant='h5'
            color='inherit'
            style={{
              textAlign: 'center',
              marginTop: '10px',
              backgroundColor: 'black',
              marginTop: '0%',
              // marginLeft: '10%'
            }}
            noWrap
          >
            <img
              src='data:image/jpeg;base64,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'
              style={{
                height: '57px',
                width: '167px',
                marginTop: '3%',
                maxWidth: '40%'
              }}
              alt={localStorage.getItem('user')}
            />
          </Typography>
          <Divider style={{ marginTop: '3px' }} />
          <MenuList>{this.sideList(Router)}</MenuList>
        </Drawer>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={this.handleClose}
          open={this.state.respSuccess}
          message={this.state.respMessage}
          autoHideDuration={4000}
        />
      </div>
    )
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    logout: state.logoutResp
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Sidebar)))
