# Scraper System

![image](https://user-images.githubusercontent.com/6135443/128094085-e92ba30a-0d1e-4e6e-94f3-c4b740b55c25.png)


A node app that triggers a scraping process for a provided url

The scraper is triggered by a POST call to the `/scrape` endpoint

the scraper then uses a library called "bull" to create a background task queue based processing flow.
https://github.com/OptimalBits/bull

more than 10 mocked urls are being created, for each process call we re-generate the 10 mocked urls

_Regarding scalability_:  
The scraper can be deployed and run in parallel in different node procesess. If a url was encountered twice the scraper will not continue and try to parse the same link twice.
Also the scraper optimizes the scraping process by supporting multiple page fetches in parallel.

I choose redis mainly because it's easy to use for key value storage, easy integration and my own familiarty.
It also has some concurrency capabitlies out of the box, such as atomic GET & SET and more.

## Getting Started

### Run Redis

```
 docker-compose -f ./docker-compose.yml up -d
```

### Run App

```
 npm install
 npm start
```

### Trigger http call

```
curl --request POST --data '{"url":"http://google.com"}' -H "Content-Type: application/json" http://localhost:3000/parse
```

### View redis keys
```
    > redis-cli
    > KEYS *
```

### Run Tests

```
npm test
```

### Known limitations

- Should allow configuration of concurrency by env variable

- The scraper has no stop condition and potentially can run forever, we can add a depth limit to overcome this and stop processing after reaching a certain level of recursive calls

- Missing tests for different conditions

- Data is not updated between runs

- Redis as an in-memory key-value DB might not be enough to hold huge amount of data and we might need to consider alternatives

- Fetching/Parsing page timeout or error -> need to handle

### Future improvements

- Add e2e and integration tests for the whole flow, testing the redis results

- Allow updating of data between runs, currently each url is saved once and not updated (at least while redis is running)
