import { combineReducers } from 'redux'
import { login, register, logout } from './user.reducers'
import {
  createOrder,
  deleteOrder,
  getOrders,
  editOrder
} from './orders.reducers'

const authReducers = combineReducers({
  loginResp: login,
  createOrder: createOrder,
  deleteOrder: deleteOrder,
  getOrders: getOrders,
  editOrder: editOrder,
  registerResp: register,
  logoutResp: logout
})

export default authReducers
