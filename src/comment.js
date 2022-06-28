class Comments {
  #comments;
  constructor(comments) {
    this.#comments = comments
  }

  addComment(name, message) {
    const date = new Date();
    const dateRaw =
      `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`;
    const rawTime =
      `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    
    const comment = { name, message, date: dateRaw, time: rawTime };
    this.#comments.unshift(comment);
  }

  visit(visitor) {
    visitor(this.#comments);
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
    return this.#comments.map(content => this.#getRowString(content)).join('');
  }
}

module.exports = { Comments };
