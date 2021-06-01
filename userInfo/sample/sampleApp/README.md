# Unit 6 React-Tic-Tac-Toe

## Summary
For this challenge we'll build a [tic-tac-toe](https://en.wikipedia.org/wiki/Tic-tac-toe) game. This will require some more advanced use of ReactJS and its features.

**There is a better way to create React elements.** Rather than calling `React.createElement` a bunch of times, most React developers use something called [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html). This is a *JavaScript syntax extension* that looks very similar to plain HTML. For example, without JSX we would need to do this:
```javascript
render: function() {
  const button = React.createElement('button', { className: 'btn' }, ['New ', 'Colors!']);
  return React.createElement('div', { id: 'board' }, button);
}
```
Using JSX, we can instead do this:
```javascript
render() {
  return (
    <div id="board">
      <button className="btn">New Colors!</button>
    </div>
  );
}
```
This looks like the HTML we know and love. It's much more readable and intuitive. JSX is not able to be read directly in the browser. It needs to be converted, or **compiled**, into plain JavaScript. To do this we'll use Webpack.

## Learning Goals:
- Utilize React one-way data flow by passing down props
- Update state from child components
- Use JSX and Webpack

## Getting Started:


### Webpack
![webpack](./docs/assets/images/webpack.jpeg)

[Webpack](https://webpack.js.org/) is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles. One of the main jobs we are using Webpack for is compiling all our JavaScript files into one; that way, we only load that one file into our html page. Webpack can do a lot more than this though: we're using it to take React Components, which are written in [JSX Syntax](https://facebook.github.io/jsx/) and convert it into regular JavaScript. We do this via these things called loaders.

Ultimately, these are good processes to start to understand now. However, if you are struggling with these concepts right now don't worry too much. You will have a unit on the build process where you will learn more about Webpack and other build tools later in the program.

__Warning:__
  Webpack runs in the terminal, so if it hits an error while compiling (maybe a syntax error) that error will appear in the terminal and webpack will not create the `bundle.js` file. **Keep an eye on the terminal!**

Install the necessary decencies for Webpack by typing in the following command:
````
npm install
````
After the install has finished, from the main directory, run webpack with the following command:
```
npm start
```
1. When you run the above command your browser should automatically open your app on `http://localhost:8080/`

2. Follow the steps below to build Tic-Tac-Toe in the file `src/app.jsx`.
    - __Warning:__ Make sure to not skip any steps! 🤨🤨🤨

3. Your changes to `app.jsx` will auto rebuild and reload your application.

## Challenges:

1. Build a react component called Box, render that component to the page.

2. Give Box a property (prop) that dictates what text it renders and render an 'X'.

3. Give Box some style! Make it a button with height 100px and width 100px.

4. Have Box render text based on its state.

5. Have Box's state change every 300ms, alternating between 'X' and 'O'.
    - Where should this be written?
    - This is a good moment to learn about the component cycle!
    - Make sure to clear your interval!

6. Have Box's state change based on clicks. Set initial state to '-'.
    - How do we set up an event handler for React components?
    - Make Box alternate between 'X' and 'O' on clicks.

7. Let's make a new component called Row that renders 3 Box components.

8. Pull the state out of each Box and into the higher level Row component.
    - Don't forget to pass each child Box a key property.

9. Rig up the event handling so that clicks on a Box component change the
  state on their parent Row component.

10. Now create a Board component that renders three Row components.

11. Pull the state out of the Row components and into the Board component.

12. Rig up event handling so clicks on Box's bubble up to the Board itself.


## Testing your work
There are no tests for this challenge. Determine if the app works properly by using it.

## Extension
1. Have the board check for three-in-a-row. See if you can utilize other [lifecycle methods](https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class).

2. Write some ES6. Webpack is converting all ES6 to ES5 so browser support is NOT an issue!

3.  Make your game turn-based, i.e. it'll acknowledge X's turn and O's turn. Instead of just toggling between X and O, have the first click turn the box to an X, the second click turn its box to an O, etc. This will create a more fluid UX.

4. Fetch the `unit-6-react-calendar` branch from the unit-project-slack repo and refactor your calendar using react.

## React Overview

### Stateless Functional Components
[Stateless functional components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) were introduced in  [React's 0.14 release](https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html). 
Instead of using the `React.createClass` method or ES6 classes, components are written as functions with props as the parameter. 

A stateless functional component is essentially just the render method of a React class. 
By stripping everything else away, you get a simpler way to make React components, albeit with a few limitations.

#### Pros

* No need to use this `this` keyword! You don't have to deal with state / methods, and your props are passed in as a parameter.
* Less boilerplate. As your component is simply a function, free of the constraints of a React component class, the amount of boilerplate in creating a stateless functional component is greatly reduced.
This makes it so the resulting code for you component is concise and and clear.
* Clearly separates your concerns. This is important when you're separating your application into container and presentational components.

#### Cons
* No access to component lifecycle methods (ie ComponentDidMount).

### Container vs Presentational Components

A common design pattern to follow when creating React components is to separate them into container and presentational components.
**Container** components handle the logic in an application (how things work). They handle state, fetch data, and contain the logic that determines what components are rendered.
They do not actually render any DOM markup themselves, but instead use presentational components to do so.
**Presentational** components concern themselves with how things look. They have no knowledge of state or how data is being mutated.
Instead, their only job is to take in data (in the form of props) and render DOM markup. 

For a more in depth explanation, take a look at [Dan Abramov's blog post](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) on the subject. 

## Useful Links
[Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

[React Docs](https://facebook.github.io/react/docs/component-api.html)

[ES6
Classes](https://facebook.github.io/react/docs/reusable-components.html#es6-classes)
