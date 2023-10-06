const express = require('express');

const puppeteer = require("puppeteer");
const Sentiment = require("sentiment");

const Vader = require('vader-sentiment');
const sentiment = new Sentiment();
const port = 3000;
const app = express();



const SentimentData = async () => {
  console.log("crawl start");
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(
    "https://www.reuters.com/markets/global-market-data/"
  )
  console.log("received page");
  const text = await page.$eval("*", (el) => el.innerText)
   const result = await sentiment.analyze(text)
  // const sentimentResult = Vader.SentimentIntensityAnalyzer.polarity_scores(text);
  // console.log(sentimentResult);
   console.log(result)
  await browser.close()
}


app.get('/scrape', (req, res) => {
    SentimentData();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });