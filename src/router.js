import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import Fakture from './views/Fakture.vue'
import Home from './views/home.vue'
import Komitenti from './views/Komitenti.vue'
import MojaFirma from './views/MojaFirma.vue'
import MojiPodaci from './views/MojiPodaci.vue'
import Porez from './views/Porez.vue'
import Validation from './views/validation.vue'
import ZKnjizice from './views/ZKnjizice.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/fakture',
      name: 'Fakture',
      component: Fakture
    },
    {
      path: '/komitenti',
      name: 'komitenti',
      component: Komitenti
    },
    {
      path: '/mojaFirma',
      name: 'mojaFirma',
      component: MojaFirma
    },
    {
      path: '/mojiPodaci',
      name: 'mojiPodaci',
      component: MojiPodaci
    },
    {
      path: '/porez',
      name: 'porez',
      component: Porez
    },
    {
      path: '/validation',
      name: 'validation',
      component: Validation
    },
    {
      path: '/zKnjizice',
      name: 'zknjizice',
      component: ZKnjizice
    }
  ]
})
