import create from 'zustand';
import { ReactText } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastStateManagementType, ToastWrapperType, UpdateToastWrapperType } from 'types/Toast';
import { toast } from 'react-toastify';
import { ToastChannelType } from 'shared/utils/ToastChannel';

export interface ToastChannelDataStoreInterface extends ToastChannelType {
    activeToastChannels: ToastStateManagementType;
}

export const useToastChannelDataStore = create<ToastChannelDataStoreInterface>(set => ({
    activeToastChannels: {},

    addToastIdToChannel: (channel: string, toastId: ReactText) =>
        set(state => {
            const newToastIds = [...(state?.activeToastChannels[channel] || []), toastId];
            return {
                activeToastChannels: { ...state.activeToastChannels, [channel]: newToastIds },
            };
        }),
    dismissToastIdFromChannel: (channel: string, toastId: ReactText) =>
        set(state => {
            toast.dismiss(toastId);
            const oldToastIds = state.activeToastChannels[channel] || [];
            const newToastIds = oldToastIds.filter(t => t !== toastId);
            return {
                activeToastChannels: { ...state.activeToastChannels, [channel]: newToastIds },
            };
        }),
    addToastToChannel: (channel: string, toastWrapper: ToastWrapperType) => {
        const toastId = uuidv4();
        set(state => {
            // create deterministic id
            const { toast, content, options } = toastWrapper;

            const oldOnClose = options?.onClose?.bind({});

            // create on close wrapper
            const onClose = () => {
                state.dismissToastIdFromChannel(channel, toastId);
                oldOnClose?.();
            };

            // trigger toast
            toast(content, { ...options, onClose, toastId });
            state.addToastIdToChannel(channel, toastId);
        });
        return toastId;
    },

    updateToastInChannel: (channel: string, updateToastWrapper: UpdateToastWrapperType) =>
        set(state => {
            let { toastId, options } = updateToastWrapper;

            // if no toastId provided, take first form channel
            if (!toastId && state.activeToastChannels[channel]?.length > 0) {
                toastId = state.activeToastChannels[channel][0];
            }

            if (!toastId) {
                state.addToastToChannel(channel, {
                    toast: toast.info,
                    content: updateToastWrapper?.options?.render,
                    options,
                });
                return {};
            }

            if (options?.onClose) {
                const oldOnClose = options?.onClose.bind({});

                // create on close wrapper
                const onClose = () => {
                    state.dismissToastIdFromChannel(channel, toastId);
                    oldOnClose?.();
                };

                options.onClose = onClose;
            }

            toast.update(toastId, options);
        }),

    dismissChannel: (channel: string) =>
        set(state => {
            const toastIds = state.activeToastChannels[channel] || [];
            if (toastIds.length > 0) {
                toastIds.forEach(id => toast.dismiss(id));
                const channels = { ...state.activeToastChannels };
                delete channels[channel];
                return { activeToastChannels: channels };
            }
        }),
}));
