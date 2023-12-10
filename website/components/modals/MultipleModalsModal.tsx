import { modal } from "stapel";
import Button from "../Button";

function MultipleModalsModal() {
  const funFact =
    modal.getStack().length === 1
      ? "This is the only modal on the stack."
      : modal.getStack().length < 4
      ? `There are currently ${modal.getStack().length} modals on the stack.`
      : `There are ${
          modal.getStack().length
        } modals open. You will probably never need this many open modals.`;

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Multiple modals</h2>
      <p>
        Stapel organizes open modals in a stack, displaying only the topmost
        modal. This means that you can open a modal from another modal.
      </p>
      <p>
        <strong>Fun fact:</strong> {funFact}
      </p>
      <div className="flex gap-2 w-full">
        <Button onClick={() => modal.closeAll()}>Close all</Button>
        <Button
          onClick={() => modal.open(() => <MultipleModalsModal />)}
          primary
        >
          Open another modal
        </Button>
      </div>
    </div>
  );
}

export default MultipleModalsModal;
