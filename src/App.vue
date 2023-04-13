<template>
  <div class="container-sm">
    <RouterView v-slot="{ Component, route }">
      <KeepAlive>
        <component :is="Component" :key="route.name" />
      </KeepAlive>
    </RouterView>
    <DialogView />
  </div>
</template>

<script setup lang="ts">
  import DialogView from '@/shared/dialog/views/DialogView.vue';
</script>

<style>
  @import 'bootstrap/dist/css/bootstrap.min.css';
  @import 'bootstrap-icons/font/bootstrap-icons.css';
</style>
