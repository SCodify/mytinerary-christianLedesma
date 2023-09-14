import { createReducer } from "@reduxjs/toolkit"
import userActions from "../actions/usersActions"

const initialState = { 
  user: null,
  token: null
}

const userReducer = createReducer(
  initialState, 
  (builder) => { return builder
  .addCase(
    userActions.sing_up.fulfilled, 
    (state, action) => {
    return { 
      ...state,
      user: action.payload
    }
  })
  .addCase(
    userActions.sing_in.fulfilled, 
    (state, action) => {
    return { 
      ...state,
      user: action.payload
    }
  })
  .addCase(
    userActions.authenticate.fulfilled, 
    (state, action) => {
    return {
      ...state,
      user : action.payload,
    }
  })
  .addCase(userActions.sing_out, (state, action) => {
    return {
      ...state,
      user: null,
      token: null
    }
  }) 
})

export default userReducer