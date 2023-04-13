<template>
    <button class="btn btn-primary float-first" @click="() => router.replace({ name: 'home' })">
        <i class="bi-arrow-left-circle"></i>
    </button>
</template>

<script setup lang="ts">
    import router from '@/router';
</script>

<style scoped>
    button {
        border-radius: 50%;
        bottom: 20px;
        left: 20px;
        position: fixed;
    }
</style>