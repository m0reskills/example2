<template>
    <v-flex lg3 pb-10 center>
        <v-card class="mx-auto mb-2" width="200" height="250">
            <router-link
                :to="{ name: 'product', params: {slug: product.slug }}"            >
                <div class="img-container">
                    <img class="img-to-fit" :src="product.image" alt="">
                </div>
            </router-link>
            <v-card-title primary-title>
                <div>
                    <p class="overline text-break">{{ product.description.substring(0, 80) }}...</p>
                        <span class="title" v-if="product.modifications.length === 1"> {{ product.modifications[0].price  | currency }}</span>
                            <span class="title"  v-else v-show="product.low_price"> от {{ product.low_price | currency }}</span>
                </div>
            </v-card-title>
        </v-card>
    </v-flex>
</template>
<script>
    export default {
        props: ['product'],
        watch: {
            '$route' (to, from) {
                // return this.$store.dispatch('loadProductBySlug', this.$route.params.slug);
            },
    }}
</script>

<style scoped>
    .img-container {
        width: 200px;
        height: 100px;
        justify-content: center;
        display: flex;
        flex-direction: row;
        overflow: hidden;

    }
    .img-container .img-to-fit {
        display: block;
        max-width: 150px;
        max-height: 100px;
        width: auto;
        height: auto;
        align-content: center;
    }
</style>
