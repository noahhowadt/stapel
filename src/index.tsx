"use client";
import { useEffect, useState } from "react";
import Backdrop from "./Backdrop";
import ModalWrapper from "./ModalWrapper";
import { ModalState, modal } from "./state";
import "./styles.css";
import { InternalModal, StackerOptions } from "./types";

const Stacker = (props: StackerOptions) => {
  const [currentModals, setCurrentModals] = useState<Array<InternalModal>>([]);

  useEffect(() => {
    const unsubscribe = ModalState.subscribe((modals) =>
      setCurrentModals(modals)
    );
    return () => unsubscribe();
  }, []);

  if (!currentModals.length) return;
  return (
    <div className="stapel-stacker">
      <Backdrop renderBackdrop={props.renderBackdrop} />
      {currentModals.map((m, i) => (
        <ModalWrapper {...props} modal={m} isCurrent={i === 0} key={m.id}>
          {m.render(m.id)}
        </ModalWrapper>
      ))}
    </div>
  );
};

export { Stacker, modal };
