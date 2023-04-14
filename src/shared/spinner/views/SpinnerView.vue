<template>
    <Transition name="spinner">
        <div class="loading" v-if="isLoading">
        <div class="spinner-container position-absolute d-flex justify-content-center align-items-center h-100 w-100">
            <div class="spinner spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useSpinnerStore } from '@/shared/spinner/store/spinner.store';
    const { isLoading } = storeToRefs(useSpinnerStore());
</script>

<style scoped>
    .loading {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9997;
    }

    .spinner {
      z-index: 9999;
    }
    
    .spinner-container {
      background: rgba(0, 0, 0, 0.3);
      z-index: 9998;
    }
    
    .spinner-enter-active,
    .spinner-leave-active {
        transition: opacity 0.2s ease;
    }

    .spinner-enter-from,
    .spinner-leave-to {
        opacity: 0;
    }
</style>