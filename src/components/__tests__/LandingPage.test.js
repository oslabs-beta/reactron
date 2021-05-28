import {render, cleanup, screen, fireEvent} from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import React from 'react';
import LandingPage from '../LandingPage';

afterEach(() => {
  cleanup();
});

test('test', () => {
  expect(true).toBe(true);
});

test('should render LandingPage', () => {
  render(<LandingPage />);
  const landing = screen.getByTestId('LandingPage');
  expect(landing).toBeInTheDocument();
  expect(landing).toContainHTML('div');
  expect(landing).toContainHTML('p');
  expect(landing).toContainHTML('h1');
  expect(landing).toContainHTML('button');
  expect(landing).toHaveTextContent('Reactron');
  expect(landing).toHaveTextContent('Static Directory');
  expect(landing).toHaveTextContent('Component Directory');
});


// if snapshot test fails, press u in the test terminal to update snapshot
xtest('should match LandingPage snapshot', () => {
  const snap = renderer.create(<LandingPage />).toJSON();
  expect(snap).toMatchSnapshot();
});
