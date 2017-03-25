export default class Time {
  constructor (
    public hours: number,
    public minutes: number,
    public seconds: number) {
  }

  public toString() {
    return `${this.hours}:${this.minutes}:${this.seconds}`;
  }
}
