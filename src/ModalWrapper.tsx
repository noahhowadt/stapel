"use client";
import React, { useEffect, useState } from "react";
import { closeSvg } from "./assets";
import { modal as modalHandler } from "./state";
import { InternalModal, StackerOptions } from "./types";

interface ModalWrapperProps extends StackerOptions {
  children: React.ReactNode;
  modal: InternalModal;
  isCurrent: boolean;
}

function ModalWrapper(props: ModalWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);
  const handleClose = props.modal.onClose || ((id) => modalHandler.close(id));

  useEffect(() => {
    if (props.isCurrent) {
      if (typeof props.modalWrapper == "function" || props.animation === null) {
        setIsMounted(true);
      } else {
        setTimeout(() => setIsMounted(true), 0);
      }
    }

    return () => setIsMounted(false);
  }, [props.isCurrent]);

  return (
    <div
      style={{
        display: props.isCurrent ? "block" : "none",
        position: "relative",
      }}
    >
      {typeof props.modalWrapper == "function" ? (
        props.modalWrapper(props.modal, isMounted)
      ) : (
        <div
          className="stapel-modal"
          style={{
            opacity: isMounted ? 1 : 0,
            transform:
              isMounted || props.animation === null
                ? ""
                : `translateY(${props.animation?.offset})`,
            transitionDuration:
              props.animation === null ? undefined : props.animation?.duration,
          }}
        >
          {props.modalWrapper?.hideCloseButton !== true ? (
            <button
              onClick={() => handleClose(props.modal.id)}
              className="stapel-modal-close-button"
            >
              {closeSvg}
            </button>
          ) : null}
          <div>{props.children}</div>
        </div>
      )}
    </div>
  );
}

export default ModalWrapper;
