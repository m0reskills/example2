import _ from 'lodash';

const state = {
    product: {},
    products: [],
    newProducts: [],
    salesProducts: [],
    mayAlsoLikeProducts: [],
    modifications: [],
    modification: null,
    currentColor: '',
    currentSize: '',
    colorInMod: '',
    sizeInMod: '',
    oldPrice: '',
    newPrice: '',

};
const getters = {
    product: state => {
        return state.product
    },
    products: state => {
        return state.products
    },
    newProducts: state => {
        return state.newProducts
    },
    modification: state => {
        return state.modification
    },
    //getting object of modifications without duplicates of sizes
    uniqSize: state => {
        return _.uniqBy(state.modifications, 'size');
    },
    oldPrice: state => {
        return state.oldPrice
    },
    newPrice: state => {
        return state.newPrice
    },
    currentColor: state => {
        return state.currentColor
    },
    sizeInMod: state => {
        return state.sizeInMod
    },
    colorInMod: state => {
        return state.colorInMod
    },
    currentSize: state => {
        return state.currentSize
    },
    /**
     *
     * @param state
     *
     */
    filterByColor: state => {
        if (state.currentSize) {
            return state.modifications.filter(
                m => m.size === state.currentSize
            );
        }
        return state.modifications;
    },
};
const mutations = {
    /**
     *
     * @param state
     */
    getPrice(state) {
        state.oldPrice = state.modification.old_price || null;
        state.newPrice = state.modification.price || null;
    },
    //get obj
    /**
     *
     * @param state
     * @param size string
     */
    storeSize(state, size) {
        this.commit('clearAttributes');
        state.currentSize = size;
    },
    /**
     *
     * @param state
     * @param color string
     */
    storeColor(state, color) {
        state.currentColor = color;
        this.commit('findModification')
    },

    /**
     *
     * @param state
     */
    findModification(state) {
        if (state.sizeInMod && state.colorInMod) {
            state.modification = state.modifications.find((m) => {
                return m.color === state.currentColor && m.size === state.currentSize
            });
            this.commit('getPrice');
        } else if (state.sizeInMod) {
            state.modification = state.modifications.find((m) => {
                return m.size === state.currentSize
            });
            this.commit('getPrice');
        } else {
            state.modification = state.modifications.find((m) => {
                return m.color === state.currentColor
            });
            this.commit('getPrice');
        }
    },
    clearAttributes() {
        state.currentSize = '';
        state.currentColor = '';
        state.newPrice = '';
        state.oldPrice = '';
    },
    //Getting product from productCard and storing in vuex states
    /**
     *
     * @param state
     * @param product object
     */
    getProduct(state, product) {
        this.commit('clearAttributes');
        this.commit('getImages', product);
        this.commit('storeProduct', product)
    },
    /**
     *
     * @param state
     * @param product object
     */
    storeProduct(state, product) {
        state.product = product;
        product.low_price = Math.min.apply(null, product.modifications.map(function (item) {
            return item.price
        }));
        state.modifications = product.modifications;
        if (product.modification_count === 1) {
            product.modifications.forEach((modification) => {
                state.modification = modification;
                this.commit('getPrice');
                state.currentSize = modification.size || null;
                state.currentColor = modification.color || null;
            })
        }
       this.commit('setSizeAndColor', product)
    },
    /**
     *
     * @param state
     * @param product object
     */
    setSizeAndColor(state, product) {
        product.modifications.find((m) => {
            state.sizeInMod = m.size !== null

        });
        product.modifications.find((m) => {
            state.colorInMod = m.color !== null
        });
    },
    /**
     *
     * @param state
     * @param products array of objects
     */
    storeAttributes(state, products) {
        this.commit('storeLowPrice', products);
        this.commit('getSingleImage', products);
    },
    /**
     *
     * @param state
     * @param products array of objects
     */
    getSingleImage(state, products) {
        products.map((p) => {
            if (!p.images) {
            return p.image = '/storage/products/no-photo.jpg';
        }
            p.image = '/storage/' + Object.values(JSON.parse(p.images))[0];
        });
    },
    /**
     *
     * @param state
     * @param product objects
     */
    getImages(state, product) {
        if (!product.images) {
            return product.image = '/storage/products/no-photo.jpg';
        }
        product.images = JSON.parse(product.images).map(img => ({
            id: null,
            src: '/storage/' + img,
            thumbnail: '/storage/' + img
        }));
    },
    /**
     *
     * @param state
     * @param products array of objects
     */
    storeLowPrice(state, products) {
        products.forEach((product) => {
            if (product.modifications.length > 0) {
                product.low_price = Math.min.apply(null, product.modifications.map(function (item) {
                    return item.price
                }));
            }
        });
    },
    /**
     *
     * @param state
     * @param products array of objects
     */
    getProductsFromApi(state, products) {
        this.commit('storeAttributes', products);
        state.products = products;
    },
    /**
     *
     * @param state
     * @param newProducts array of objects
     */
    getNewProductsFromApi(state, newProducts) {
        this.commit('storeAttributes', newProducts);
        state.newProducts = newProducts;
    },
    /**
     *
     * @param state
     * @param mayAlsoLikeProducts array of objects
     */
    getMayALsoLikeProductsFromApi(state, mayAlsoLikeProducts) {
        this.commit('storeAttributes', mayAlsoLikeProducts);
        state.mayAlsoLikeProducts = mayAlsoLikeProducts;
    },
    /**
     *
     * @param state
     * @param salesProducts array of objects
     */
    getSalesProductsFromApi(state, salesProducts) {
        this.commit('storeAttributes', salesProducts);
        state.salesProducts = salesProducts;
    },
    /**
     *
     * @param state
     */
    addToCartModification(state) {
        const item = {
            id: state.modification.id,
            product_id: state.product.product_id,
            code: state.modification.code,
            name: state.product.name,
            slug: state.product.slug,
            image: state.product.image || state.product.images[0].src ||'',
            size: state.modification.size,
            color: state.modification.color,
            price: state.modification.price,
            quantity: 1,
        };
        this.commit('addToCart', item)
    },
};

export default {
    state,
    getters,
    mutations,
}
