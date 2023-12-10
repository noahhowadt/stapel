import Button from "@/components/Button";
import { modal } from "stapel";

function AcknowledgeModal() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">How are the modals rendered?</h2>
      <p>
        The rendered modals are just React components. This gives you full
        control over how they look and behave. You can use any styling library
        of your choice. It's just React!
      </p>
      <p>
        <strong>Fun fact:</strong> You can find the code for the modal you are
        currently looking at{" "}
        <a
          href="https://github.com/noahhowadt/stapel/blob/main/website/components/modals/AcknowledgeModal.tsx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          here
        </a>
        .
      </p>
      <Button onClick={() => modal.close()} primary>
        Great!
      </Button>
    </div>
  );
}

export default AcknowledgeModal;
