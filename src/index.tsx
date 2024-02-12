"use client";
import { useEffect, useState } from "react";
import Backdrop from "./Backdrop";
import ModalWrapper from "./ModalWrapper";
import { ModalState, modal } from "./state";
import "./styles.css";
import {
  BackdropOptions,
  Either,
  InternalModal,
  ModalOptions,
  ModalProps,
} from "./types";

type StackerProps = Either<
  {
    modalOptions?: ModalOptions;
    backdropOptions?: BackdropOptions;
  },
  {
    headless?: boolean;
  }
>;

const DEFAULT_OPTIONS: ModalProps = {
  modalOptions: {
    animation: {
      duration: "150ms",
      translateY: "1.5rem",
      opacity: 0,
    },
  },
  backdropOptions: {},
};

function mergeOptions(
  stackerProps: StackerProps,
  currentModalProps: ModalProps
): ModalProps {
  return {
    // @ts-ignore - Render method doesn't need to be defined
    modalOptions: {
      ...DEFAULT_OPTIONS.modalOptions,
      ...stackerProps.modalOptions,
      ...currentModalProps.modalOptions,
    },
    backdropOptions: {
      ...DEFAULT_OPTIONS.backdropOptions,
      ...stackerProps.backdropOptions,
      ...currentModalProps.backdropOptions,
    },
  };
}

function Stacker(props: StackerProps) {
  const [currentModals, setCurrentModals] = useState<Array<InternalModal>>([]);
  const [options, setOptions] = useState<ModalProps>(mergeOptions(props, {}));

  useEffect(() => {
    const unsubscribe = ModalState.subscribe((modals) => {
      setCurrentModals(modals);
      if (!modals.length) return setOptions({ ...DEFAULT_OPTIONS, ...props });
      setOptions(
        mergeOptions(props, {
          modalOptions: modals[0].modalOptions,
          backdropOptions: modals[0].backdropOptions,
        })
      );
    });
    return () => unsubscribe();
  }, []);

  if (!currentModals.length) return;
  if (props.headless)
    return currentModals.map((m, i) => (
      <div style={{ display: i === 0 ? "block" : "none" }} key={m.id}>
        {m.render()}
      </div>
    ));
  return (
    <div className="stapel-stacker">
      <Backdrop options={options.backdropOptions} />
      {currentModals.map((m, i) => (
        <ModalWrapper
          modal={m}
          isCurrent={i === 0}
          key={m.id}
          modalOptions={options.modalOptions}
        >
          {m.render()}
        </ModalWrapper>
      ))}
    </div>
  );
}

export { Stacker, modal };
