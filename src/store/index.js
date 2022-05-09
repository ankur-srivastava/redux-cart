import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialCartState = {
    showCart: false,
    totalItems: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        toggleCart(state) {
            state.showCart = !state.showCart
        },
        addItem(state, action) {
            const tempItem = action.payload
            const existingItem = state.items.find(item => item.id === tempItem.id)
            if (!existingItem) {
                state.items.push({
                    id: tempItem.id,
                    price: tempItem.price,
                    quantity: 1,
                    title: tempItem.title,
                    totalPrice: tempItem.price,
                    description: tempItem.description
                })
            } else {
                existingItem.quantity = existingItem.quantity + 1
                existingItem.totalPrice = existingItem.quantity * existingItem.price
            }
            state.totalItems += 1
        },
        removeItem(state, action) {
            const tempItemId = action.payload
            const existingItem = state.items.find(item => item.id === tempItemId)
            if(existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== tempItemId)
            } else {
                existingItem.quantity--
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price
            }
            state.totalItems -= 1
        }
    }
})

const store = configureStore({
    reducer: cartSlice.reducer
})

export const cartActions = cartSlice.actions

export default store
