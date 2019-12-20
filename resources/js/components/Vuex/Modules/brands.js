const state = {
    brands:  [],
    brandName: ''
};

const getters = {
    brandName: state => {return state.brandName}
};

const mutations = {
    /**
     * @param state
     * @param brands array of objects
     */
    getBrandsFromApi (state, brands) {
        state.brands = brands
    },
    /**
     * @param state
     * @param name string
     */
    getBrandName(state, name) {
        state.brandName = name;
    }

};

export default {
    state,
    getters,
    mutations,
}
