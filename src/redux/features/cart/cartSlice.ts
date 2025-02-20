// src/types.ts
export interface TProduct {
    _id: string; // Assuming each product has a unique id
    name: string;
    price: number;
    count?: number; // Add count property
}

// src/redux/cartSlice.ts


// src/redux/cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// Define a type for the cart state
interface CartState {
    cartItems: TProduct[];
}

// Define the initial state using the CartState type
const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<TProduct>) => {
            const { _id, count } = action.payload; // Destructure the payload to get id and count
            const existingProductIndex = state.cartItems.findIndex(item => item._id === _id);
            if (existingProductIndex >= 0) {
                // Product exists, increment the count
                const existingProduct = state.cartItems[existingProductIndex];
                console.log("existingProduct",existingProduct);
                existingProduct.count! += count; // Increment the existing count
            } else {
                // Product doesn't exist, add it to the cart with the specified count

                const newProduct = { ...action.payload, count }; // Use the count from the payload
                console.log("newProduct",newProduct);
                state.cartItems.push(newProduct);
            }
        },
    
        // You can add more reducers here (like removing items, updating quantities, etc.)
    },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;