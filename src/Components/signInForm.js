import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

class SignIn extends React.Component {
  render () {
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
        onSubmit={fields => {
          localStorage.setItem('user', 'saja')
          window.location.href = '/orders'
        }}
        render={({ errors, status, touched }) => (
          <div class='row' style={{ marginLeft: '25px', marginTop: '50px' }}>
            <div class='col-md-6 offset-md-3' style={{ maxWidth: '35%' }}>
              <Form>
                <div className='form-group'>
                  <label htmlFor='username'>Username</label>
                  <Field
                    name='username'
                    type='text'
                    className={
                      'form-control' +
                      (errors.username && touched.username ? ' is-invalid' : '')
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
                  <label class='pa0 ma2 lh-copy f6 pointer'>
                    <input type='checkbox' /> Remember me
                  </label>
                  <div class=''>
                    <input
                      class='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
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
          </div>
        )}
      />
    )
  }
}

export default SignIn
