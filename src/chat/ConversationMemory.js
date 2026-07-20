class ConversationMemory {
  constructor() {
    this.messages = [];
    this.maxMessages = 30;
  }

  add(role, content) {
    this.messages.push({
      id: crypto.randomUUID(),
      role,
      content,
      timestamp: Date.now(),
    });

    if (this.messages.length > this.maxMessages) {
      this.messages.shift();
    }
  }

  history() {
    return [...this.messages];
  }

  latest(count = 10) {
    return this.messages.slice(-count);
  }

  clear() {
    this.messages = [];
  }
}

export default new ConversationMemory();