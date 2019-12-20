<template>
    <div>
        <vue-headful
            :title="title"
            :description="description"
            :keywords="keywords"
        />
        <v-container grid-list-lg fluid>
            <v-tooltip right>
                <template v-slot:activator="{ on }">
                    <router-link :to="'/new-all/'"><v-btn large text color="purple darken-4" v-on="on">Новинки</v-btn></router-link>
                </template>
                <span>Все товары в категории 'Новинки'</span>
            </v-tooltip>
            <v-layout row wrap>
                <product-card
                    v-for="newProduct in this.$store.state.products.newProducts"
                    :key="newProduct.id"
                    :product=newProduct
                ></product-card>
            </v-layout>
        </v-container>
        <v-container grid-list-lg fluid>
            <v-tooltip right>
                <template v-slot:activator="{ on }">
                    <router-link :to="'/sales-all/'"><v-btn large text color="purple darken-4" v-on="on">
                        Распродажа</v-btn></router-link>
                </template>
                <span>Все товары в категории 'Распродажа'</span>
            </v-tooltip>
            <v-layout row wrap>
                <product-card
                    v-for="salesProduct in this.$store.state.products.salesProducts"
                    :key="salesProduct.id"
                    :product=salesProduct
                ></product-card>
            </v-layout>
        </v-container>

        <v-container grid-list-lg fluid>
           <v-btn large text>О нас</v-btn>
                <about-company></about-company>
        </v-container>
        <v-container grid-list-lg fluid mb-10>
            <v-btn large text>Бренды</v-btn>
            <v-layout row wrap>
                <show-brands
                    v-for="brand in this.$store.state.brands.brands"
                    :key="brand.id"
                    :brand="brand"
                ></show-brands>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
    import productCard from './Product/ProductCard.vue';
    import ShowBrands from "./Brands/ShowBrands";
    import AboutCompany from "./AboutCompany";
import {mapGetters} from 'vuex'
    export default {
        components: {AboutCompany, ShowBrands, productCard},
        computed: {
            ...mapGetters([
                'title',
                'description',
                'keywords'
            ])
        }
    }
</script>

<style scoped>
    .card_heading {
        font-weight: bold;
        word-wrap: break-word;
        text-align: center;
        margin-bottom: 1.5rem;

    }

    .card_describe {
        margin-top: auto;
        padding-left: 1rem;
    }

    .card_price {
        font-size: 16px;
    }
</style>
