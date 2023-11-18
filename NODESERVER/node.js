import { GPTKEY, NEWSKEY} from '../srcripts/keys';

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(NEWSKEY);
const cheerio = require('cheerio')
const puppeteer = require('puppeteer');


let source = ""



// get HTML with puppeteer

async function getHTMLFromURL(webSearch) {
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

async function fetchHTML(url) {
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


//get data with NEWSAPI


newsapi.v2.topHeadlines({
  sources: source,
  language: 'en',
}).then(response => {

  console.log(response)
  array = response.articles
  
  console.log("NEWS API DONE:")
  
  for ( i = 0 ; i < array.length ; i++){
    console.log(array[i].source.name, "---" ,array[i].title, "---"  ,array[i].url)
  }
  
 // fetchHTML(array[0].url);
});






