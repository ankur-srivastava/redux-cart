import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialCartState = {
    showCart: false,
    totalItems: 0,
    items: [],
    notification: null
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
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                decsription: action.payload.decsription
            }
        }
    }
})

// An action creator that works as a Thunk
export const sendCartData = (items) => {
    return async (dispatch) => {
        dispatch(cartActions.showNotification({
            status: 'pending',
            title: 'Sending ...',
            decsription: 'sending cart data'
        }))

        const sendRequest = async() => {
            const resp = await fetch('https://test-react-2fd9a-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify(items)
            })
            if(!resp || !resp.ok) {
                throw new Error('Failed')
            }
        }
        
        try {
            await sendRequest()
        } catch(e) {
            dispatch(cartActions.showNotification({
                status: 'error', 
                title: 'Error', 
                decsription: 'Error while sending cart data'
            }))
        }

        dispatch(cartActions.showNotification({
            status: 'success', 
            title: 'Success ...', 
            decsription: 'Data Sent'
        }))
    }
}

const store = configureStore({
    reducer: cartSlice.reducer
})

export const cartActions = cartSlice.actions

export default store
