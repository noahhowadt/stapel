"use client";
import React from "react";
import { modal } from "./state";
import { RenderBackdrop } from "./types";

interface Props {
  closeOnClick?: boolean;
  render?: RenderBackdrop;
}

function Backdrop({ closeOnClick, render }: Props) {
  if (render === null) return null;
  if (render !== undefined) {
    return (
      <div onClick={closeOnClick ? modal.closeAll : undefined}>{render()}</div>
    );
  }

  return (
    <div
      className="stapel-stacker-bg"
      onClick={closeOnClick ? modal.closeAll : undefined}
    />
  );
}

export default Backdrop;
