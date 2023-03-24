<script setup lang="ts">
// import HomeView from './modules/customers/views/Customer.vue';
// import CustomerList from './modules/customers/views/CustomerList.vue';


</script>

<template>
  <div class="container">
    <!-- <HomeView/> -->
    <!-- <CustomerList /> -->
    <RouterView v-slot="{ Component, route }">
      <KeepAlive>
        <component :is="Component" :key="route.name" />
      </KeepAlive>
    </RouterView>
  </div>
</template>

<style>
  @import 'bootstrap/dist/css/bootstrap.min.css';
  @import 'bootstrap-icons/font/bootstrap-icons.css';
</style>
