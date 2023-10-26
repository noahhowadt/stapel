"use client";
import { useState, useEffect } from "react";
import { Modal, StackerProps } from "../types";
import { closeSvg } from "../assets";
import { modal as modalHandler } from "../state";

interface ModalWrapperProps extends StackerProps {
  children: React.ReactNode;
  modal: Modal;
  isCurrent: boolean;
}

const DEFAULT_ANIMATION_DURATION = "100ms";
const DEFAULT_ANIMATION_OFFSET = "1.5rem";

function ModalWrapper(props: ModalWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);
  const handleClose = props.modal.onClose || (() => modalHandler.close());

  useEffect(() => {
    if (props.isCurrent) {
      setTimeout(() => setIsMounted(true), 30);
    }

    return () => setIsMounted(false);
  }, [props.isCurrent]);

  if (!props.isCurrent) return null;
  return (
    <div className="stapel-modal-center">
      <div
        className={`stapel-modal ${props.modalOptions?.className}`}
        style={{
          ...props.modalOptions?.style,
          opacity: isMounted ? 1 : 0,
          transform:
            isMounted || props.modalOptions?.animation === "none"
              ? ""
              : `translateY(${
                  props.modalOptions?.animation?.offset ||
                  DEFAULT_ANIMATION_OFFSET
                })`,
          transitionDuration:
            props.modalOptions?.animation === "none"
              ? undefined
              : props.modalOptions?.animation?.duration ||
                DEFAULT_ANIMATION_DURATION,
        }}
      >
        {props.modalOptions?.showCloseButton !== false ? (
          <button onClick={handleClose} className="stapel-modal-close-button">
            {closeSvg}
          </button>
        ) : null}
        <div>{props.children}</div>
      </div>
    </div>
  );
}

export default ModalWrapper;
