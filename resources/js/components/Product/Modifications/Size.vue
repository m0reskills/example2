<template>
    <v-container fluid v-show="sizeInMod">
        <v-row>
            <v-subheader class="pl-0">Размер</v-subheader>
            <v-tabs center-active background-color="grey lighten-5">
                <v-tab
                    v-for="modification in uniqSize"
                    :key="modification.id"
                    @click="storeSize(modification.size)"
                >{{modification.size}}
                </v-tab>
            </v-tabs>
        </v-row>
    </v-container>

</template>

<script>
    import {mapGetters, mapMutations} from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                    'uniqSize',
                    'sizeInMod'
                ]
            ),
        },
        methods: {
            ...mapMutations([
                'storeSize',
            ]),
        }
    }
</script>

<style scoped>

</style>
