<template>
    <div>
        <navbar></navbar>
        <app-footer></app-footer>
    </div>
</template>
<script>
    const Navbar = () => import('./Navbar.vue');
    const AppFooter = () => import('./AppFooter');

    export default {
        components: {
            Navbar,
            AppFooter,
        },
       async created() {
            this.$store.dispatch('loadHomePage');
            this.$store.dispatch('loadNewProducts');
            this.$store.dispatch('loadSalesProducts');


        }
    }
</script>

<style>

</style>
