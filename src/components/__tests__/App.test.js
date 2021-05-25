import {render, cleanup, screen} from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import HeadNode from '../HeadNode';
import MainContainer from '../MainContainer';
import '@testing-library/jest-dom';
import App from '../App';

afterEach(() => {
  cleanup();
});

test('test', () => {
  expect(true).toBe(true);
});

test('should render LandingPage', () => {
  render(<MainContainer />);
  const landing = screen.getByTestId('LandingPage');
  expect(landing).toBeInTheDocument();
  expect(landing).toContainHTML('div');
  expect(landing).toContainHTML('p');
  expect(landing).toContainHTML('h1');
  expect(landing).toContainHTML('button');
  expect(landing).toHaveTextContent('Static Directory')
  expect(landing).toHaveTextContent('Component Directory')
});
