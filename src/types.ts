// internal modal data
export type ModalId = string | number;
export type InternalModal = Omit<ModalOptions, "id"> & {
  id: ModalId;
  render: (id: ModalId) => React.ReactNode;
};

// modal options
export interface ModalOptions {
  id?: string;
  onClose?: (id: ModalId) => void;
}

// stacker options
type RenderWrapper =
  | ((modal: InternalModal, isMounted: boolean) => React.ReactNode)
  | WrapperOptions;
type RenderBackdrop = (() => React.ReactNode) | BackdropOptions | null;

interface WrapperOptions {
  hideCloseButton?: boolean;
  animation?: null | {
    duration?: string;
    offset?: string;
  };
}

interface BackdropOptions {
  closeOnClick?: boolean;
}

export interface StackerOptions {
  renderWrapper?: RenderWrapper;
  renderBackdrop?: RenderBackdrop;
}
