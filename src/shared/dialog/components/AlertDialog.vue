<template>
    <div class="alert alert-light text-center">
        <span>{{ message }}</span>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useDialogStore } from '@/shared/dialog/store/dialog.store';
    const dialog = useDialogStore();
    const { message } = storeToRefs(dialog);
</script>

<style scoped>
    .alert {
        min-width: 300px;
    }
</style>