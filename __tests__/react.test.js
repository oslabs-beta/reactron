import { render, fireEvent } from '@testing-library/react';
import { build, fake } from 'test-data-bot';
import '@testing-library/jest-dom/extend-expect'

const mock = build('').fields({})();
describe('App Component', () => {
  it('return MainContainer', () => {
    const {} = render(<MainContainer />);
    expect(
      ()).toBeValid();
  })
});
