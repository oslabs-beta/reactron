import {render, cleanup, screen, fireEvent} from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import React from 'react';
import Visualizer from '../Visualizer';

afterEach(() => {
  cleanup();
});

test('test', () => {
  expect(true).toBe(true);
});

test('should render Rendered Page', () => {
  render(<Visualizer />);
  const visualizer = screen.getByTestId('Visualizer');
  expect(visualizer).toBeInTheDocument();
  expect(visualizer).toContainHTML('div');
  expect(visualizer).toContainHTML('iframe');
  expect(visualizer).toHaveClass('visualizer');
});

// if snapshot test fails, press u in the test terminal to update snapshot
xtest('should match Visualizer snapshot', () => {
  const snapVis = renderer.create(<Visualizer />).toJSON();
  expect(snapVis).toMatchSnapshot();
});
