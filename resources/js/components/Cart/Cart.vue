<template>
    <v-badge class="mr-3" color="purple darken-4">
        <template v-slot:badge>{{ $store.state.cart.cart.length}}</template>
        <v-dialog v-model="this.$store.getters.cartDialog" persistent max-width="700">
            <template v-slot:activator="{ on }">
                <v-icon :disabled="$store.state.cart.cart.length === 0" v-on="on"
                        @click="$store.commit('setCartDialog', true)">shopping_cart
                </v-icon>
            </template>
            <v-card color="white">
                <cart-content></cart-content>
                <v-card-actions>
                    <v-btn color="grey darken-1" text @click="$store.commit('setCartDialog', false )" dark>выход
                    </v-btn>
                    <v-spacer></v-spacer>
                    <router-link to="/checkout">
                        <v-btn color="grey darken-1" text v-show="this.$store.getters.totalPrice > 0"
                               @click="$store.commit('setCartDialog', false )" dark>Оформить
                        </v-btn>
                    </router-link>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-badge>
</template>

<script>
    import {mapMutations} from 'vuex';
    const CartContent = () => import('./CartContent');

    export default {
        components: {CartContent},
        methods: {
            ...mapMutations([
                'setCartDialog'
            ])
        }
    }
</script>

<style scoped>

</style>
