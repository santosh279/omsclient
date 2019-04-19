import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

class Register extends React.Component {
  render () {
    return (
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          username: ''
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
          username: Yup.string().required('Username is required')
        })}
        onSubmit={fields => {
          alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
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
            <div class='col-md-6 offset-md-3' style={{ maxWidth: '35%' }}>
              <Form>
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
                  <label htmlFor='username'>User Name</label>
                  <Field
                    name='username'
                    type='text'
                    className={
                      'form-control' +
                      (errors.username && touched.username ? ' is-invalid' : '')
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
            </div>
          </div>
        )}
      />
    )
  }
}

export default Register
