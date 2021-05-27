Current React component architecture

- App
  - MainContainer
    - LandingPage (if file not imported)
    - RenderedPage (if file imported)
      - Header
        - If Full App View:
          - ComponentTree
          - Visualizer
            - StateContainer
              - StateItem
            - RenderedContainer
              - ReactComponent
        - If Indv Component View:
          - FileList
            - File
          - IndividualComponent
