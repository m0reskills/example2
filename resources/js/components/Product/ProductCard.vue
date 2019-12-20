<template>
    <v-flex xs12 sm5 md4 lg3>
    <v-card class="mx-auto mb-2" max-width="374">
        <router-link
            :aria-label="product.name"
            :to="'/product/' + product.slug"
            :data="product"
        >
            <div class="img-container">
                <img class="img-to-fit" :src="product.image" alt="">
            </div>
        </router-link>
        <v-card-title primary-title>
            <div>
                <router-link
                    :aria-label="product.name"
                    :to="'/product/' + product.slug"
                    :data="product"
                >
                    <h3 class="title">{{product.name}}</h3>
                </router-link>
                <div class="card_describe">
                    <p class="overline text-break">{{ product.description.substring(0, 80) }}...</p>
                    <v-flex row >
                        <span class="title" v-if="product.modifications.length === 1"> {{ product.modifications[0].price  | currency }}</span>
                        <span class="title"  v-else v-show="product.low_price"> от {{ product.low_price | currency }}</span>
                        <v-spacer></v-spacer>
                        <v-tooltip left>
                            <template v-slot:activator="{ on }">
                                <v-btn text color="purple darken-4" @click="getProductModification(product)" v-show="product.low_price">
                                    <v-icon v-on="on">mdi-cart-arrow-down</v-icon>
                                </v-btn>
                            </template>
                            <span>Добавить в корзину</span>
                        </v-tooltip>
                    </v-flex>
                </div>
            </div>
        </v-card-title>
        <v-dialog persistent max-width="600" v-model="dialog">
            <v-card>
                <v-flex md9 lg10 pl-3>
                    <h5>{{product.name}}</h5>
                    <size></size>
                    <color></color>
                    <v-flex row v-if="product.material">
                        <v-subheader>Материал</v-subheader>
                        <span class="overline text mt-4 ml-0 font-weight-bold">
                                    {{product.material}}
                                </span>
                    </v-flex>
                    <v-flex pb-4 v-if="product.dimensions">
                                <span class="overline text mt-4">
                                    {{product.dimensions}}
                                </span>
                    </v-flex>
                    <price :price="product.low_price"></price>
                    <v-card-actions>
                        <v-btn text color="grey darken-1" @click="exitFromDialog" dark>Выйти
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="grey darken-1"
                            @click="checkBeforeAddToCart()">
                            Добавить в корзину
                        </v-btn>
                    </v-card-actions>
                </v-flex>
            </v-card>
        </v-dialog>
    </v-card>
</v-flex>
</template>
<script>
    import {mapGetters, mapMutations} from 'vuex';
    import Size from "./Modifications/Size";
    import Color from "./Modifications/Color";
    import Price from "./Modifications/Price";

    export default {
        components: {
            Color,
            Size,
            Price
        },
        data() {
            return {
                dialog: false,
            }
        },
        computed: {
            ...mapGetters([
                'sizeInMod',
                'colorInMod',
                'currentSize',
                'currentColor'
            ]),
        },
        props: ['product'],
        methods: {
            ...mapMutations([
                'addToCartModification',
            ]),

            getProductModification(product) {
                this.$store.commit('storeProduct', product);
                this.dialog = !this.dialog
            },
            exitFromDialog() {
                this.dialog = false;
                this.$store.commit('clearAttributes');
            },

            checkBeforeAddToCart() {
                if (!this.currentSize && this.sizeInMod) {
                    return this.$notification.error("Выберите размер", {timer: 3})
                }
                if (!this.currentColor && this.colorInMod) {
                    return this.$notification.error("Выберите цвет", {timer: 3})
                }
                this.$store.commit('addToCartModification')
            },

        },
    }
</script>

<style scoped>
    a:hover {
        text-decoration: none;
    }
    h3.title {
        color: black;
    }
    .img-container {
        width: 300px;
        height: 200px;
        justify-content: center;
        display: flex;
        flex-direction: row;
        overflow: hidden;

    }
    .img-container .img-to-fit {
        display: block;
        max-width: 250px;
        max-height: 200px;
        width: auto;
        height: auto;
        align-content: center;
    }
</style>
