import { computed, ref } from 'vue';

import { defineStore } from 'pinia';

import type { IDialogOptions } from '@/shared/dialog/interfaces/dialogOptions.interface';

const storeSetup = () => {
    const showDialog = ref<boolean>(false);
    const dialogTemplate = ref<IDialogOptions>({
        classDialog: 'success',
        dialogType: 'alert',
        icon: undefined,
        labelCancelButton: undefined,
        labelOkButton: undefined,
        message: '',
        onCloseDialog: undefined,
        onConfirmDialog: undefined,
        titleConfirm: undefined,
    });
    const dialog = ref<IDialogOptions>(dialogTemplate.value);

    const setDialog = (options: IDialogOptions) => {
        dialog.value = {
            classDialog: options.classDialog,
            dialogType: options.dialogType,
            icon: options.icon,
            labelCancelButton: options.labelCancelButton,
            labelOkButton: options.labelOkButton,
            message: options.message,
            onCloseDialog: options.onCloseDialog,
            onConfirmDialog: options.onConfirmDialog,
            titleConfirm: options.titleConfirm,
        }
    }
    const cancel = (): void => { showDialog.value = false; }
    const close = (): void => {
        showDialog.value = false;
        if (dialog.value.onCloseDialog) dialog.value.onCloseDialog();
        dialog.value = { ...dialogTemplate.value };
    }
    const confirm = async(): Promise<void> => {
        if (dialog.value.onConfirmDialog) await dialog.value.onConfirmDialog();
        close();
    }
    const selfClose = (): void => {
        if (dialog.value.dialogType === 'confirm') return;
        close();
    }
    const show = (): void => { showDialog.value = true; }

    return {
        /* State properties */
        cancel,
        confirm,
        selfClose,
        setDialog,
        show,
        /* Getters */
        classDialog: computed((): string | undefined => dialog.value.classDialog),
        dialogType: computed((): string => dialog.value.dialogType),
        icon: computed((): string | undefined => dialog.value.icon),
        isShowing: computed((): boolean | undefined => showDialog.value),
        labelCancelButton: computed((): string | undefined => dialog.value.labelCancelButton),
        labelOkButton: computed((): string | undefined => dialog.value.labelOkButton),
        message: computed((): string => dialog.value.message),
        titleConfirm: computed((): string | undefined => dialog.value.titleConfirm),
        /* Actions */
    }
}

export const useDialogStore = defineStore('dialogStore', storeSetup);