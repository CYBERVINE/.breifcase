import { NEWSKEY } from './keys.mjs';
import  NewsAPI  from "newsapi"
import  cheerio  from 'cheerio';
import puppeteer from 'puppeteer';

const newsapi = new NewsAPI(NEWSKEY);

let source = ""

// get data with news api

newsapi.v2.topHeadlines({
  sources: source,
  language: 'en',
}).then(response => {
  console.log(typeof(response))
});


// get HTML with puppeteer

async function getHTMLFromURL(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const html = await page.content();
    console.log("PUPPETEER DONE")
    return html;
  } catch (error) {
    console.error('Error fetching URL:', error);
    return null;
  } finally {
    await browser.close();
  }



}


// Parse HTML with cheerio

async function parseHtml(url) {
  const html = await getHTMLFromURL(url);
  let article
  if (html) {
    const $ = cheerio.load(html)
    $('p').each((index, element) => {
      article += $(element).text()  
    });
    
    if (article.length > 2 ){
      console.log("CHEERIO DONE", article)
      return article
      
      ////////////// LLM API GOES HERE
      `summarize this ${article}`
    } 
    
  } else {
    console.log('Failed to fetch HTML content.');
  }
}


