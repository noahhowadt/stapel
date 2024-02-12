"use client";
import { modal } from "./state";
import { BackdropOptions } from "./types";

interface Props {
  options: BackdropOptions;
}

const cn = (options: BackdropOptions) =>
  [
    "stapel-backdrop-base",
    options.unstyled ? "" : "stapel-backdrop",
    options.className,
  ].join(" ");

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
      className={cn(options)}
      style={options.style}
      onClick={options.closeAllOnClick ? modal.closeAll : undefined}
    />
  );
}

export default Backdrop;
