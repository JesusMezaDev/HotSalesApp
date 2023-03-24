import { createRouter, createWebHashHistory } from 'vue-router';
// import CustomerListView from '@/modules/customers/views/CustomerList.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "CustomerList" */ '@/modules/customers/views/CustomerList.vue')
    },
    {
      path: '/customer',
      name: 'customer',
      component: () => import(/* webpackChunkName: "Customer" */ '@/modules/customers/views/Customer.vue')
    },
  ]
});

export default router;