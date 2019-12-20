<template>
    <div>
        <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
        <v-container grid-list-lg fluid>
            <v-layout row wrap>
                <product-card
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
    import {mapGetters} from 'vuex';
    const ProductCard = () => import('../Product/ProductCard');
    const Pagination = () => import('../Product/Pagination');

    export default {
        components: {ProductCard, Pagination},
        computed: {
            ...mapGetters([
                'products',
            ]),

        },
        beforeCreate() {
            this.$store.dispatch('loadProductsByBrand', this.$route.params.slug);
        },
        data () {
            return {
                items: [
                    {
                        text: 'Главная',
                        disabled: false,
                        href: '/',
                    },
                    {
                        text: this.$store.getters.brandName,
                        disabled: true,
                    },

                ]
            }
        },
    }
</script>

<style scoped>

</style>
