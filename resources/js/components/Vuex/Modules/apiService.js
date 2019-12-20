const state = {
    loading: true
};
const actions = {
    async storeOrder(ctx, data) {
        try {
            await axios.post(`/api/checkout/store`, data)
        } catch (e) {
            return await Promise.reject(e.response)
        }
    },
    async loadProductBySlug(ctx, slug) {
        try {
            await axios.get(`/api/product/${slug}`)
                .then(res => ctx.commit('getProduct', res.data.data));
            await axios.get(`/api/product/also-like/${slug}`)
                .then(res => ctx.commit('getMayALsoLikeProductsFromApi', res.data.data))
        } catch (e) {
            return await Promise.reject(e)
        }
    },
    async loadNewProducts(ctx) {
        try {
            await axios.get('/api/new')
                .then(res => {
                    ctx.commit('getNewProductsFromApi', res.data.data);
                    ctx.state.loading = false;
                })
        } catch (e) {
            return await Promise.reject(e)
        }
    },
    async loadHomePage(ctx) {
        try {
            await axios.get('/api/homepage')
                .then(res => {
                    const {allBrands, categories, meta} = res.data;
                    ctx.commit('getCategoriesFromApi', categories);
                    ctx.commit('getBrandsFromApi', allBrands);
                    ctx.commit('getMetaTagsFromApi', meta)
                })
        } catch (e) {
            return await Promise.reject(e)
        }
    },
    async loadProductsByCategory(ctx, slug) {
        try {
            await axios.get(`/api/categories/${slug}`)
                .then(res => {
                    const {meta, links, data: products} = res.data;
                    ctx.commit('getMetaFromApi', meta);
                    ctx.commit('getLinksFromApi', links);
                    ctx.commit('getProductsFromApi', products)
                })
        } catch (e) {
            return await Promise.reject(e)
        }
    },
    async loadProductsByBrand(ctx, slug) {
        try {
            await axios.get(`/api/product/brand/${slug}`)
                .then(res => {
                    const {meta, links, data: products} = res.data;
                    ctx.commit('getMetaFromApi', meta);
                    ctx.commit('getLinksFromApi', links);
                    ctx.commit('getProductsFromApi', products)
                })
        } catch (e) {
            return await Promise.reject(e)
        }
    },
    async loadPagination(ctx, param) {
        const [page, path] = param;
        try {
            await axios.get(`${path}?page=${page}`)
                .then(res => {
                    const {meta, links, data: products} = res.data;
                    ctx.commit('getMetaFromApi', meta);
                    ctx.commit('getLinksFromApi', links);
                    ctx.commit('getProductsFromApi', products)
                })
        } catch (e) {
            return await Promise.reject(e)
        }
    },
    async loadAllNewProducts(ctx) {
        try {
            await axios.get(`/api/new-all`)
                .then(res => {
                    const {meta, links, data: products} = res.data;
                    ctx.commit('getMetaFromApi', meta);
                    ctx.commit('getLinksFromApi', links);
                    ctx.commit('getProductsFromApi', products)
                })
        } catch (e) {
            return await Promise.reject(e)
        }
    },
    async loadSalesProducts(ctx) {
        try {
            await axios.get(`/api/sales`)
                .then(res => {
                    ctx.commit('getSalesProductsFromApi', res.data.data);
                })
        } catch (e) {
            return await Promise.reject(e)
        }
    },
    async loadAllSaleProducts(ctx) {
        try {
            await axios.get(`/api/sales-all`)
                .then(res => {
                    const {meta, links, data: products} = res.data;
                    ctx.commit('getMetaFromApi', meta);
                    ctx.commit('getLinksFromApi', links);
                    ctx.commit('getProductsFromApi', products)
                })
        } catch (e) {
            return await Promise.reject(e)
        }
    }
};

export default {
    state,
    actions,
}
