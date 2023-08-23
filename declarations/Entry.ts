class Entry {
  readonly timestamp: Date;
  text: string;
  tags: string[];

  constructor(text: string, tags: string[], timestamp = new Date()) {
    this.timestamp = timestamp;
    this.text = text;
    this.tags = tags;
  }

  // You can add methods here to handle any additional logic related to entries.
}

export default Entry;
