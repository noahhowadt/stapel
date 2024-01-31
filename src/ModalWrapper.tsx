"use client";
import React, { useEffect, useState } from "react";
import { closeSvg } from "./assets";
import { modal as modalHandler } from "./state";
import { InternalModal, ModalOptions } from "./types";

interface ModalWrapperProps {
  children: React.ReactNode;
  modal: InternalModal;
  isCurrent: boolean;
  modalOptions: ModalOptions;
}

function ModalWrapper(props: ModalWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (props.isCurrent) {
      if (
        "render" in props.modalOptions ||
        props.modalOptions.animation === null
      ) {
        console.log("setting directly");
        setIsMounted(true);
      } else {
        console.log("setting timeout");
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
      {"render" in props.modalOptions ? (
        props.modalOptions.render(props.modal, isMounted)
      ) : (
        <div
          className="stapel-modal"
          style={{
            opacity: isMounted ? 1 : props.modalOptions.animation?.opacity ?? 1,
            transform:
              isMounted || props.modalOptions.animation === null
                ? ""
                : `scale(${
                    props.modalOptions.animation?.scale ?? 1
                  }) translate(${
                    props.modalOptions.animation?.translateX ?? 0
                  }, ${props.modalOptions.animation?.translateY ?? 0})`,
            transitionDuration: props.modalOptions.animation?.duration,
          }}
        >
          {props.modalOptions.hideCloseButton !== true ? (
            <button
              onClick={() => modalHandler.close(props.modal.id)}
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
