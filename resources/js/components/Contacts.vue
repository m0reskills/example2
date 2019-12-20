<template>
    <div class="mr-3">
        <v-dialog v-model="contactDialog" width="400">
            <template v-slot:activator="{ on }">
                <v-icon v-on="on" class="mr-2">mdi-map-marker</v-icon>
            </template>
            <v-card class="mx-auto" max-width="400">
                <v-btn text icon @click="contactDialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <yandex-map :coords="coords" class="ymap-class">
                    <ymap-marker
                        marker-id="Vinex"
                        :coords="coords"
                    />
                </yandex-map>
                <v-list-item-group color="primary">
                    <v-list-item
                        v-for="(item, i) in contacts"
                        :key="i"
                    >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.text}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

    export default {
        data: () => ({
            contactDialog: false,
            coords: [55.846254, 37.641315],
            contacts: [
                {text: '8-919-107-1314', icon: 'mdi-cellphone-android'},
                {text: 'yauzaopen@gmail.com', icon: 'mdi-email'},
                {text: 'г. Москва, пр-д Серебрякова, д. 2, корп. 1', icon: 'mdi-map-marker'},
            ]
        }),
    }
</script>

<style scoped>
    .ymap-class {
        width: 400px;
        height: 300px;
    }
</style>
