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
    this.#comments = JSON.parse(this.#readFile(this.#commentsFile));
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

  get comments() {
    return this.#comments;
  }
}

module.exports = { GuestBook };
