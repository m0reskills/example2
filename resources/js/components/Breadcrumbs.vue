<template>
    <v-breadcrumbs :items="this.$store.state.categories.currentCategory" divider=">"></v-breadcrumbs>
</template>

<script>
    export default {
        name: "Breadcrumbs"
    }
</script>

<style>
    nav.breadcrumbs-container {
        margin: 10px 0 0 10px;
        display: flex;
        font-size: 0.9rem;
    }
li.current-breadcrumb{
    list-style: none;
    padding-left: 3px;

}

</style>
