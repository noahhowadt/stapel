import { Modal, ModalOptionsBase, WarnModalOptions } from "./types";

let modalsCounter = 1;

class Observer {
  subscribers: Array<(modal: Modal | null) => void>;
  stack: ModalStack;

  constructor() {
    this.subscribers = [];
    this.stack = new ModalStack();
  }

  subscribe = (subscriber: (modal: Modal | null) => void) => {
    this.subscribers.push(subscriber);
    return () => this.unsubscribe(subscriber);
  }

  private unsubscribe = (subscriber: (modal: Modal | null) => void) => {
    const index = this.subscribers.indexOf(subscriber);
    if(index !== -1) {
      this.subscribers.splice(index, 1);
    }
  }

  notify = () => {
    this.subscribers.forEach(subscriber => subscriber(this.stack.getCurrent()));
  }

  default = (options: ModalOptionsBase) => {
    const id = options.id || modalsCounter++;
    const modal: Modal = {
      ...options,
      type: "default",
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

  close = () => {
    this.stack.pop();
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
    this.stack.unshift(modal);
  }

  pop() {
    this.stack.shift();
  }

  getCurrent() {
    if(this.stack.length > 0) return this.stack[0]
    return null;
  }

  clear() {
    this.stack = [];
  }
}

export const ModalState = new Observer();

const modalFunction = (options: ModalOptionsBase) => ModalState.default(options);
const basicModal = modalFunction

export const modal = Object.assign(basicModal, {
  close: ModalState.close,
  closeAll: ModalState.closeAll,
  warn: ModalState.warn
})