import Button from "@/components/Button";
import { modal } from "stapel";

function AcknowledgeModal() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Tailor to your needs</h2>
      <p>
        If the default styles and animations aren't a perfect match for your
        application, tweaking them is a breeze. You can effortlessly customize
        the appearance, or if you prefer, swap out the entire modal window with
        your own component.
      </p>
      <Button onClick={() => modal.close()} primary>
        Great!
      </Button>
    </div>
  );
}

export default AcknowledgeModal;
