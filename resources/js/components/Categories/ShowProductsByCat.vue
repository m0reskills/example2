<template>
    <div>
        <vue-headful
            :title="categoryName"
            :description="catKeywords"
            :keywords="catDescription"
        />
        <v-breadcrumbs v-if="catBreadcrumbs"
                       :items="catBreadcrumbs"
                       divider=">"
        >
        </v-breadcrumbs>
        <v-container grid-list-lg fluid>
            <v-layout row wrap>
                <h2 v-if="!products.length">нет продуктов</h2>
                <product-card v-else
                              v-for="product in products"
                              :key="product.id"
                              :product=product
                ></product-card>
            </v-layout>
            <pagination></pagination>
        </v-container>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    const ProductCard = () => import('../Product/ProductCard.vue');
    const Pagination = () => import('../Product/Pagination');

    export default {
        components: {ProductCard, Pagination},
        computed: {
            ...mapGetters([
                'products',
                'catBreadcrumbs',
                'catDescription',
                'catKeywords',
                'categoryName'
            ]),
        },
        created() {
            this.initProducts();
        },
        watch: {
            '$route'() {
                this.initProducts();
            }
        },
        methods: {
            initProducts() {
                this.$store.dispatch('loadProductsByCategory', this.$route.params.slug);
            },
        },
    }
</script>

<style scoped>
</style>
