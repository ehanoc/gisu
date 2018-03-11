# gisu

Install dependencies and run the app with npm

```
npm install
npm start
```

## Dependencies

Babel is mainly used to enable last ECMAScript features without
waiting for the browsers to support them. You can totally remove
Babel dependencies except from `babel-plugin-react-css-modules`
which is a dependency to load scss files as a dictionary of
(class name => compiled class name). You can use this dependency without babel, check [react-css-modules](https://github.com/gajus/react-css-modules) repository.

D3.js is used to build the graph. It's widely used to generate
data visualizations. You can visit their [official site](https://d3js.org/) to get more information.

[Material UI](https://material-ui-next.com) is a library of components for React that implements
Google's Material Design. You can create a [custom theme](https://material-ui-next.com/customization/themes/) to style
it.

Then there is Webpack, React, only for Frontend stuff. And
Express to implement the backend. Webpack dev server and nodemon
are utilities to improve development experience.

`whatwg-fetch` is a polyfill for `fetch` API.

Those are the main dependencies. Everything else can be replaced
or are not crucial for the project.
