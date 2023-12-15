"use client";
import React, { useEffect, useState } from "react";
import Backdrop from "./Backdrop";
import ModalWrapper from "./ModalWrapper";
import { ModalState, modal } from "./state";
import "./styles.css";
import { InternalModal, StackerOptions } from "./types";

const DEFAULT_OPTIONS: StackerOptions = {
  closeAllOnBackdropClick: false,
  animation: {
    offset: "1.5rem",
    duration: "150ms",
  },
};

const Stacker = (props: StackerOptions) => {
  const [currentModals, setCurrentModals] = useState<Array<InternalModal>>([]);
  const options: StackerOptions = {
    ...DEFAULT_OPTIONS,
    ...props,
    ...currentModals[0]?.options,
  };

  useEffect(() => {
    const unsubscribe = ModalState.subscribe((modals) =>
      setCurrentModals(modals)
    );
    return () => unsubscribe();
  }, []);

  if (!currentModals.length) return;
  return (
    <div className="stapel-stacker">
      <Backdrop
        closeOnClick={options.closeAllOnBackdropClick}
        render={options.backdrop}
      />
      {currentModals.map((m, i) => (
        <ModalWrapper {...options} modal={m} isCurrent={i === 0} key={m.id}>
          {m.render()}
        </ModalWrapper>
      ))}
    </div>
  );
};

export { Stacker, modal };
