const Queue = require('bull');
const path = require('path');
const queue = new Queue('scraper-queue', 'redis://127.0.0.1:6379/2');

queue.on('error', function (error) {
    console.log("error")
})

queue.on('waiting', function (jobId) {
    console.log("waiting", jobId)
});

queue.on('completed', function (job) {
    console.log("completed")
})

queue.on('stalled', function (job) {
    console.log("stalled", job.id)
})

queue.on('paused', function (job) {
    console.log("paused", job.id)
})

queue.on('failed', function (job, err) {
    console.log("failed")
})

queue.process('links', 5, path.resolve(__dirname, './processor.js'));

module.exports = {
    queue
}

