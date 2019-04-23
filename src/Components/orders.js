import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Table from './table'
import axios from 'axios'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import SimpleModalWrapped from './createOrder'
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  customModal: {
    marginTop: '10%'
  }
})
class Orders extends React.Component {
  constructor (props) {
    super(props)
    this.getCallbackFunction = this.getCallbackFunction.bind(this)
    this.state = {
      openDialog: false,
      orders: [],
      renderAPI: false,
      helo: false
    }
  }

  componentDidMount () {
    const { dispatch } = this.props
    if (this.state.renderAPI) {
      dispatch(Actions.getOrders())
    } else {
      dispatch(Actions.getOrders())
    }
  }

  openModel = user => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  componentWillReceiveProps (nextProps) {
    if (
      (nextProps.response.data &&
        nextProps.response.success &&
        nextProps.response.data.success) ||
      (nextProps.editResp.data &&
        nextProps.editResp.success &&
        nextProps.editResp.data.success)
    ) {
      let request = axios
        .get(`http://localhost:3003/orders/_orders`, {
          headers: {
            Authorization:
              'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
          }
        })
        .then(res => {
          if (res.data && res.data.success) {
            this.setState({
              orders: res.data.data
            })
          }
        })
    }

    if (
      nextProps.getOrders &&
      nextProps.getOrders.success &&
      nextProps.getOrders.data &&
      nextProps.getOrders.data.success
    ) {
      this.setState({
        orders: nextProps.getOrders.data.data
      })
    }
  }

  getCallbackFunction = props => {}

  render () {
    const { classes } = this.props
    const { open } = this.state
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper} style={{ width: '135%' }}>
              <div
                style={{
                  color: 'black',
                  textAlign: 'left',
                  padding: '15px',
                  fontSize: '20px'
                }}
              >
                {"Order's list"}
                <a
                  href='javascript:void(0)'
                  onClick={() => {
                    this.openModel()
                  }}
                  color='primary'
                  className='caret btn-sm mr-10 d-flex'
                  style={{
                    float: 'right',
                    padding: '3px 22px',
                    textDecoration: 'none',
                    outline: 'none'
                  }}
                >
                  <i class='fa fa-shopping-cart' style={{ fontSize: '20px' }} />
                  <span style={{ fontSize: '1rem', marginLeft: '0.5rem' }}>
                    {' '}
                    Create Order
                  </span>
                </a>
              </div>
              <Table orders={this.state.orders} />
            </Paper>
          </Grid>
        </Grid>
        {open ? (
          <SimpleModalWrapped isOpen={open} isClose={this.handleClose} />
        ) : (
          <SimpleModalWrapped isOpen={open} isClose={this.handleClose} />
        )}
      </div>
    )
  }
}

Orders.propTypes = {
  classes: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    response: state.deleteOrder,
    getOrders: state.getOrders,
    editResp: state.editOrder
  }
}
export default connect(mapStateToProps)(withStyles(styles)(Orders))
