export default {
  name: 'App',
  parent: null,
  children: [
    {
      name: 'Header',
      parent: 'App',
      children: [],
      color: 'blue',
      pathProps: { className: 'blue' },
      textProps: { x: -25, y: 25 },
    },
    {
      name: 'Nav',
      parent: 'App',
      children: [
        {
          name: 'BrowserRouter',
          parent: 'Nav',
          children: [
            {
              name: 'Router',
              parent: 'BrowserRouter',
              children: [
                {
                  name: 'Switch',
                  parent: 'Router',
                  children: [
                    {
                      name: 'Route',
                      parent: 'Switch',
                      children: [
                        {
                          name: 'Home',
                          parent: 'Route',
                          children: [],
                          color: 'blue',
                          pathProps: { className: 'blue' },
                          textProps: { x: -25, y: 25 },
                        },
                      ],
                      color: 'blue',
                      pathProps: { className: 'blue' },
                      textProps: { x: -25, y: 25 },
                    },
                  ],
                  color: 'blue',
                  pathProps: { className: 'blue' },
                  textProps: { x: -25, y: 25 },
                },
              ],
              color: 'blue',
              pathProps: { className: 'blue' },
              textProps: { x: -25, y: 25 },
            },
          ],
          color: 'blue',
          pathProps: { className: 'blue' },
          textProps: { x: -25, y: 25 },
        },
      ],
      color: 'blue',
      pathProps: { className: 'blue' },
      textProps: { x: -25, y: 25 },
    },
  ],
  color: 'blue',
  pathProps: { className: 'blue' },
  textProps: { x: -25, y: 25 },
};
