import {render, cleanup, screen, fireEvent} from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import React from 'react';
import ComponentTree from '../ComponentTree';

afterEach(() => {
  cleanup();
});

test('test', () => {
  expect(true).toBe(true);
});

test('should render ComponentTree', () => {
  render(<ComponentTree />);
  const componentTree = screen.getByTestId('ComponentTree');
  expect(componentTree).toBeInTheDocument();
  expect(componentTree).toContainHTML('div');
  expect(componentTree).toHaveClass('componentTree');
});

test('should render Tree', () => {
  render(<ComponentTree />);
  const tree = screen.getByTestId('Tree');
  expect(tree).toBeInTheDocument();
});

// if snapshot test fails, press u in the test terminal to update snapshot
xtest('should match ComponentTree snapshot', () => {
  const snapCT = renderer.create(<ComponentTree />).toJSON();
  expect(snapCT).toMatchSnapshot();
});
