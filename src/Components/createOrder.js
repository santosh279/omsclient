import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import CreateOrderForm from './createOrderForm'
import EditOrderForm from './editOrderForm'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function getModalStyle () {
  const top = 10
  const left = 35

  return {
    top: `${top}%`,
    left: `${left}%`
  }
}
const styles = theme => ({
  paper: {
    position: 'relative',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  }
})

class SimpleModal extends React.Component {
  state = {
    open: false,
    cancel: false,
    send: false
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.createOrder && nextProps.createOrder.data.success) {
      setTimeout(() => {
        window.location.href = '/orders'
      }, 1000)
    }
  }
  handleOpen = () => {
    this.setState({ open: true, isEdit: true })
  }

  render () {
    const { classes, isOpen, isClose, isEdit, values } = this.props
    return (
      <div>
        {this.state.send ? this.props.getCallbackFunction : null}
        <Modal
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
          open={isOpen}
          onClose={this.props.isClose}
          style={{ overflowY: 'auto' }}
        >
          <div className={classes.paper} style={getModalStyle()}>
            {isEdit ? (
              <EditOrderForm data={this.props.values} />
            ) : (
              <CreateOrderForm />
            )}
            <SimpleModalWrapped />
          </div>
        </Modal>
      </div>
    )
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    createOrder: state.createOrder
  }
}

const SimpleModalWrapped = withRouter(
  connect(mapStateToProps)(withStyles(styles)(SimpleModal))
)

export default SimpleModalWrapped
