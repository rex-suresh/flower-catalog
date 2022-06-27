const EOL = '\r\n';
class Response {
  #socket; #statusCode; #headers;
  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#headers = {};
  }

  set statusCode(code) {
    this.#statusCode = code;
  }
  
  addHeader(key, value) {
    this.#headers[key] = value;
  }

  #writeHeaders() {
    for (const header in this.#headers) {
      const value = this.#headers[header];
      this.#socket.write(`${header}:${value}${EOL}`);
    }
  }

  send(body) {
    const responseLine = `HTTP/2 ${this.#statusCode}${EOL}`;
    this.#socket.write(responseLine);
    this.#writeHeaders();
    this.#socket.write(EOL); 
    this.#socket.write(body);
    this.#socket.end();
  }
}

module.exports = { Response };
