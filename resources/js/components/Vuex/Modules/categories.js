const state = {
    categories: [],
    breadcrumbs: '',
    parent: '',
    child: '',
    catKeywords: '',
    catDescription: '',
};

const getters = {
    categories: state => {return state.categories},
    catBreadcrumbs: state => {return state.breadcrumbs},
    catKeywords: state => {return state.catKeywords},
    categoryName: state => {return state.parent},
    catDescription: state => {return state.catDescription},
};

const mutations = {
    /**
     * @param state
     * @param parent object
     */
    getParent(state,parent) {
        state.child = '';
        state.parent = parent.name;
        state.catDescription = parent.meta_description;
        state.catKeywords = parent.meta_keywords;
        this.commit('getBreadcrumbs')
    },
    /**
     * @param state
     * @param child string
     */
    getChild(state,child) {
        state.child = child;
        this.commit('getBreadcrumbs')
    },
    /**
     * @param state
     */
    getBreadcrumbs(state) {
        state.breadcrumbs = [
            {
                text: 'Главная',
                disabled: false,
                href: '/',
            },
            {
                text: state.parent,
                disabled: true,
            },
            {
                text: state.child,
                disabled: true,
            },
        ]
    },
    /**
     * @param state
     * @param categories array of objects
     */
    getCategoriesFromApi (state, categories) {
        state.categories = categories
    },
};

export default {
    state,
    getters,
    mutations,
}
