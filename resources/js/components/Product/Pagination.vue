<template>
    <div>
        <v-pagination
            :length="getTotal"
            @input="changePage"
            v-model="currentPage"
        ></v-pagination>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        computed: {
            currentPage:{
                get () {
                    return this.$store.getters.getCurrentPage;
                },
                set (page) {
                    this.$store.commit('setCurrentPage', page);
                }},
            ...mapGetters (
                ['getTotal']
            ),
        },
        methods: {
            changePage(page) {
                this.$store.dispatch('loadPagination', [
                    page,
                    this.$store.getters.path
                ])
            },
        }
    }
</script>

<style scoped>

</style>
