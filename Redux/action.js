import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "carts",
  initialState: {
    carts:[]
  },
  reducers: {
    addToCart: (state, action) => {
      const cart = action.payload
  
      const finds = state.carts.find((item) =>{ item.id === cart.id})
      
      if (finds) {
        state.carts = state.carts.map((item) => {
          if (item.id === cart.id) {
            console.log('exist: ')
            return {
              ...item,
              quantity: item.quantity += 1
            }
          } else {
            return item
          }
        })
      } else {
        state.carts = [
          ...state.carts,
          {
            ...cart,
            quantity: 1
          }
        ]
      }

    },
    increment(state,  action ) {
      const cart = action.payload
      return state.carts.map((item) =>
        item.id === cart.payload
          ? {
              ...item,
              quantity: item.quantity + 1,
              
            }
          : item
      );
      
    }
  }
})

export const { addToCart ,increment } = cartSlice.actions

export default cartSlice.reducer