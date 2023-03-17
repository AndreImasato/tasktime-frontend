import EventEmitter from './EventEmitter';

class Utils {
  static EventEmitter = EventEmitter;

  static capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static parseTimeIntervalToString(interval){
    /**
     * Method to parse an interval to string in 00:00:00 format
     *  @param {integer} interval: time interval in seconds
     *  @return {string} parsed interval in 00:00:00 string format
     */

    const hours = ~~(interval / 3600);
    const hoursRemainder = interval % 3600;
    const minutes = ~~(hoursRemainder / 60);
    const seconds = hoursRemainder % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

export default Utils;