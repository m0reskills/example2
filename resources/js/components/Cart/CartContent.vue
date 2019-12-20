<template>
    <v-container grid-list-lg fluid>
        <v-flex row lg12>
            <v-col
                v-for="item in getCart"
                :key="item.id"
            >
                <v-card class="mx-auto" max-width="300">
                    <v-list-item two-line>
                        <v-list-item-content>
                            <div class="overline mb-4">{{item.name}}</div>
                            <v-flex v-if="item.size">
                                <v-subheader class="pl-0">Размер:</v-subheader>
                                <v-card-text xs3> {{item.size}}</v-card-text>
                            </v-flex>
                            <v-flex v-if="item.color">
                                <v-subheader class="pl-0"> Цвет:</v-subheader>
                                <v-card v-if="item.color"
                                        :style="{
                                                background: item.color,
                                                border: '2px solid',
                                                borderColor: '#222'
                                              }"
                                        width="30"
                                        height="30"
                                        class="d-flex flex-row mb-6"
                                ></v-card>
                            </v-flex>
                            <v-btn text>Количество: {{item.quantity}} шт.</v-btn>
                        </v-list-item-content>
                        <v-list-item-avatar
                            tile
                            size="80"
                            color="grey"
                        >
                            <img :src="item.image" :alt="item.name">
                        </v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                        <v-btn text>
                            <v-icon color="red" @click="$store.commit('removeFromCart', item)">
                                mdi-cart-arrow-up
                            </v-icon>
                        </v-btn>
                        <v-btn text>Цена: {{item.price | currency}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-flex>
        <v-btn text>Всего : {{ totalPrice | currency}}</v-btn>
    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                getCart: 'getCart',
                totalPrice: 'totalPrice',
            }),
        },
    }
</script>

<style scoped>

</style>
