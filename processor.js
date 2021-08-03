const {exists, save} = require("./repository");
const {parse} = require("./parse");
const {queue} = require("./queue");

async function processTask(job) {
    console.log("processing task: ", job.id);
    try {
        const url = job.data.url;

        console.log("scraping url: ", url);

        if (await exists({ url })) {
            return;
        }

        const {links, html} = await parse({url});

        await save({url, html});

        console.log('creating jobs', links);

        queue.addBulk(links.map(link => ({ name: 'links', data: { url: link } })))

    } catch (error) {
        console.error("failed scraping url", {error});
    }
}

module.exports = processTask;
