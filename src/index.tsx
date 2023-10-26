"use client";
import "./styles.css";
import { useEffect, useState } from "react";
import { Modal, StackerProps } from "./types";
import { ModalState, modal } from "./state";
import { warnSvg } from "./assets";
import ModalWrapper from "./modals/ModalWrapper";
import WarnModal from "./modals/WarnModal";
import AcknowledgeModal from "./modals/AcknowledgeModal";
import PlainModal from "./modals/PlainModal";

const Stacker = (props: StackerProps) => {
  const [currentModals, setCurrentModals] = useState<Array<Modal>>([]);

  useEffect(() => {
    const unsubscribe = ModalState.subscribe((modals) =>
      setCurrentModals(modals)
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log(currentModals);
  }, [currentModals]);

  if (!currentModals.length) return;
  return (
    <div className="stapel-stacker">
      <div
        className={`stapel-stacker-bg ${props.modalBackdropOptions?.className}`}
        style={props.modalBackdropOptions?.style}
      />
      {currentModals.map((m, i) =>
        m.type === "custom" && m.headless ? (
          m.component
        ) : (
          <ModalWrapper {...props} modal={m} isCurrent={i === 0} key={m.id}>
            {m.type === "plain" ? <PlainModal options={m} /> : null}
            {m.type === "acknowledge" ? <AcknowledgeModal options={m} /> : null}
            {m.type === "warn" ? <WarnModal options={m} /> : null}
            {m.type === "custom" ? m.component : null}
          </ModalWrapper>
        )
      )}
    </div>
  );
};

export { Stacker, modal };
