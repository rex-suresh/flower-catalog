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

  toString() {
    return this.#comments.map(({ name, message, date, time }) => {
      const nameString = `<td>${name}</td>`;
      const messageString = `<td>${message}</td>`;
      const dateString = `<td>${date}</td>`;
      const timeString = `<td>${time}</td>`;

      return `<tr>${[dateString, timeString, nameString, messageString].join('')}</tr>`;
    }).join('');
  }
}

module.exports = { Comments };
