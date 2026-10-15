import { render, screen } from '@testing-library/react';
import { Copyright } from '@/shared/ui';

describe('Copyright', () => {
  it('renders copyright text', () => {
    render(<Copyright />);
    expect(screen.getByText(/© \d{4} IHOR T\./)).toBeInTheDocument();
  });
});
