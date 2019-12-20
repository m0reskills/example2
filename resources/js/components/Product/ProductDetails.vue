<template>
    <div>
        <vue-headful
            :title="product.name"
            :description="product.meta_description"
            :keywords="product.meta_keywords"
        />
        <v-container>
            <v-layout row wrap>
                <v-flex md6 lg6>
                    <gallery v-if="product.images"
                             :iid.sync="currentId"
                             :addons="{ enableLargeView: true }"
                             :max-width="600"
                             :max-height="400"
                             :responsive="true"
                             rightControlClass="hideArrow"
                             leftControlClass="hideArrow"
                             :items="product.images"/>
                    <v-img v-else max-width="400" max-height="400" :src="product.image"/>
                </v-flex>
                <v-flex md6 lg6>
                    <div class="product_info">
                        <h5 class=".title mb-2 mt-3">{{product.name}}</h5>
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
                        <vue-markdown :source="product.dimensions"></vue-markdown>

                                </span>
                        </v-flex>
                        <v-flex v-if="product.description" pb-4>
                                <span class="overline text font-weight-bold text-justify text-break">
                                    {{product.description}}
                                </span>
                        </v-flex>
                        <price :price="product.low_price"></price>
                        <v-btn
                            class="mx-0 v-btn v-btn--block"
                            @click="checkBeforeAddToCart">
                            <span class="v-btn__content"><span>Добавить в корзину</span>
                                <i aria-hidden="true" class="v-icon v-icon--right mdi mdi-cart-plus theme--dark"
                                   style="font-size: 18px;"></i>
                            </span>
                        </v-btn>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
<!--        <v-container>-->
<!--                   <v-btn large text color="purple darken-4" v-on="on">-->
<!--                        Вам может понравиться</v-btn>-->
<!--            <v-layout row wrap>-->
<!--                <product-card-->
<!--                    v-for="salesProduct in this.$store.state.products.salesProducts"-->
<!--                    :key="salesProduct.id"-->
<!--                    :product=salesProduct-->
<!--                ></product-card>-->
<!--            </v-layout>-->
<!--        </v-container>-->
        <v-container grid-list-lg fluid>
            <v-btn large text color="purple darken-4">
                Вам так же может понравится</v-btn>
        <v-layout row wrap>
        <product-card
            v-for="salesProduct in this.$store.state.products.mayAlsoLikeProducts"
            :key="salesProduct.id"
            :product=salesProduct
        ></product-card>
        </v-layout>
        </v-container>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex';
    const Size = () => import('./Modifications/Size');
    const Color = () => import('./Modifications/Color');
    const Price = () => import('./Modifications/Price');
    import productCard from './ProductMayLikeCard';
    import Gallery from 'lingallery';

    export default {
        components: {Size, Color, Price, Gallery, productCard},
        computed: {
            ...mapGetters([
                'product',
                'sizeInMod',
                'colorInMod',
                'currentSize',
                'currentColor'
            ]),
        },
        data() {
            return {
                currentId: null
            }
        },

        beforeCreate() {
            this.$store.dispatch('loadProductBySlug', this.$route.params.slug);
        },
        methods: {
            ...mapMutations([
                'addToCartModification',
            ]),

            checkBeforeAddToCart() {
                if (!this.currentSize && this.sizeInMod) {
                    return this.$notification.error("Выберите размер", {timer: 3})
                }
                if (!this.currentColor && this.colorInMod) {
                    return this.$notification.error("Выберите цвет", {timer: 3})
                }
                this.$store.commit('addToCartModification')
            },
        }
    }
</script>

<style scoped>
    .product_info {
        margin-left: 20px;
    }

    .hideArrow {
        display: none;
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
