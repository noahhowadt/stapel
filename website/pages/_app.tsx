import type { ReactElement } from "react";
import type { AppProps } from "next/app";
import "../globals.css";

export default function Nextra({
  Component,
  pageProps,
}: AppProps): ReactElement {
  return (
    <>
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </>
  );
}
