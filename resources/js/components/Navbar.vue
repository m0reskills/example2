<template>
    <div>
        <v-navigation-drawer app temporary v-model="sideNav" max-width="900px">
            <search v-if="sideNav"></search>
            <categories></categories>
        </v-navigation-drawer>
        <v-app-bar app>
            <v-app-bar-nav-icon @click="sideNav = !sideNav" class="hidden-md-and-up">
            </v-app-bar-nav-icon>
            <v-toolbar-title>
                <router-link to="/">
                    <v-img src="/promoImage/logo.png" width="120" alt="vinex sports" />
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <template>
                <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    offset-x
                >
                    <template v-slot:activator="{ on }">
                        <v-btn
                            text
                            v-on="on"
                            class="hidden-sm-and-down m-4">
                            Категории
                        </v-btn>
                    </template>
                    <v-card max-width="500">
                        <categories></categories>
                    </v-card>
                </v-menu>
            </template>
            <search class="hidden-sm-and-down mr-5"></search>
            <contacts></contacts>
            <cart></cart>
        </v-app-bar>
        <v-content>
            <router-view :key="$route.fullPath"></router-view>
        </v-content>
    </div>
</template>
<script>
    const Search = () => import ( './Search/AlgoliaSearch');
    const Categories = () => import ( './Categories/CategoriesTree');
    const Cart = () => import ( './Cart/Cart');
    const Contacts = () => import ( './Contacts');


    export default {
        components: {Search, Categories, Cart, Contacts},
        data() {
            return {
                menu: false,
                sideNav: false,
            }
        },
    }
</script>

<style scoped>
    .v-list-item {
        align-self: center;
        font-size: 0.8rem;
    }
</style>
