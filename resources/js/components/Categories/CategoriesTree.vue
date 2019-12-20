<template>
    <v-list>
        <v-list-group
            v-for="category in this.$store.getters.categories"
            :key="category.id"
        >
            <template v-slot:activator>
                <v-list-item
                    active-class="active"
                    :class="category.slug === $route.params.slug ? 'active' : ''"
                    @click="getParent(category)"
                >
                    <v-img :src="'/storage/' + category.image" :alt="category.name"
                           max-width="20px" max-height="20px" class="mr-4"
                    >
                    </v-img>
                    <router-link
                        :aria-label="category.name"
                        :to="'/category/' + category.slug"
                    >
                        <v-list-item-title v-text="category.name">
                        </v-list-item-title>
                    </router-link>
                </v-list-item>
            </template>
            <v-list-item
                v-for="child in category.children"
                :key="child.id"
                :value="child"
                active-class="active"
                :class="child.slug === $route.params.slug ? 'active' : ''"
                @click="getChild(child.name)"
            >
                <router-link
                    :aria-label="child.name"
                    :to="'/category/' + child.slug"
                >
                    <v-list-item-content>
                        <v-list-item-title v-text="child.name"></v-list-item-title>
                    </v-list-item-content>
                </router-link>
            </v-list-item>
        </v-list-group>
    </v-list>
</template>

<script>
    import {mapMutations} from 'vuex'

    export default {
        methods: {
            ...mapMutations([
                'getParent',
                'getChild'
            ])
        }
    }
</script>

<style scoped>
    body {
        font-family: sans-serif;
        padding: 1em;
    }

    .v-application a {
        text-decoration: none;
        color: black;
    }

    .active {
        font-weight: bold;
        border: none;
    }
</style>
