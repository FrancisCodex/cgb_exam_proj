import { render, screen } from '@testing-library/react';
import App from './App';

test('renders table headers', () => {
  render(<App />);

  expect(screen.getByRole('columnheader', { name: /Name/i })).toBeInTheDocument();
  expect(screen.getByRole('columnheader', { name: /Contact/i })).toBeInTheDocument();
  expect(screen.getByRole('columnheader', { name: /Address/i })).toBeInTheDocument();
  expect(screen.getByRole('columnheader', { name: /Actions/i })).toBeInTheDocument();
});
