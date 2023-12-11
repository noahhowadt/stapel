"use client";
import { useEffect, useState } from "react";
import { closeSvg } from "./assets";
import { modal as modalHandler } from "./state";
import { InternalModal, StackerOptions } from "./types";

interface ModalWrapperProps extends StackerOptions {
  children: React.ReactNode;
  modal: InternalModal;
  isCurrent: boolean;
}

const DEFAULT_ANIMATION_OFFSET = "1.5rem";
const DEFAULT_ANIMATION_DURATION = "150ms";

function ModalWrapper(props: ModalWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);
  const handleClose = props.modal.onClose || ((id) => modalHandler.close(id));

  useEffect(() => {
    if (props.isCurrent) {
      if (
        typeof props.renderWrapper == "function" ||
        props.renderWrapper?.animation === null
      ) {
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
      {typeof props.renderWrapper === "function" ? (
        props.renderWrapper(props.modal, isMounted)
      ) : (
        <div
          className="stapel-modal"
          style={{
            opacity: isMounted ? 1 : 0,
            transform:
              isMounted || props.renderWrapper?.animation === null
                ? ""
                : `translateY(${
                    props.renderWrapper?.animation?.offset ||
                    DEFAULT_ANIMATION_OFFSET
                  })`,
            transitionDuration:
              props.renderWrapper?.animation === null
                ? undefined
                : props.renderWrapper?.animation?.duration ||
                  DEFAULT_ANIMATION_DURATION,
          }}
        >
          {props.renderWrapper?.hideCloseButton !== true ? (
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
