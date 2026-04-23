import { render, screen } from '@testing-library/react';
import Copyright from '@/components/copyright';

describe('Copyright', () => {
  it('renders copyright text', () => {
    render(<Copyright />);
    expect(screen.getByText('© Ihor T.')).toBeInTheDocument();
  });
});
