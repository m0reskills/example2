const state = {
    order: null,

};
const getters = {
    order: state => {return state.order},
};
const mutations = {
    /**
     *
     * @param state
     * @param form object
     */
    prepareOrder(state, form) {
        const prepareProduct = this.getters.getCart.map(function(m) {
            const item = {};
            item.product_id = m.product_id;
            item.id = m.id;
            item.quantity = m.quantity;
            item.price = m.price;
            return item;
        });
        state.order = {modifications: prepareProduct, orderInfo: form};
    },
};
export default {
    state,
    getters,
    mutations,
}
