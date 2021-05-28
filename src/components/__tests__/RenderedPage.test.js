import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import React from 'react';
import RenderedPage from '../RenderedPage';

afterEach(() => {
  cleanup();
});

test('test', () => {
  expect(true).toBe(true);
});

test('should render Rendered Page', () => {
  render(<RenderedPage />);
  const rendered = screen.getByTestId('RenderedPage');
  expect(rendered).toBeInTheDocument();
  expect(rendered).toContainHTML('div');
  expect(rendered).toContainHTML('iframe');
  expect(rendered).toContainHTML('h1');
  expect(rendered).toHaveTextContent('Reactron');
});


// if snapshot test fails, press u in the test terminal to update snapshot
xtest('should match RenderedPage snapshot', () => {
  const snapRend = renderer.create(<RenderedPage />).toJSON();
  expect(snapRend).toMatchSnapshot();
});
