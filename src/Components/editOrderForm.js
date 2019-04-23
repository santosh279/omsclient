import React from 'react'
import { Snackbar } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import * as Actions from '../actions'

class EditOrderForm extends React.Component {
  state = {
    canSubmit: false,
    itemName: '',
    customerName: '',
    customerAddress: {
      city: '',
      state: '',
      country: ''
    },
    customerMobile: '',
    dueDate: '',
    amount: 0,
    alertConfig: {
      type: 'warning',
      title: ''
    },
    loading: true,
    showAlert: false,
    forChange: false,
    respMessage: '',
    respSuccess: false
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.response &&
      nextProps.response.error &&
      nextProps.response.error.data &&
      !nextProps.response.error.data.success
    ) {
      this.setState({
        respMessage: nextProps.response.error.data.message,
        respSuccess: true
      })
    } else {
      if (nextProps.response && nextProps.response.data.success) {
        this.setState({
          respMessage: nextProps.response.data.message,
          respSuccess: true
        })
      } else {
        this.setState({
          respMessage: nextProps.response.data.message,
          respSuccess: true
        })
      }
    }
  }

  askForConfirmation = obj => {
    this.setState({
      itemName: obj.itemName,
      customerName: obj.customerName,
      customerAddress: {
        state: obj.state,
        city: obj.city,
        country: obj.country
      },
      customerMobile: obj.customerMobile,
      dueDate: obj.dueDate,
      amount: obj.amount
    })
    let data = {
      itemName: this.state.itemName,
      customerName: this.state.customerName,
      customerAddress: this.state.customerAddress,
      customerMobile: this.state.customerMobile,
      dueDate: this.state.dueDate,
      amount: this.state.amount,
      id: this.props.data._id
    }
    const { dispatch } = this.props
    if (data) {
      dispatch(Actions.editOrder(data))
    }
  }

  handleClose = () => {
    this.setState({
      respSuccess: false
    })
  }
  render () {
    const { data } = this.props
    console.log(data)
    const initialValues = {
      itemName: data.itemName,
      customerName: data.customerName,
      city: data.city,
      state: data.state,
      country: data.country,
      customerMobile: data.customerMobile,
      dueDate: data.dueDate.split('T')[0],
      amount: data.amount
    }
    return (
      <React.Fragment>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            itemName: Yup.string().required('Item name is required'),
            customerName: Yup.string().required('Customer name is required'),
            city: Yup.string().required('Customer city is required'),
            state: Yup.string().required('Customer state is required'),
            country: Yup.string().required('Customer country is required'),
            customerMobile: Yup.string()
              .min(6)
              .max(15)
              .required('min 6, max 15 mobile number is required'),
            dueDate: Yup.date().required('Due date is required'),
            amount: Yup.number().required('Amount is required')
          })}
          onSubmit={(values, actions) => {
            this.askForConfirmation(values, actions)
            // actions.resetForm(initialValues)
          }}
          render={({ errors, status, touched }) => (
            <Form>
              <div>
                <h5>Edit {data.itemName}</h5>
              </div>
              <div className='form-group'>
                <label htmlFor='itemName'>Item Name</label>
                <Field
                  name='itemName'
                  type='text'
                  className={
                    'form-control' +
                    (errors.itemName && touched.itemName ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name='itemName'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='customerName'>Customer Name</label>
                <Field
                  name='customerName'
                  type='text'
                  className={
                    'form-control' +
                    (errors.customerName && touched.customerName
                      ? ' is-invalid'
                      : '')
                  }
                />
                <ErrorMessage
                  name='customerName'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='city'>Customer City</label>
                <Field
                  name='city'
                  type='text'
                  className={
                    'form-control' +
                    (errors.city && touched.city ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name='city'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='state'>Customer State</label>
                <Field
                  name='state'
                  type='text'
                  className={
                    'form-control' +
                    (errors.state && touched.state ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name='state'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='country'>Customer Country</label>
                <Field
                  name='country'
                  type='text'
                  className={
                    'form-control' +
                    (errors.country && touched.country ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name='country'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='customerMobile'>Customer Mobile</label>
                <Field
                  name='customerMobile'
                  type='text'
                  className={
                    'form-control' +
                    (errors.customerMobile && touched.customerMobile
                      ? ' is-invalid'
                      : '')
                  }
                />
                <ErrorMessage
                  name='customerMobile'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='dueDate'>Due Date</label>
                <Field
                  name='dueDate'
                  type='Date'
                  className={
                    'form-control' +
                    (errors.dueDate && touched.dueDate ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name='dueDate'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='amount'>amount</label>
                <Field
                  name='amount'
                  type='number'
                  className={
                    'form-control' +
                    (errors.amount && touched.amount ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name='amount'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
              <div className='form-group'>
                <button type='submit' className='btn btn-primary mr-2'>
                  Edit Now
                </button>
              </div>
            </Form>
          )}
        />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={this.handleClose}
          open={this.state.respSuccess}
          message={this.state.respMessage}
          autoHideDuration={4000}
        />
      </React.Fragment>
    )
  }
}

function mapStateToProps (state) {
  return {
    response: state.editOrder
  }
}

export default withRouter(connect(mapStateToProps)(EditOrderForm))
