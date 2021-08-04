const faker = require("faker");
const {
  pickRandomItems,
  generateRandomHtml,
  generateRandomLinks,
} = require("./random.utils");

const NUM_LINKS = 10;

const mockLinks = generateRandomLinks(NUM_LINKS);

async function parse({ url }) {
  const randomLinks = pickRandomItems({ items: mockLinks });

  const html = generateRandomHtml();

  return {
    links: randomLinks,
    html,
  };
}

module.exports = {
  parse,
};
