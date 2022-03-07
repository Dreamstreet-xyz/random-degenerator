import { ReactText } from 'react';
import { Id, ToastContent, ToastOptions, UpdateOptions } from 'react-toastify';

export enum ToastType {
    success = 'success',
    info = 'info',
    error = 'error',
    warning = 'warning',
    warn = 'warn',
    dark = 'dark',
}

export type ToastStateManagementType = {
    [Key: string]: ReactText[];
};

export type ToastWrapperType = {
    toast: (content: ToastContent, options?: ToastOptions<{}> | undefined) => ReactText;
    content: ToastContent;
    options?: ToastOptions<{}> | undefined;
};

export type UpdateToastWrapperType = {
    toastId?: Id;
    options?: UpdateOptions;
};
