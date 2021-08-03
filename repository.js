const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient();

const saveAsync = promisify(client.setnx).bind(client);
const existsAsync = promisify(client.exists).bind(client);

async function save({ url, html }) {
  console.log("saving...", url, html)
  return saveAsync(url, html);
}

async function exists({ url }) {
  const res = await existsAsync(url);
  return res === 1;
}

module.exports = {
  save,
  exists,
};
