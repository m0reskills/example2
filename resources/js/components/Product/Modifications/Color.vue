<template>
    <v-layout row wrap v-if="colorInMod">
        <v-subheader>Цвет</v-subheader>
        <v-item-group mandatory>
            <v-layout>
                <v-item
                    v-for="modification in filterByColor"
                    :key="modification.id"
                    v-slot:default="{ active, toggle }"
                >
                    <v-card
                        :style="{
                    background: modification.color
                   ? modification.color
                      : '',
                  }"
                        active-class="active"
                        :class="modification.color === currentColor ? 'active' : ''"
                        width="30"
                        height="30"
                        class="mr-2"
                        :disabled="!currentSize && sizeInMod"
                        @click="storeColor(modification.color)"
                    ></v-card>
                </v-item>
            </v-layout>
        </v-item-group>
    </v-layout>

</template>

<script>
    import {mapGetters, mapMutations} from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                    'currentColor',
                    'filterByColor',
                    'colorInMod',
                    'currentSize',
                    'sizeInMod'
                ]
            ),
        },
        methods: {
            ...mapMutations([
                'storeColor',
            ]),
        }
    }
</script>

<style>
    .active {
        border: 2px solid #000000;
    }
</style>
