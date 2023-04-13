<template>
    <div class="alert alert-danger text-center error">
        <span><i class="bi" :class="(icon) ? `bi-${ icon }` : 'bi-x-circle'"></i> {{ message }}</span>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useDialogStore } from '@/shared/dialog/store/dialog.store';
    const dialog = useDialogStore();
    const { message, icon } = storeToRefs(dialog);
</script>

<style scoped>
    .error {
        min-width: 300px;
    }
</style>