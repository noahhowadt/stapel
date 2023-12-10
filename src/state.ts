import { InternalModal, ModalId, ModalOptions } from "./types";

let modalsCounter = 1;
type Subscriber = (modal: Array<InternalModal>) => void;

class Observer {
  private subscribers: Array<Subscriber>;
  private stack: ModalStack;

  constructor() {
    this.subscribers = [];
    this.stack = new ModalStack();
  }

  subscribe = (subscriber: Subscriber) => {
    this.subscribers.push(subscriber);
    return () => this.unsubscribe(subscriber);
  };

  private unsubscribe = (subscriber: Subscriber) => {
    const index = this.subscribers.indexOf(subscriber);
    if (index !== -1) {
      this.subscribers.splice(index, 1);
    }
  };

  notify = () => {
    this.subscribers.forEach((subscriber) =>
      subscriber(this.stack.getCurrent())
    );
  };

  open = (
    render: (id: ModalId) => React.ReactNode,
    modal: ModalOptions = {}
  ) => {
    this.stack.push({ ...modal, id: modal.id || modalsCounter++, render });
    this.notify();
  };

  close = (id?: ModalId) => {
    if (id) {
      this.stack.remove(id);
    } else {
      this.stack.pop();
    }

    this.notify();
  };

  closeAll = () => {
    this.stack.clear();
    this.notify();
  };

  getStack = () => {
    return this.stack.getCurrent().map((modal) => modal.id);
  };
}

class ModalStack {
  private stack: Array<InternalModal> = [];

  push(modal: InternalModal) {
    if (this.stack.some((m) => m.id === modal.id))
      console.warn(`Modal with id ${modal.id} already exists`);
    this.stack.unshift(modal);
  }

  pop() {
    this.stack.shift();
  }

  remove(id: ModalId) {
    this.stack = this.stack.filter((modal) => modal.id !== id);
  }

  getCurrent() {
    return [...this.stack];
  }

  clear() {
    this.stack = [];
  }
}

export const ModalState = new Observer();
export const modal = {
  close: ModalState.close,
  closeAll: ModalState.closeAll,
  open: ModalState.open,
  getStack: ModalState.getStack,
};
