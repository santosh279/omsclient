import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { Snackbar, Paper } from '@material-ui/core'
import axios from 'axios'
class SignIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      onClick: false,
      username: '',
      password: '',
      respMessage: '',
      respSuccess: false,
      rememberMe: false,
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
            respMessage: 'Server is down, please check connectivity.',
            respSuccess: true
          })
        }
        console.log(this.state.serverDown)
      })
  }
  handleSubmit (values, actions) {
    const { username, password } = values
    const { dispatch } = this.props
    const { serverDown } = this.state
    if (username && password && !serverDown) {
      dispatch(Actions.login({ username, password }))
    } else {
      this.setState({
        serverDown: true,
        respMessage: 'Server is down, please check connectivity.',
        respSuccess: true
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.response &&
      nextProps.response.error &&
      nextProps.response.error.data &&
      !nextProps.response.error.data.success
    ) {
      this.setState({
        respMessage: nextProps.response.error.data.message
          ? nextProps.response.error.data.message
          : nextProps.response.error.data.error.message,
        respSuccess: true
      })
    } else {
      if (
        nextProps.response &&
        nextProps.response.data.data &&
        nextProps.response.data.data.success
      ) {
        this.setState({
          respMessage: nextProps.response.data.data.message,
          respSuccess: true
        })
        let access_token = JSON.stringify(
          nextProps.response.data.data.accessToken
        )
        localStorage.setItem('access_token', access_token)
        window.location.href = '/orders'
        // nextProps.history.push('/orders')
      } else {
        this.setState({
          respMessage: nextProps.response.data.message,
          respSuccess: true
        })
      }
    }
  }

  rememberMe = () => {
    localStorage.setItem('rememberMe', true)
  }

  handleClose = () => {
    this.setState({
      respSuccess: false
    })
  }

  render () {
    const initialValues = {
      username: '',
      password: ''
    }
    return (
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Username is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
        })}
        onSubmit={(values, actions) => {
          this.handleSubmit(values, actions)
          actions.resetForm(initialValues)
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
            <Paper style={{ with: '10%' }}>
              <div
                class='col-md-6 offset-md-3'
                style={{ maxWidth: '35%', position: 'absolute' }}
              >
                <Form>
                  <div>
                    <h4>Login</h4>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <Field
                      name='username'
                      type='text'
                      className={
                        'form-control' +
                        (errors.username && touched.username
                          ? ' is-invalid'
                          : '')
                      }
                    />
                    <ErrorMessage
                      name='username'
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
                        (errors.password && touched.password
                          ? ' is-invalid'
                          : '')
                      }
                    />
                    <ErrorMessage
                      name='password'
                      component='div'
                      className='invalid-feedback'
                    />
                  </div>
                  <div className='form-group'>
                    <label class='pa0 ma2 lh-copy f6 pointer'>
                      <input onClick={this.rememberMe} type='checkbox' />{' '}
                      Remember me
                    </label>
                    <div class=''>
                      <input
                        class='b ph3 pv2 input-reset ba b--black bg-transparent  pointer f6 dib'
                        type='submit'
                        value='Sign in'
                      />
                    </div>
                    <div class='lh-copy mt3'>
                      <a href='/register' class='f6 link dim black db'>
                        Sign up
                      </a>
                    </div>
                  </div>
                </Form>
              </div>
            </Paper>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              onClose={this.handleClose}
              open={this.state.respSuccess}
              message={this.state.respMessage}
              autoHideDuration={4000}
            />
          </div>
        )}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    response: state.loginResp
  }
}

export default connect(mapStateToProps)(SignIn)
