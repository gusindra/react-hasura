const updateCart = (state = 0, action) => {
    switch (action.type) {
        case "ADDTOCART":
            return state + 1;
        case "REMOVEFROMCART":
            return state - 1;
        default:
            return state;
    }
};

export default updateCart;