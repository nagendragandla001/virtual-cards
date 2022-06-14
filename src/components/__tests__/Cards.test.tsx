import { render, screen, cleanup } from '@testing-library/react';
import Cards from '../cards/Cards';

test('should render the Cards Component', () => {
    render(<Cards />);
    const cardsElement = screen.getByTestId('cards');
    expect(cardsElement).toBeInTheDocument();
    expect(cardsElement).toHaveTextContent("Create/Activate Cards");
});

export { }