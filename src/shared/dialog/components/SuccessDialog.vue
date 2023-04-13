<template>
    <div class="alert alert-success text-center">
        <span><i :class="(icon) ? `bi-${ icon }` : 'bi-check-circle'"></i> {{ message }}</span>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useDialogStore } from '@/shared/dialog/store/dialog.store';
    const dialog = useDialogStore();
    const { message, icon } = storeToRefs(dialog);
</script>

<style scoped>
    .alert {
        min-width: 300px;
    }
</style>