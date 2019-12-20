<template>
    <div>
        <v-container grid-list-lg fluid>
            <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
            <v-layout row wrap>
                <product-card
                         v-for="product in products"
                         :key="product.id"
                         :product = product
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
        data() {
            return {
                items: [
                    {
                        text: 'Главная',
                        disabled: false,
                        href: '/',
                    },
                    {
                        text: 'Распродажа',
                        disabled: true,
                    },
                ]
            }
        },
        computed:
            mapGetters([
                'products'
            ]),
        beforeCreate() {
            this.$store.dispatch('loadAllSaleProducts',this.$route.params.slug)
        },
    }
</script>


