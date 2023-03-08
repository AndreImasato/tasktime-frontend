import EventEmitter from './EventEmitter';

class Utils {
  static EventEmitter = EventEmitter;

  static capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

export default Utils;