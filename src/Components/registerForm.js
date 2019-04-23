import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Actions from '../actions'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { Snackbar } from '@material-ui/core'
import axios from 'axios'


class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      userName: '',
      respMessage: '',
      respSuccess: false,
      serverDown: false
    }
  }
  
  componentDidMount () {
    axios
      .get('http://localhost:3003/')
      .then(res => {
        console.log('response inside the start page', res)
      })
      .catch(error => {
        console.log(error.name === 'Error')
        if (error.name === 'Error') {
          this.setState({
            serverDown: true,
            respMessage: 'Server is down, please check connectivity',
            respSuccess: true
          })
        }
        console.log(this.state.serverDown)
      })
  }
  askForConfirmation = obj => {
    this.setState({
      firstName: obj.firstName,
      lastName: obj.lastName,
      userName: obj.userName,
      email: obj.email,
      password: obj.password,
      confirmPassword: obj.confirmPassword
    })
    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.userName,
      email: this.state.email,
      confirmPassword: this.state.confirmPassword,
      password: this.state.password
    }
    const { dispatch } = this.props
    const { serverDown } = this.state

    if (data && !serverDown) {
      dispatch(Actions.register(data))
    } else {
      this.setState({
        serverDown: true,
        respMessage: 'Server is down, please check connectivity',
        respSuccess: true
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.register &&
      nextProps.register.error &&
      nextProps.register.error.data &&
      !nextProps.register.error.data.success
    ) {
      this.setState({
        respMessage: nextProps.register.error.data.message,
        respSuccess: true
      })
    } else {
      if (
        nextProps.response &&
        nextProps.register.data &&
        nextProps.register.data.success &&
        nextProps.register.statusText === 'Created'
      ) {
        this.setState({
          respMessage: nextProps.register.data.message,
          respSuccess: true
        })
      } else {
        this.setState({
          respMessage: nextProps.register.data.message,
          respSuccess: true
        })
      }
    }
  }

  handleClose = () => {
    this.setState({
      respSuccess: false
    })
  }

  render () {
    return (
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          userName: ''
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required('First Name is required'),
          lastName: Yup.string().required('Last Name is required'),
          email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
          userName: Yup.string().required('userName is required')
        })}
        onSubmit={(values, actions) => {
          this.askForConfirmation(values, actions)
        }}
        render={({ errors, status, touched }) => (
          <div
            class='row'
            style={{
              marginLeft: '130px',
              marginTop: '50px',
              marginRight: '-50px'
            }}
          >
            <div
              class='col-md-6 offset-md-3'
              style={{ maxWidth: '35%', position: 'absolute' }}
            >
              <Form>
                <div>
                  <h4>Register</h4>
                </div>
                <div className='form-group'>
                  <label htmlFor='firstName'>First Name</label>
                  <Field
                    name='firstName'
                    type='text'
                    className={
                      'form-control' +
                      (errors.firstName && touched.firstName
                        ? ' is-invalid'
                        : '')
                    }
                  />
                  <ErrorMessage
                    name='firstName'
                    component='div'
                    className='invalid-feedback'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='lastName'>Last Name</label>
                  <Field
                    name='lastName'
                    type='text'
                    className={
                      'form-control' +
                      (errors.lastName && touched.lastName ? ' is-invalid' : '')
                    }
                  />
                  <ErrorMessage
                    name='lastName'
                    component='div'
                    className='invalid-feedback'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='userName'>User Name</label>
                  <Field
                    name='userName'
                    type='text'
                    className={
                      'form-control' +
                      (errors.userName && touched.userName ? ' is-invalid' : '')
                    }
                  />
                  <ErrorMessage
                    name='lastName'
                    component='div'
                    className='invalid-feedback'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <Field
                    name='email'
                    type='text'
                    className={
                      'form-control' +
                      (errors.email && touched.email ? ' is-invalid' : '')
                    }
                  />
                  <ErrorMessage
                    name='email'
                    component='div'
                    className='invalid-feedback'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <Field
                    name='password'
                    type='password'
                    className={
                      'form-control' +
                      (errors.password && touched.password ? ' is-invalid' : '')
                    }
                  />
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='invalid-feedback'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='confirmPassword'>Confirm Password</label>
                  <Field
                    name='confirmPassword'
                    type='password'
                    className={
                      'form-control' +
                      (errors.confirmPassword && touched.confirmPassword
                        ? ' is-invalid'
                        : '')
                    }
                  />
                  <ErrorMessage
                    name='confirmPassword'
                    component='div'
                    className='invalid-feedback'
                  />
                </div>
                <div className='form-group'>
                  <input
                    class='b ph4 pv2 input-reset ba b--black bg-transparent  pointer f6 dib'
                    type='submit'
                    value='Register'
                  />
                  <a
                    href='/login'
                    class='b ph4 ba b--black bg-transparent pointer f6 dib'
                    style={{
                      marginLeft: '10px',
                      color: 'black',
                      paddingBottom: '5px',
                      paddingTop: '5px',
                      textDecoration: 'none'
                    }}
                  >
                    back
                  </a>
                </div>
              </Form>
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={this.handleClose}
                open={this.state.respSuccess}
                message={this.state.respMessage}
                autoHideDuration={4000}
              />
            </div>
          </div>
        )}
      />
    )
  }
}

function mapStateToProps (state) {
  return {
    register: state.registerResp
  }
}
export default connect(mapStateToProps)(Register)
