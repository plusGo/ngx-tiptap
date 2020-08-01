export class Emitter {

  private callbacks;

  // Add an event listener for given event
  on(event, fn) {
    this.callbacks = this.callbacks || {};
    // Create namespace for this event
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(fn);
    return this;
  }

  emit(event, ...args) {
    this.callbacks = this.callbacks || {};
    const callbacks = this.callbacks[event];

    if (callbacks) {
      callbacks.forEach(callback => callback.apply(this, args));
    }

    return this;
  }

  // Remove event listener for given event.
  // If fn is not provided, all event listeners for that event will be removed.
  // If neither is provided, all event listeners will be removed.
  off(event, fn) {

    if (!arguments.length) {
      this.callbacks = {};
    } else {
      // event listeners for the given event
      const callbacks = this.callbacks ? this.callbacks[event] : null;
      if (callbacks) {
        if (fn) {
          this.callbacks[event] = callbacks.filter(cb => cb !== fn); // remove specific handler
        } else {
          delete this.callbacks[event]; // remove all handlers
        }
      }
    }

    return this;
  }
}
