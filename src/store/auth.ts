import { createSlice, configureStore } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'authenticated',
    initialState: {
      authenticated: false
    },
    reducers: {
        setLogin: state => {
        state.authenticated = true;
      },
      setLogout: state => {
        state.authenticated = false;
      }

    }
  })


export const { setLogin, setLogout } = authSlice.actions
export default authSlice.reducer
