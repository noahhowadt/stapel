"use client";
import Button from "@/components/Button";
import { Link } from "nextra-theme-docs";
import { useState } from "react";
import { modal, Stacker } from "stapel";

export default function Home() {
  const [type, setType] = useState<"default" | "warning">("default");

  return (
    <div>
      <Stacker />
      <div className="max-w-xl mx-auto mt-36 flex flex-col">
        <div className="flex flex-col items-center w-full mb-16">
          <h1 className="text-5xl font-bold mb-4">Stapel</h1>
          <span className="block text-lg mb-6">
            A flexible modal handling library for React.
          </span>
          <div className="flex max-w-sm gap-4 w-full justify-center">
            <Link href="/getting-started" className="flex-1">
              <button className="shadow rounded px-6 py-3 bg-black text-white font-semibold w-full border-[1px] border-black hover:bg-gray-900 transition-colors">
                Get Started
              </button>
            </Link>
            <a href="https://github.com/noahhowadt/stapel" className="flex-1">
              <button className="shadow rounded px-6 py-3 border-gray-100 border-[1px] font-semibold w-full hover:bg-gray-50 transition-colors">
                GitHub
              </button>
            </a>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4">Playground</h2>
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-4">Type</h3>
          <div className="flex gap-1 w-full">
            <Button
              onClick={() => setType("default")}
              isPressed={type === "default"}
            >
              Default
            </Button>
            <Button
              onClick={() => setType("warning")}
              isPressed={type === "warning"}
            >
              Warning
            </Button>
          </div>
        </div>
        <button
          className="shadow rounded px-3 py-2 bg-black text-white font-semibold w-full border-[1px] border-black hover:bg-gray-900 transition-colors mt-6"
          onClick={modal}
        >
          Open Modal
        </button>
      </div>
    </div>
  );
}
