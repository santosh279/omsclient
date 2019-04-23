import axios from 'axios'
import * as Types from './actions.types'

const API_URL = 'http://localhost:3003'
export function login (loginData) {
  let request = axios(`${API_URL}/users/login`, {
    method: 'POST',
    data: loginData
  })
  return dispatch => {
    request
      .then(res => {
        console.log('inside the login page', res)
        if (
          res.data &&
          res.data.data &&
          res.data.data.success &&
          res.statusText === 'OK'
        ) {
          return dispatch({
            type: Types.LOGIN_SUCCESS,
            payload: res.data
          })
        } else {
          return dispatch({
            type: Types.LOGIN_FAIL,
            payload: res.data
          })
        }
      })
      .catch(error => {
        console.log('respinse inside the rerr', error.toString())
        if (error.toString() === 'Network Error') {
          // conso
          let error = {
            response: {
              error: {
                data: {
                  success: false,
                  message: 'Network Error, Please connect to the server'
                }
              }
            }
          }
          return dispatch({
            type: Types.LOGIN_FAIL,
            payload: error.response
          })
        } else {
          return dispatch({
            type: Types.LOGIN_FAIL,
            payload: error.response
          })
        }
      })
  }
}

export function register (registerData) {
  let request = axios(`${API_URL}/users/register`, {
    method: 'POST',
    data: registerData
  })
  return dispatch => {
    request
      .then(res => {
        if (
          res.data &&
          res.data.success &&
          res.data.message &&
          res.statusText === 'Created'
        ) {
          return dispatch({
            type: Types.REGISTER_SUCCESS,
            payload: res.data
          })
        } else {
          return dispatch({
            type: Types.REGISTER_FAIL,
            payload: res.data
          })
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          return dispatch({
            type: Types.REGISTER_FAIL,
            payload: error.response
          })
        }
      })
  }
}

export function logout () {
  let access_token = JSON.parse(localStorage.getItem('access_token'))
  let request = axios.get(`http://localhost:3003/users/logout`, {
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  })
  return dispatch => {
    request
      .then(res => {
        if (
          res.data &&
          res.data.success &&
          res.data.message &&
          res.statusText === 'OK'
        ) {
          return dispatch({
            type: Types.LOGOUT_SUCCESS,
            payload: res.data
          })
        } else {
          return dispatch({
            type: Types.LOGOUT_FAIL,
            payload: res.data
          })
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          return dispatch({
            type: Types.LOGOUT_FAIL,
            payload: error.response
          })
        }
      })
  }
}
