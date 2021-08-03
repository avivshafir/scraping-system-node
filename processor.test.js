const processTask = require('./processor');
const {queue} = require('./queue');
const {parse} = require('./parse');

jest.mock("./queue");
jest.mock("./parse");

const links = ["http://test1.com", "http://test2.com", "http://test3.com"];

describe("processor", function () {
    it("parses links and html from and add queue tasks for each sub link", async function () {
        parse.mockImplementation(() => ({links}));

        const job = {
            data: {url: "http://test.com"}
        }

        await processTask(job);

        expect(queue.addBulk).toHaveBeenCalledWith(links.map(link => ({name: "links", data: {url: link}})))
    });

});
