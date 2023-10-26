import React from "react";
import {
  AcknowledgeModalOptions,
  ModalOptionsBase,
  WithInternalId,
} from "../types";
import { modal } from "../state";

function AcknowledgeModal({
  options,
}: {
  options: WithInternalId<AcknowledgeModalOptions>;
}) {
  const handleAcknowledge = options.onAcknowledge || (() => modal.close());

  return (
    <div>
      <div>
        <h3 className="stapel-modal-title">{options.title}</h3>
        <div className="stapel-modal-text">
          <p>{options.content}</p>
        </div>
      </div>

      <div className="stapel-modal-button-group">
        <button className="stapel-modal-button" onClick={handleAcknowledge}>
          Ok
        </button>
      </div>
    </div>
  );
}

export default AcknowledgeModal;
