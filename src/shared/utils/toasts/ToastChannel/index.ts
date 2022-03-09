import { ReactText } from 'react';
import { useToastChannelDataStore } from 'shared/stores/ToastChannelDataStore';
import { ToastWrapperType, UpdateToastWrapperType } from 'types/Toast';

export type ToastChannelType = {
    addToastIdToChannel: (channel: string, toastId: ReactText) => void;
    dismissToastIdFromChannel: (channel: string, toastId: ReactText) => void;

    addToastToChannel: (channel: string, toastWrapper: ToastWrapperType) => number;
    updateToastInChannel: (channel: string, updateToastWrapper: UpdateToastWrapperType) => void;

    dismissChannel: (channel: string) => void;
};

const ToastChannel: ToastChannelType = {
    addToastIdToChannel: (channel: string, toastId: ReactText) =>
        useToastChannelDataStore.getState().addToastIdToChannel(channel, toastId),
    dismissToastIdFromChannel: (channel: string, toastId: ReactText) =>
        useToastChannelDataStore.getState().dismissToastIdFromChannel(channel, toastId),
    addToastToChannel: (channel: string, toastWrapper: ToastWrapperType) =>
        useToastChannelDataStore.getState().addToastToChannel(channel, toastWrapper),
    updateToastInChannel: (channel: string, updateToastWrapper: UpdateToastWrapperType) =>
        useToastChannelDataStore.getState().updateToastInChannel(channel, updateToastWrapper),
    dismissChannel: (channel: string) =>
        useToastChannelDataStore.getState().dismissChannel(channel),
};

export default ToastChannel;
