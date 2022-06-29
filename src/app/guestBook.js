class GuestBook {
  #template;
  #comments;
  #commentsFile;
  #readFile;
  #writeFile;
  #page;
  
  constructor(template, commentsFile, readFile, writeFile) {
    this.#template = template;
    this.#commentsFile = commentsFile;
    this.#readFile = readFile;
    this.#writeFile = writeFile;
    this.#comments = [];
    this.#page = '';
  }

  load() {
    this.#comments = JSON.parse(this.#readFile(this.#commentsFile, 'utf8'));
    this.#page = this.#readFile(this.#template, 'utf8');
  }

  save() {
    this.#writeFile(this.#commentsFile, JSON.stringify(this.#comments, ' ', 2));
  }

  addComment({name, message}) {
    const date = new Date();
    const dateRaw = this.#dateString(date);
    const rawTime = this.#timeString(date)
    
    const comment = { name, message, date: dateRaw, time: rawTime };
    this.#comments.unshift(comment);
  }

  get comments() {
    return this.#comments;
  }

  get pageRaw() {
    return this.#page;
  }

  #timeString(date) {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  #dateString(date) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  #toHtml(tag, content) {
    return `<${tag}>${content}</${tag}>`;
  }

  #getRowString({ name, message, date, time }) {
    const nameString = this.#toHtml('td', name);
    const messageString = this.#toHtml('td', message);
    const dateString = this.#toHtml('td', date);
    const timeString = this.#toHtml('td', time);

    const rowContent = [dateString, timeString, nameString, messageString]
      .join('');
    return this.#toHtml('tr', rowContent);
  }

  toString() {
    return this.#comments.map(comment => this.#getRowString(comment)).join('');
  }
}

module.exports = { GuestBook };
