"use client";
import "./styles.css";
import { useEffect, useState } from "react";
import { Modal, StackerProps } from "./types";
import { ModalState, modal } from "./state";
import { closeSvg, warnSvg } from "./assets";

const DEFAULT_ANIMATION_DURATION = 100;
const DEFAULT_ANIMATION_OFFSET = "1.5rem";

const Stacker = (props: StackerProps) => {
  const [currentModal, setCurrentModal] = useState<Modal | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const unsubscribe = ModalState.subscribe((m) => {
      if (!isMounted || !m || props.modalOptions?.animation === "none") {
        setCurrentModal(m);
        return;
      }

      setIsMounted(false);
      setTimeout(
        () => setCurrentModal(m),
        props.modalOptions?.animation?.duration || DEFAULT_ANIMATION_DURATION
      );
    });

    return () => unsubscribe();
  }, [isMounted]);

  useEffect(() => {
    if (currentModal) setIsMounted(true);

    return () => setIsMounted(false);
  }, [currentModal]);

  if (!currentModal) return;
  return (
    <div className="stapel-stacker">
      <div
        className={`stapel-stacker-bg ${props.modalBackdropOptions?.className}`}
        style={props.modalBackdropOptions?.style}
      />
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
        }}
      >
        {props.modalOptions?.showCloseButton !== false ? (
          <button
            // @ts-expect-error
            onClick={currentModal.onCancel || modal.close}
            className="stapel-modal-close-button"
          >
            {closeSvg}
          </button>
        ) : null}
        <div
          className={`stapel-modal-body ${props.modalBodyOptions?.className}`}
          style={props.modalBodyOptions?.style}
        >
          {currentModal.type === "warn" ? (
            <div className="stapel-modal-icon-container">{warnSvg}</div>
          ) : null}
          <div className="stapel-modal-content">
            <h3 className="stapel-modal-title">{currentModal.title}</h3>
            <div className="stapel-modal-text">
              <p>{currentModal.text}</p>
            </div>
          </div>
        </div>
        {currentModal.type === "warn" ? (
          <div
            className={`stapel-modal-footer ${props.modalFooterOptions?.className}`}
            style={props.modalFooterOptions?.style}
          >
            <button
              className="stapel-modal-button stapel-modal-button-destructive"
              onClick={currentModal.onConfirm}
            >
              Deactivate
            </button>
            <button
              className="stapel-modal-button"
              onClick={currentModal.onCancel || modal.close}
            >
              Cancel
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export { Stacker, modal };
