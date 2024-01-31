"use client";
import { modal } from "./state";
import { BackdropOptions } from "./types";

interface Props {
  options: BackdropOptions;
}

function Backdrop({ options }: Props) {
  if ("render" in options) {
    if (options.render === null) return null;
    if (options.render !== undefined) {
      return (
        <div onClick={options.closeAllOnClick ? modal.closeAll : undefined}>
          {options.render()}
        </div>
      );
    }
  }

  return (
    <div
      className="stapel-stacker-bg"
      onClick={options.closeAllOnClick ? modal.closeAll : undefined}
    />
  );
}

export default Backdrop;
