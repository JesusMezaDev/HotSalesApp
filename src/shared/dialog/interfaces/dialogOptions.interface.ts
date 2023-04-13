export interface IDialogOptions {
    classDialog?: 'danger' | 'light' | 'success' | 'warning';
    dialogType: 'alert' | 'confirm' | 'error' | 'success';
    icon?: string;
    labelCancelButton?: string;
    labelOkButton?: string;
    message: string;
    onConfirmDialog?: () => {} | void,
    onCloseDialog?: () => {} | void,
    titleConfirm?: string;
}