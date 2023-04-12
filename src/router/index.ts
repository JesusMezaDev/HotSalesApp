import { createRouter, createWebHashHistory } from 'vue-router';
// import CustomerListView from '@/modules/customers/views/CustomerList.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "Home" */ '@/views/HomeView.vue')
    },
    {
      path: '/customers',
      name: 'customers',
      component: () => import(/* webpackChunkName: "CustomerList" */ '@/modules/customers/views/CustomerListView.vue')
    },
    {
      path: '/customer',
      name: 'customer',
      component: () => import(/* webpackChunkName: "Customer" */ '@/modules/customers/views/CustomerView.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import(/* webpackChunkName: "ProductList" */ '@/modules/products/views/ProductListView.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import(/* webpackChunkName: "Product" */ '@/modules/products/views/ProductView.vue')
    },
  ]
});

export default router;