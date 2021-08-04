const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient();

const saveAsync = promisify(client.setnx).bind(client);
const existsAsync = promisify(client.exists).bind(client);

//When key already holds a value, no operation is performed. SETNX is short for "SET if Not eXists".
async function save({ url, html }) {
  return saveAsync(url, html);
}

//check if a key exists
async function exists({ url }) {
  const res = await existsAsync(url);
  return res === 1;
}

module.exports = {
  save,
  exists,
};
