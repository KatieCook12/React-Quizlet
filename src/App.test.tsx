import { render, screen } from '@testing-library/react';
import App from './App';

test('renders quiz app', () => {
  render(<App />);
  expect(screen.getByRole('main')).toBeInTheDocument();
});
