import { modal } from "./state";
import { StackerOptions } from "./types";

interface Props {
  renderBackdrop: StackerOptions["renderBackdrop"];
}

function Backdrop({ renderBackdrop }: Props) {
  if (renderBackdrop === null) return null;
  if (typeof renderBackdrop === "function") return renderBackdrop();
  return (
    <div
      className={`stapel-stacker-bg ${renderBackdrop?.className || ""}`}
      style={renderBackdrop?.style}
      onClick={renderBackdrop?.closeOnClick ? modal.closeAll : undefined}
    />
  );
}

export default Backdrop;
