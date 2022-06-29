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
    
    const comment = { name, message, date: date.toLocaleString() };
    this.#comments.unshift(comment);
  }

  get pageRaw() {
    return this.#page;
  }


  #toHtml(tag, content) {
    return `<${tag}>${content}</${tag}>`;
  }

  #getRowString({ name, message, date }) {
    const nameString = this.#toHtml('td', name);
    const messageString = this.#toHtml('td', message);
    const dateString = this.#toHtml('td', date);

    const rowContent = [dateString, nameString, messageString].join('');
    return this.#toHtml('tr', rowContent);
  }

  toString() {
    return this.#comments.map(comment => this.#getRowString(comment)).join('');
  }
}

module.exports = { GuestBook };
