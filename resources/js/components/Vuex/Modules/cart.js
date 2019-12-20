let cart = window.localStorage.getItem('cart');
const state = {
    cart: cart ? JSON.parse(cart) : [],
    cartDialog: false,
};
const getters = {
    totalPrice: state => {
        let total = 0;
        state.cart.filter((item) => {
            total += (item.price * item.quantity);
        });
        return total;
    },
    getCart: state => {
        return state.cart;
    },
    cartDialog: state => {return state.cartDialog}
};
const mutations = {
    /**
     * @param state
     * @param item object
     */
    addToCart (state, item) {
        let duplicate = state.cart.find(product => product.code === item.code);
        if (duplicate) {
            duplicate.quantity++;
        } else {
            state.cart.push(item)
        }
        this.commit('storeToCart')
    },
    /**
     * @param state
     */
    storeToCart(state) {
        window.localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    /**
     * @param state
     * @param item object
     */
    removeFromCart(state, item) {
        let index = state.cart.indexOf(item);
        state.cart.splice(index, 1);
        this.commit('storeToCart')
    },
    /**
     * @param state
     * @param value boolean
     */
    setCartDialog(state, value) {
        state.cartDialog = value;
    },
    /**
     * @param state
     */
    clearCart(state) {
        localStorage.removeItem('cart');
        state.cart = [];
    }
};
export default {
    state,
    getters,
    mutations,
}
