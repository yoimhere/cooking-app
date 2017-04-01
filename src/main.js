import Vue from 'vue'
import Vuex from 'vuex'
import Vonic from 'vonic/src/index.js'
// store routes
import routes from './routes'
import store from './store/store'
// utils
import { getSess } from './utils'

Vonic.app.setConfig('beforeEach', (to, from, next) => {
    if (to.matched.some(record => record.meta.hideTabbar)) {
        // $tabbar.$emit('hideTabbar')
    } else {
        // $tabbar.$emit('showTabbar')
    }
    
    store.dispatch('showLoading')

    if (to.matched.some(record => record.meta.auth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        let userinfo = getSess('userinfo')
        if (!userinfo) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }
})

Vue.use(Vonic.app, {
    routes,
    store
})

