var { queue } = require("./queue");

async function scrape({ url }) {
  const job = await queue.add('links', { url });
  await job.finished();
  console.log("job finished...")
}

module.exports = {
  scrape,
};
