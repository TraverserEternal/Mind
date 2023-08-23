import Entry from "./Entry";

class Day {
  readonly date: Date;
  entries: Entry[];
  constructor(entries: Entry[], date = new Date()) {
    this.date = date;
    this.entries = entries;
  }
}

export default Day;
