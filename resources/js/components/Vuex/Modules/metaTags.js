
const state = {
    keywords: '',
    description: '',
    title: '',

};

const getters = {
    keywords: state => {return state.keywords},
    description: state => {return state.description},
    title: state => {return state.title},

};

const mutations = {
    /**
     * @param state
     * @param meta object
     */
   getMetaTagsFromApi(state, meta) {
       state.title = meta.title;
       state.keywords = meta.keywords;
       state.description = meta.description;
   }
};

export default {
    state,
    getters,
    mutations,
}
