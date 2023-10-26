import { CSSProperties } from "react";

export type Modal = CustomModal | PlainModal | AcknowledgeModal | WarnModal

// internal modal data
export type WithInternalId<T> = Omit<T, "id"> & {id: string | number}

// custom modal
export interface CustomModalOptions {
  id?: string,
  headless?: boolean;
  onClose?: () => void;
}
export type CustomModal = {type: "custom"} & {component: React.ReactNode} & WithInternalId<CustomModalOptions>

// standard modals
export interface ModalOptionsBase {
  id?: string;
  title: string;
  content: string;
  onClose?: () => void;
}

// plain modal
export type PlainModal = {type: "plain"} & WithInternalId<ModalOptionsBase>

// acknowledge modal
export interface AcknowledgeModalOptions extends ModalOptionsBase {
  onAcknowledge?: () => void;
}
export type AcknowledgeModal = {type: "acknowledge"} & WithInternalId<AcknowledgeModalOptions>

// warn modal
export interface WarnModalOptions extends ModalOptionsBase {
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
}
export type WarnModal = {type: "warn"} & WithInternalId<WarnModalOptions>

// stacker props
export interface Styling {
  style?: CSSProperties;
  className?: string;
}

export interface StackerProps {
  modalOptions?: Styling & {
    animation?: "none" | {
      duration?: string,
      offset?: string
    };
    showCloseButton?: boolean;
  };
  modalBackdropOptions?: Styling;
}