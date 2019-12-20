import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "../components/HomePage";
import Checkout from "../components/Cart/Checkout";
import ShowProductsByBrand from "../components/Brands/ShowProductsByBrand";
import ProductDetails from "../components/Product/ProductDetails";
import AllNewProducts from "../components/Product/AllNewProducts";
import AllSalesProducts from "../components/Product/AllSalesProducts";
import ShowProductsByCat from "../components/Categories/ShowProductsByCat";
import Contacts from "../components/Contacts";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'homepage',
        component: HomePage,
        meta: {breadcrumb: 'Главная'}
    },
    {
        path: '/showbrand/:slug',
        name: 'showBrand',
        component: ShowProductsByBrand,
        meta: {
            breadcrumb: {
                label: 'Бренды',
                parent: 'homepage'
            }
        }
    },
    {
        path: '/product/:slug',
        name: 'product',
        component: ProductDetails,
        meta: {
            breadcrumb: {
                label: 'Подробнее о продукте',
                parent: 'homepage'
            }
        }
    },
    {
        path: '/category/:slug',
        name: 'category',
        component: ShowProductsByCat,
        meta: {
            breadcrumb: {
                label: 'Категории',
                parent: 'homepage'
            }
        }
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: Checkout,
        meta: {
            breadcrumb: {
                label: 'Оформление заказа',
                parent: 'homepage'
            }
        }
    },
    {
        path: '/new-all',
        name: 'allNewProducts',
        component: AllNewProducts,
        meta: {
            breadcrumb: {
                label: 'Новинки',
                parent: 'homepage'
            }
        }
    },
    {
        path: '/sales-all',
        name: 'allSalesProducts',
        component: AllSalesProducts,
        meta: {
            breadcrumb: {
                label: 'Расподажа',
                parent: 'homepage'
            }
        }
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contacts,
    },
];


const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior() {
        window.scrollTo(0,0);
    }

});

export default router
