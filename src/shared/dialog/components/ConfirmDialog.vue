<template>
    <div class="alert confirm" :class="(classDialog) ? `alert-${ classDialog }` : 'alert-light'">
        <h5 v-if="titleConfirm">{{ titleConfirm }}</h5>
        <span><i class="bi" :class="(icon) ? `bi-${ icon }` : 'bi-question-circle'"></i> {{ message }}</span>
        <hr>
        <button class="btn btn-success btn-sm m-1 float-end" @click="confirm">{{ labelOkButton }}</button>
        <button class="btn btn-danger btn-sm m-1 float-end" @click="cancel">{{ labelCancelButton }}</button>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useDialogStore } from '../store/dialog.store';
    const dialog = useDialogStore();
    const { classDialog, titleConfirm, icon, message } = storeToRefs(dialog);
    const { cancel, confirm, labelCancelButton, labelOkButton } = dialog;
</script>

<style scoped>
    .confirm {
        min-width: 300px;
        max-width: 600px;
    }
</style>