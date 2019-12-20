<template>
    <v-flex xs3 sm2 md1>
            <v-card
                max-width="100"
                max-height="100"
            >
                <router-link :to="'/showbrand/' + brand.slug">
                    <v-img
                        :src="'storage/' + brand.image"
                        width="100px"
                        height="100px"
                        aspect-ratio="2" contain
                        @click="getBrandName(brand.name)"
                    >
                    </v-img>
                </router-link>
        </v-card>
    </v-flex>
</template>

<script>
    import {mapMutations} from 'vuex';
    export default {
        props: ['brand'],
        methods: {
            ...mapMutations([
                'getBrandName'
            ])
        }
    }
</script>

<style scoped>

</style>
