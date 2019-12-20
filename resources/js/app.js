/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


require('./bootstrap');
Vue.config.devtools = process.env.NODE_ENV === 'production';
Vue.config.devtools = false;
Vue.config.debug = false;
Vue.config.silent = true;

import Vue from 'vue'
import Vuetify from 'vuetify'
import store from "./components/Vuex/index";
import InstantSearch from 'vue-instantsearch';
import vueHeadful from 'vue-headful';
import VueNotification from "@kugatsu/vuenotification";
import router from './router/router.js'
import YmapPlugin from 'vue-yandex-maps'
import VueMarkdown from 'vue-markdown';
const settings = {
    apiKey: '541d6e72-b7fa-416c-907a-7329d8ad5b22',
};

Vue.component('vue-headful', vueHeadful);
Vue.component(    'vue-markdown', VueMarkdown);
Vue.component('AppHome', require('./components/AppHome.vue').default);
Vue.use(YmapPlugin, settings);
Vue.use(InstantSearch);
Vue.use(Vuetify);

Vue.use(VueNotification, {
    timer: 20
});
Vue.filter('currency', function (value) {
    return value + ' ₽';
});

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const app = new Vue({
    el: '#app',
    vuetify: new Vuetify({}),
    router,
    store,
});
