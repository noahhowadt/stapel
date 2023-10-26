import React from "react";
import {
  AcknowledgeModalOptions,
  ModalOptionsBase,
  WithInternalId,
} from "../types";
import { modal } from "../state";

function PlainModal({
  options,
}: {
  options: WithInternalId<ModalOptionsBase>;
}) {
  return (
    <div>
      <div>
        <h3 className="stapel-modal-title">{options.title}</h3>
        <div className="stapel-modal-text">
          <p>{options.content}</p>
        </div>
      </div>
    </div>
  );
}

export default PlainModal;
