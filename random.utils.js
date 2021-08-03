const faker = require("faker");

function pickRandomItems({ items }) {
  const n = Math.floor(Math.random() * items.length);
  return items.sort(() => 0.5 - Math.random()).slice(0, n + 1);
}

function generateRandomHtml() {
  return `
        <html>
            <body>
                ${faker.lorem.paragraph()}
            </body>
        </html>
    `;
}

function generateRandomLinks(n) {
  return [...new Array(n)].map(() => faker.internet.url());
}

module.exports = {
  pickRandomItems,
  generateRandomHtml,
  generateRandomLinks,
};
