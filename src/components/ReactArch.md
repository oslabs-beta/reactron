Current React component architecture

- App
  - MainContainer
    - LandingPage (if file not imported)
    - RenderedPage (if file imported)
      - Header
      - ComponentTree
        - Head Node
        - Node
      - Visualizer
        - StateContainer
          - StateItem
        - RenderedContainer
          - ReactComponent
