// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();pm 
//   await page.goto("http://localhost:3000/")
  

//   const result = await page.evaluateHandle(() => {
//     let body = document.getElementById('root').children
//     for (let el of body){
//       if (el._reactContainer){
//         return el._reactContainer._internalRoot.current
//       }
//     }
//     return body
//   })
//   console.log(result)
//   await browser.close()
// })();

name: 'Blue',
		pathProps: {className: 'blue'},
		textProps: {x: -25, y: 25},
		color: 'blue',
		children: [{
			name: 'Aquamarine',
			textProps: {x: -25, y: 25},
			color: 'aquamarine',
			children: []
		}