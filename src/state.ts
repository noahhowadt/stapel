import { AcknowledgeModalOptions, CustomModal, CustomModalOptions, Modal, ModalOptionsBase, StackerProps, WarnModalOptions } from "./types";

let modalsCounter = 1;
type Subscriber = (modal: Array<Modal>) => void;

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
  }

  private unsubscribe = (subscriber: Subscriber) => {
    const index = this.subscribers.indexOf(subscriber);
    if(index !== -1) {
      this.subscribers.splice(index, 1);
    }
  }

  notify = () => {
    this.subscribers.forEach(subscriber => subscriber(this.stack.getCurrent()));
  }

  custom = (component: React.ReactNode | ((id: string | number) => React.ReactNode), options?: CustomModalOptions & StackerProps) => {
    const id = options?.id || modalsCounter++;
    if(typeof component === "function") {
      component = component(id);
    }
    const modal: CustomModal = {
      ...options,
      type: "custom",
      id,
      component
    }
    this.stack.push(modal);
    this.notify();
    return id;
  }

  plain = (options: ModalOptionsBase) => {
    const id = options.id || modalsCounter++;
    const modal: Modal = {
      ...options,
      type: "plain",
      id
    }
    this.stack.push(modal);
    this.notify();
    return id;
  }

  acknowledge = (options: AcknowledgeModalOptions) => {
    const id = options.id || modalsCounter++;
    const modal: Modal = {
      ...options,
      type: "acknowledge",
      id
    }
    this.stack.push(modal);
    this.notify();
    return id;
  }

  warn = (options: WarnModalOptions) => {
    const id = options.id || modalsCounter++;
    const modal: Modal = {
      ...options,
      type: "warn",
      id
    }
    this.stack.push(modal);
    this.notify();
    return id;
  }

  close = (id?: string | number) => {
    if(id) {
      this.stack.getCurrent().filter(modal => modal.id === id)
    } else {
      this.stack.pop();
    } 

    this.notify();
  }

  closeAll = () => {
    this.stack.clear();
    this.notify();
  }
}

class ModalStack {
  private stack: Array<Modal> = [];

  push(modal: Modal) {
    if(this.stack.some(m => m.id === modal.id)) console.warn(`Modal with id ${modal.id} already exists`);
    this.stack.unshift(modal);
  }

  pop() {
    this.stack.shift();
  }

  getCurrent() {
    return [...this.stack];
  }

  clear() {
    this.stack = [];
  }
}

export const ModalState = new Observer();

const modalFunction = (options: ModalOptionsBase) => ModalState.plain(options);
const basicModal = modalFunction

export const modal = Object.assign(basicModal, {
  close: ModalState.close,
  closeAll: ModalState.closeAll,
  warn: ModalState.warn,
  acknowledge: ModalState.acknowledge
})