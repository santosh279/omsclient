import * as Types from '../actions/actions.types'

const loginInitialState = {
  success: false,
  error: {},
  data: {}
}

export const login = function (state = loginInitialState, action) {
  switch (action.type) {
    case Types.LOGIN_SUCCESS:
      return {
        ...loginInitialState,
        success: true,
        data: action.payload
      }
    case Types.LOGIN_FAIL:
      return {
        success: false,
        error: action.payload
      }
    default: {
      return state
    }
  }
}

const resgisterInitialState = {
  success: false,
  error: {},
  data: {}
}

export const register = function (state = resgisterInitialState, action) {
  switch (action.type) {
    case Types.REGISTER_SUCCESS:
      return {
        ...resgisterInitialState,
        success: true,
        data: action.payload
      }
    case Types.REGISTER_FAIL:
      return {
        success: false,
        error: action.payload
      }
    default: {
      return state
    }
  }
}

const logoutInitialState = {
  success: false,
  error: {},
  data: {}
}

export const logout = function (state = logoutInitialState, action) {
  switch (action.type) {
    case Types.LOGOUT_SUCCESS:
      return {
        ...logoutInitialState,
        success: true,
        data: action.payload
      }
    case Types.LOGOUT_FAIL:
      return {
        success: false,
        error: action.payload
      }
    default: {
      return state
    }
  }
}
