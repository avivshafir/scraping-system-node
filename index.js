const express = require("express");
const faker = require("faker");
const { scrape } = require("./scrape");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/parse", async (req, res) => {
  const { url } = req.body;
  //validate input url

  //dispatch and forget (background processing)
  await scrape({ url });

  res.json({ status: "OK" });
});

if(!module.parent) {
  app.listen(port, () => {
    console.log(`Scraping System listening at http://localhost:${port}`);
  })
}

module.exports = {
  app,
};
