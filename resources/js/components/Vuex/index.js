import Vue from 'vue';
import Vuex from 'vuex';
import products from './Modules/products';
import cart from './Modules/cart';
import categories from "./Modules/categories";
import apiService from "./Modules/apiService";
import brands from "./Modules/brands";
import pagination from "./Modules/pagination";
import order from "./Modules/order";
import metaTags from "./Modules/metaTags"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        products,
        cart,
        categories,
        apiService,
        brands,
        pagination,
        order,
        metaTags
    }
});
