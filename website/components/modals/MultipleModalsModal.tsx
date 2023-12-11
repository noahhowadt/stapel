import { useEffect, useState } from "react";
import { modal } from "stapel";
import Button from "../Button";
import Input from "../Input";

function MultipleModalsModal() {
  const [value, setValue] = useState(
    "The state of the modals is preserved. Try it!"
  );

  useEffect(() => {
    console.log("MultipleModalsModal mounted");
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Effortless modal stacking</h2>
      <p>
        Stapel organizes open modals in a stack, displaying only the topmost
        modal. This means that you can open a modal from another modal.
      </p>
      <Input value={value} onChange={(v) => setValue(v)} />
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
