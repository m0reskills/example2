<template>
    <div>
        <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
        <v-container grid-list-lg fluid>
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

        computed:{
            ...mapGetters([
                'products',
            ]),
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
                        text: 'Новинки',
                        disabled: true,
                    },

                ]
            }
        },
        beforeCreate() {
            this.$store.dispatch('loadAllNewProducts',this.$route.params.slug)
        },
    }
</script>
