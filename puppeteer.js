const puppeteer = require('puppeteer');


module.exports = async function getRoot (url){
  let contents = ''
  console.log('hi from puppeteer')
  const browser = await puppeteer.launch()
  const page = await browser.newPage();
  await page.goto(url);
  // return console.log(await page.content())
  contents = await page.content()
  // console.log(contents)
  const body = await page.evaluate(async () => {
    const domElements = document.querySelector('div').innerText;
    // for (let elem of domElements){
    //   console.log('this is an element', elem)
    // }
    // console.log(typeof domElements)
    return domElements
})
//   //   const hi = 'hi'
  //   return thing
  // })
  // return body
  return body
  // const reactEntry = await openedPage.evaluate((contents) => {
  //   let body = contents.getElementById('body')
  //   return body
    // const _entry = () => {
    //   const DOMElements = document.querySelector('body').children;
    //   for (let node of DOMElements) {
    //     if (node._reactRootContainer) {
    //       return node._reactRootContainer._internalRoot.current; 
    //     }
    //   }
    // }
  // });
  // return _entry
  // await browser.close();
};
