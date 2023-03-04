class EventEmitter {
  constructor(){
    // Instantiates initial registered events
    this.events = {}
  }

  _getEventListByName(eventName){
    /* 
     * Get event set with given event name
     */
    // Checks if event is undefined
    if (typeof this.events[eventName] === 'undefined'){
      // Creates a new set for the event
      this.events[eventName] = new Set();
    }
    return this.events[eventName];
  }

  on(eventName, fn){
    /* 
     * Registers new event with corresponding callback
     */
    this._getEventListByName(eventName).add(fn)
  }

  once(eventName, fn){
    /* 
     * Registers a new event that will be triggered
     * only once
     */
    const self = this;
    // Creates a function that it will self remove
    // on first trigger
    const onceFn = (...args) => {
      // Calls listener remover
      self.removeListener(eventName, onceFn);
      // Execute function
      fn.apply(self, args);
    };
    this.on(eventName, onceFn);
  }

  emit(eventName, ...args){
    /*
     * Triggers functions from event
     */
    this._getEventListByName(eventName).forEach(
      function (fn){
        fn.apply(this, args);
      }.bind(this)
    )
  }

  removeListener(eventName, fn){
    // Removes function from set
    this._getEventListByName(eventName).delete(fn);
  }
}

export default EventEmitter;