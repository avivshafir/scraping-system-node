var redis = require("redis-mock"),
  client = redis.createClient();

jest.mock("redis", () => jest.requireActual("redis-mock"));

beforeEach(() => {
  client.flushall();
});

afterAll(() => client.quit())
