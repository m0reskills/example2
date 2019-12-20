
const state = {
    total: null,
    links: null,
    path: null,
    currentPage: 1
};

const getters = {
    getTotal: state => {
        return state.total
    },
    path: state => {return state.path},
    getCurrentPage: state => {
        return state.currentPage
    },
};

const mutations = {
    /**
     *
     * @param state
     * @param meta object
     */
    getMetaFromApi(state, meta) {
        state.total = meta.last_page;
        state.currentPage = meta.current_page;
    },
    /**
     *
     * @param state
     * @param links object
     */
    getLinksFromApi(state, links) {
        state.path = new URL(Object.values(links)[0]).pathname; // ex. '/api/categories/myachi'
        state.links = links;
    },
    /**
     *
     * @param state
     * @param page number
     */
    setCurrentPage(state, page) {
        state.currentPage = page;
    }
};


export default {
    state,
    getters,
    mutations,
}
