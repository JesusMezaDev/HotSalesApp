<script setup lang="ts">

</script>

<template>
  <div class="container-sm">
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
