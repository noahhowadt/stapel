import { CSSProperties } from "react";

export type Modal = DefaultModal | WarnModal

interface InternalModalData {
  id: string | number;
}
type ModalType = "default" | "warn" | "help" | "success" | "error" | "custom" | "headless"

export interface ModalOptionsBase {
  id?: string | number;
  title: string;
  text: string;
}

export type DefaultModal = {type: "default"} & ModalOptionsBase & InternalModalData

export interface WarnModalOptions extends ModalOptionsBase {
  onConfirm: () => void;
  onCancel?: () => void;
}
export type WarnModal = {type: "warn"} & WarnModalOptions & InternalModalData

export interface Styling {
  style?: CSSProperties;
  className?: string;
}

export interface StackerProps {
  modalOptions?: Styling & {
    animation?: "none" | {
      duration?: number,
      offset?: string
    };
    showCloseButton?: boolean;
  };
  modalBodyOptions?: Styling;
  modalFooterOptions?: Styling;
  modalBackdropOptions?: Styling;
}