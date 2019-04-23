import * as Types from './actions.types'
import axios from 'axios'

let access_token = JSON.parse(localStorage.getItem('access_token'))
export function submitOrder (data) {
  let request = axios.post(`http://localhost:3003/orders/_createorders`, data, {
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  })
  return dispatch => {
    request
      .then(res => {
        if (res.data && res.data.success) {
          return dispatch({
            type: Types.ORDER_CREATED,
            payload: res.data
          })
        } else {
          return dispatch({
            type: Types.ORDER_CREATE_FAIL,
            payload: res.data
          })
        }
      })
      .catch(err => {
        if (err.response.status === 400) {
          return dispatch({
            type: Types.ORDER_CREATE_FAIL,
            payload: err.response
          })
        }
      })
  }
}

export function deleteOrder (orderId) {
  let request = axios.delete(`http://localhost:3003/orders/${orderId}`, {
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  })
  return dispatch => {
    request
      .then(res => {
        if (res.data && res.data.success) {
          return dispatch({
            type: Types.ORDER_DELETED_SUCCESS,
            payload: res.data
          })
        } else {
          return dispatch({
            type: Types.ORDER_DELETED_FAIL,
            payload: res.data
          })
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          return dispatch({
            type: Types.ORDER_DELETED_FAIL,
            payload: error.response
          })
        }
      })
  }
}

export function getOrders () {
  let request = axios.get(`http://localhost:3003/orders/_orders`, {
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  })
  return dispatch => {
    request
      .then(res => {
        if (res.data && res.data.success) {
          return dispatch({
            type: Types.GET_ALL_ORDERS_SUCCESS,
            payload: res.data
          })
        } else {
          return dispatch({
            type: Types.GET_ALL_ORDERS_FAIL,
            payload: res.data
          })
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          return dispatch({
            type: Types.GET_ALL_ORDERS_FAIL,
            payload: error.response
          })
        }
      })
  }
}

export function editOrder (data) {
  let id = data.id
  let request = axios.put(`http://localhost:3003/orders/${id}`, data, {
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  })
  return dispatch => {
    request
      .then(res => {
        if (res.data && res.data.success) {
          return dispatch({
            type: Types.EDIT_ORDER_SUCCESS,
            payload: res.data
          })
        } else {
          return dispatch({
            type: Types.EDIT_ORDER_SUCCESS,
            payload: res.data
          })
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          return dispatch({
            type: Types.EDIT_ORDER_FAIL,
            payload: error.response
          })
        }
      })
  }
}
