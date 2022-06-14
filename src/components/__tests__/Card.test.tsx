import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Card from '../card/Card';

afterEach(() => {
    cleanup();
});

test('Shoudl render the Card component', () => {
    const card = { card_name: "Nagendra Gandla", card_last_four: "9889", expiry: "09/23", colour: "#ffffff" };

    render(<Card
        card_name={card.card_name}
        card_last_four={card.card_last_four}
        expiry={card.expiry}
        colour={card.colour} />);

    const cardElement = screen.getByTestId('card-Nagendra Gandla');
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveTextContent('Nagendra Gandla');
    expect(cardElement).toHaveStyle({ background: '#ffffff' });
});

test('matches snapshots', () => {
    const card = { card_name: "Nagendra Gandla", card_last_four: "9889", expiry: "09/23", colour: "#ffffff" };
    const tree = renderer.create(<Card
        card_name={card.card_name}
        card_last_four={card.card_last_four}
        expiry={card.expiry}
        colour={card.colour} />).toJSON();

    expect(tree).toMatchSnapshot();
});