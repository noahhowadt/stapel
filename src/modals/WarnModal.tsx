import React from "react";
import { WarnModalOptions, WithInternalId } from "../types";
import { warnSvg } from "../assets";
import { modal } from "../state";

function WarnModal({ options }: { options: WithInternalId<WarnModalOptions> }) {
  const handleConfirm = options.onConfirm || (() => modal.close());
  const handleCancel = options.onCancel || (() => modal.close());

  return (
    <div>
      <div className="stapel-modal-icon-layout">
        <div className="stapel-modal-icon-container">{warnSvg}</div>
        <div>
          <h3 className="stapel-modal-title">{options.title}</h3>
          <div className="stapel-modal-text">
            <p>{options.content}</p>
          </div>
        </div>
      </div>
      <div className="stapel-modal-button-group">
        <button
          className="stapel-modal-button stapel-modal-button-destructive"
          onClick={handleConfirm}
        >
          {options.confirmText || "Confirm"}
        </button>
        <button className="stapel-modal-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default WarnModal;
