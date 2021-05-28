const puppeteer = require('puppeteer');


module.exports = async function getRoot (url){
  let contents = ''
  console.log('hi from puppeteer')
  const browser = await puppeteer.launch()
  const page = await browser.pages()
    .then(pageArr => {
      return pageArr[0];
    });
  await page.goto(url);
  
  
  
  const reactData = page.evaluate(async () => {
    const entry = (() => {
      const domEle = document.getElementById('root').children;
      console.log(domEle);

    })()
    const domElements = document.querySelector('div').innerText;
    // for (let elem of domElements){
    //   console.log('this is an element', elem)
    // }
    // console.log(typeof domElements)
    return domElements
})

};
