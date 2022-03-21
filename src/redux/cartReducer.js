const initialState = {
    cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const newItem = action.payload;
            newItem.quantity = 1;
            const index = state.cartItems.findIndex((x) => x.id === newItem.id);
            console.log("state: ", state);

            if (index >= 0) {
                // increase quantity
                state.cartItems[index].quantity += newItem.quantity;
                return state;
            } else {
                // add product to cart
                return {
                    ...state,
                    cartItems: [...state.cartItems, newItem],
                };
            }
        }
        case "DELETE_FROM_CART": {
            const id = action.payload;

            const newCartItems = state.cartItems.filter(
                (item) => item.id !== id
            );
            return {
                ...state,
                cartItems: newCartItems,
            };
        }
        default:
            return state;
    }
};
