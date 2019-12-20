<template>
    <div>
        <p class="product_price title" v-if="!newPrice" v-show="price">
            <span class="headline grey--text text--darken-2"
                  v-model="price" > от {{price | currency}}</span>
        </p>

    <p class="product_price title" v-show="newPrice" v-if="oldPrice">
        <del><span class="headline grey--text text--darken-2 text--line-through"
                   v-model="oldPrice" >{{oldPrice | currency}}</span>
        </del>
        <span class="headline red--text text--lighten-1"
              v-model="newPrice" > {{newPrice | currency}}</span>
    </p>

    <p v-show="newPrice" v-else>
        <span class="headline grey--text text--darken-4"
              v-model="newPrice" > {{newPrice | currency}}</span>
    </p>
    </div>


</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        props: ['price'],
        computed: {
            ...mapGetters([
                    'newPrice',
                    'oldPrice',
                ]
            ),
        }
    }
</script>

<style scoped>

</style>
