// internal modal data
export type ModalId = string | number;
export type InternalModal = Omit<ModalOptions, "id"> & {
  id: ModalId;
  render: () => React.ReactNode;
  close: () => void;
};

// modal wrapper
export type RenderModalWrapper = (
  modal: InternalModal,
  isMounted: boolean
) => React.ReactNode;
export interface ModalWrapperOptions {
  hideCloseButton?: boolean;
}
type ModalWrapperOptionsOrRender = RenderModalWrapper | ModalWrapperOptions;

// backdrop
export type RenderBackdrop = () => React.ReactNode | null;
export interface ModalOptions {
  id?: string;
  onClose?: (id: ModalId) => void;
  options?: StackerOptions;
}

// stacker options
export interface StackerOptions {
  modalWrapper?: ModalWrapperOptionsOrRender;
  backdrop?: RenderBackdrop;
  closeAllOnBackdropClick?: boolean;
  animation?: null | {
    duration?: string;
    offset?: string;
  };
}
