import { render, screen } from '@testing-library/react';
import { TrainerPage } from '@/pages/trainer';

describe('TrainerPage', () => {
  it('renders header controls, sectors, and copyright footer', () => {
    render(<TrainerPage />);
    expect(
      screen.getByRole('heading', { name: /simple slip trainer/i })
    ).toBeInTheDocument();
    expect(screen.getAllByAltText('Fist image')).toHaveLength(4);
    expect(screen.getByText(/© \d{4} IHOR T\./)).toBeInTheDocument();
  });
});
