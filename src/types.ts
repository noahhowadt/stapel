// exact type
/*export type Exact<T, Struct> = T extends Struct
  ? Exclude<keyof T, keyof Struct> extends never
    ? T
    : never
  : never;*/

// internal modal data
export type ModalId = string | number;
export type InternalModal = Omit<ModalProps, "id"> & {
  id: ModalId;
  render: () => React.ReactNode;
  close: () => void;
};

// modal props
export interface ModalProps {
  id?: string;
  modalOptions?: ModalOptions;
  backdropOptions?: BackdropOptions;
}

export type Either<T, U> =
  | ({ [P in keyof T]: T[P] } & { [P in keyof U]: never })
  | ({ [P in keyof U]: U[P] } & { [P in keyof T]: never });

export type ModalOptions = Either<
  { render?: (modal: InternalModal, isMounted: boolean) => React.ReactNode },
  {
    className?: string;
    style?: React.CSSProperties;
    hideCloseButton?: boolean;
    unstyled?: boolean;
  }
> & {
  animation?: null | {
    translateX?: string;
    translateY?: string;
    scale?: number;
    opacity?: number;
    duration?: string;
    // easing?: string;
  };
};

export type BackdropOptions = (
  | { render?: () => React.ReactNode }
  | {
      className?: string;
      style?: React.CSSProperties;
      unstyled?: boolean;
    }
) & {
  closeAllOnClick?: boolean;
};
