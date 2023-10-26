// import { createSlice } from "@reduxjs/toolkit";

// export const cartSlice = createSlice({
//   name: "carts",
//   initialState: {
//     carts:[]
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const cart = action.payload
  
//       const finds = state.carts.find((item) =>{ item._id === cart._id})
      
//       if (finds) {
//         state.carts = state.carts.map((item) => {
//           if (item._id === cart.id) {
//             console.log('exist: ')
//             return {
//               ...item,
//               quantity: item.quantity += 1
//             }
//           } else {
//             return item
//           }
//         })
//       } else {
//         state.carts = [
//           ...state.carts,
//           {
//             ...cart,
//             quantity: 1
//           }
//         ]
//       }

//     },
//     increment(state,  action ) {
//       const cart = action.payload
//       return state.carts.map((item) =>
//         item.id === cart.payload
//           ? {
//               ...item,
//               quantity: item.quantity + 1,
              
//             }
//           : item
//       );
      
//     }
//   }
// })

// export const { addToCart ,increment } = cartSlice.actions

// export default cartSlice.reducer

import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "carts",
  initialState: {
    carts: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const cart = action.payload;

      // Check if the item is already in the cart
      const existingItem = state.carts.find((item) => item._id === cart._id);

      if (existingItem) {
        // If the item is already in the cart, update its quantity
        state.carts = state.carts.map((item) =>
          item._id === cart._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        state.carts.push({ ...cart, quantity: 1});
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
  },
});

export const { addToCart, increment } = cartSlice.actions;

export default cartSlice.reducer;