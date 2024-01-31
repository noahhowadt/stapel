import Button from "@/components/Button";
import AcknowledgeModal from "@/components/modals/AcknowledgeModal";
import MultipleModalsModal from "@/components/modals/MultipleModalsModal";
import { Link } from "nextra-theme-docs";
import { useEffect } from "react";
import { Stacker, modal } from "stapel";

export default function Home() {
  useEffect(() => {
    const htmlEl = document.querySelector("html");
    if (!htmlEl) return;
    htmlEl.classList.remove("dark");
    htmlEl.removeAttribute("style");
  }, []);

  return (
    <div>
      <Stacker
        modalOptions={{
          animation: {
            duration: "0.2s",
            scale: 0.95,
            opacity: 0,
          },
        }}
      />
      <div className="max-w-xl mx-auto mt-36 flex flex-col">
        <div className="flex flex-col items-center w-full mb-16">
          <h1 className="text-5xl font-bold mb-4">Stapel</h1>
          <span className="block text-lg mb-6">
            An unopinionated modal handling library for React.
          </span>
          <div className="flex max-w-sm gap-4 w-full justify-center">
            <Link href="/getting-started" className="flex-1">
              <button className="shadow rounded px-6 py-3 bg-black text-white font-semibold w-full border-[1px] border-black hover:bg-gray-900 transition-colors">
                Get Started
              </button>
            </Link>
            <a
              href="https://github.com/noahhowadt/stapel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <button className="shadow rounded px-6 py-3 border-gray-100 border-[1px] font-semibold w-full hover:bg-gray-50 transition-colors">
                GitHub
              </button>
            </a>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4">Features</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <div className="flex gap-1 w-full">
              <Button
                onClick={() =>
                  modal.open(() => (
                    <div className="flex flex-col gap-4">
                      <h2 className="text-lg font-semibold">
                        Get started quickly
                      </h2>
                      <p>
                        Stapel comes with simple default styles and animations
                        for the modal window to get you started quickly. All you
                        have to do is provide the content for the modal.
                      </p>
                    </div>
                  ))
                }
              >
                Smart defaults
              </Button>
              <Button onClick={() => modal.open(() => <AcknowledgeModal />)}>
                Customizable
              </Button>
              <Button onClick={() => modal.open(() => <MultipleModalsModal />)}>
                Modal stack managment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
