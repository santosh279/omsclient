import * as Types from '../actions/actions.types'

const initialState = {
  success: false,
  error: {},
  data: {}
}
export const createOrder = function (state = initialState, action) {
  switch (action.type) {
    case Types.ORDER_CREATED:
      return {
        ...initialState,
        success: true,
        data: action.payload
      }
    case Types.ORDER_CREATE_FAIL:
      return {
        success: false,
        error: action.payload
      }
    default: {
      return state
    }
  }
}

const deleteInitialState = {
  success: false,
  error: {},
  data: {}
}

export const deleteOrder = function (state = deleteInitialState, action) {
  switch (action.type) {
    case Types.ORDER_DELETED_SUCCESS:
      return {
        ...deleteInitialState,
        success: true,
        data: action.payload
      }
    case Types.ORDER_DELETED_FAIL:
      return {
        success: false,
        error: action.payload
      }
    default: {
      return state
    }
  }
}

const getOrderesInitialState = {
  success: false,
  error: {},
  data: {}
}

export const getOrders = function (state = getOrderesInitialState, action) {
  switch (action.type) {
    case Types.GET_ALL_ORDERS_SUCCESS:
      return {
        ...getOrderesInitialState,
        success: true,
        data: action.payload
      }
    case Types.GET_ALL_ORDERS_FAIL:
      return {
        success: false,
        error: action.payload
      }
    default: {
      return state
    }
  }
}

const getEditOrderInitialState = {
  success: false,
  error: {},
  data: {}
}

export const editOrder = function (state = getEditOrderInitialState, action) {
  switch (action.type) {
    case Types.EDIT_ORDER_SUCCESS:
      return {
        ...getEditOrderInitialState,
        success: true,
        data: action.payload
      }
    case Types.EDIT_ORDER_FAIL:
      return {
        success: false,
        error: action.payload
      }
    default: {
      return state
    }
  }
}
