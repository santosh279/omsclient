import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { Paper, Snackbar } from '@material-ui/core'
import SweetAlert from 'react-bootstrap-sweetalert'
import * as Actions from '../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SimpleModalWrapped from './createOrder'

class UsersTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      showAlert: false,
      alertConfig: {
        type: 'warning',
        title: ''
      },
      orderId: '',
      userDetails: {},
      respSuccess: false,
      respMessage: '',
      open: false
    }
  }

  componentWillMount () {}
  askForConfirmation = order => {
    let order_id = order._id
    this.setState({
      orderId: order_id
    })
    let alertConfig = { ...this.state.alertConfig }
    alertConfig.type = 'warning'
    alertConfig.title = 'Are you sure you want to delete Order ?'
    this.setState({
      alertConfig,
      showAlert: true
    })
  }
  afterConfirm = () => {
    this.setState({
      showAlert: false
    })
    const { dispatch } = this.props
    let orderId = this.state.orderId
    if (orderId) {
      dispatch(Actions.deleteOrder(orderId))
    }
  }
  componentWillReceiveProps (nextProps) {
    if (
      nextProps.deleteResp &&
      nextProps.deleteResp.error &&
      !nextProps.deleteResp.success &&
      !nextProps.deleteResp.error.success &&
      nextProps.deleteResp.error.message
    ) {
      this.setState({
        respSuccess: true,
        respMessage: nextProps.deleteResp.error.message
      })
    } else {
      if (
        nextProps.deleteResp &&
        nextProps.deleteResp.success &&
        nextProps.deleteResp.data.success
      ) {
        this.setState({
          respSuccess: true,
          respMessage: nextProps.deleteResp.data.message
        })
      } else {
        this.setState({
          respSuccess: false,
          respMessage: ''
        })
      }
    }
  }
  onCloseModal = () => {
    this.setState({ open: false })
  }
  editOrderModel = (i, e) => {
    this.setState({
      open: true,
      userDetails: {
        itemName: i.itemName,
        customerName: i.customerName,
        customerMobile: i.customerMobile,
        city: i.customerAddress.city,
        state: i.customerAddress.state,
        country: i.customerAddress.country,
        amount: i.amount,
        dueDate: i.dueDate,
        _id: i._id
      }
    })
  }
  handleClose = () => {
    this.setState({ respSuccess: false, open: false })
  }
  render () {
    const { orders } = this.props
    const { alertConfig, user, open } = this.state
    return (
      <div>
        <table
          className='table table-middle table-hover mb-0'
          style={{ color: 'black' }}
        >
          <thead>
            <tr>
              <th>Item name</th>
              <th>Customer Name</th>
              <th>Customer Address</th>
              <th>Customer Phone</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length ? (
              orders.map((order, key) => (
                <tr>
                  <td>
                    <h6 className='mb-1'>{order.itemName}</h6>
                  </td>
                  <td>{order.customerName}</td>
                  <td>
                    {order.customerAddress.city},{order.customerAddress.state},
                    {order.customerAddress.country}
                  </td>
                  <td>{order.customerMobile}</td>
                  <td>{order.dueDate.split('T')[0]}</td>
                  <td>{order.amount}</td>
                  <td className='list-action'>
                    <Tooltip
                      title='Edit Order'
                      placement='bottom'
                      disableFocusListener
                    >
                      <a
                        href='javascript:void(0)'
                        onClick={() => this.editOrderModel(order)}
                        style={{
                          textDecoration: 'none',
                          color: 'black',
                          marginLeft: '-15px'
                        }}
                      >
                        <i
                          style={{ fontSize: '14px', padding: '5px' }}
                          className='fas'
                        >
                          &#xf044;
                        </i>
                      </a>
                    </Tooltip>
                    <Tooltip
                      title='Delete Order'
                      placement='bottom'
                      disableFocusListener
                    >
                      <a
                        href='javascript:void(0)'
                        onClick={() => this.askForConfirmation(order)}
                        style={{
                          textDecoration: 'none',
                          position: 'absolute',
                          color: 'black'
                        }}
                      >
                        <i style={{ fontSize: '18px' }} className='fa'>
                          &#xf014;
                        </i>
                      </a>
                    </Tooltip>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className={'text-center px-30 py-30'} colSpan='7'>
                  {'No orders found'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Paper className='w-80 p-12'>
          <div className='d-flex flex-column py-20'>
            <SweetAlert
              warning
              show={this.state.showAlert}
              title={alertConfig.title}
              showCancel
              onConfirm={() => this.afterConfirm()}
              onCancel={() => {
                this.setState({
                  showAlert: false
                })
              }}
            />
          </div>
        </Paper>
        {open ? (
          <SimpleModalWrapped
            isOpen={open}
            isClose={this.handleClose}
            isEdit
            values={this.state.userDetails}
          />
        ) : (
          <SimpleModalWrapped
            isOpen={open}
            isClose={this.handleClose}
            isEdit
            values={this.state.userDetails}
          />
        )}
        {/* <div>place is for edit component</div> */}
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

function mapStateToProps (state) {
  return {
    deleteResp: state.deleteOrder,
    editResp: state.editOrder
  }
}

export default withRouter(connect(mapStateToProps)(UsersTable))
