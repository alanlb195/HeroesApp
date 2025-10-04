import { describe, expect, test } from 'vitest';
import { SearchControls } from './SearchControls';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';


if (typeof window.ResizeObserver === 'undefined') {
    class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    }
    window.ResizeObserver = ResizeObserver;
}


const renderWithRouter = (initialEntries: string[] = ['/']) => {

    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <SearchControls />
        </MemoryRouter>
    )
}

describe('SearchControls', () => {
    test('should render SearchControls with default values', () => {
        const { container } = renderWithRouter();
        expect(container).toMatchSnapshot();
        // screen.debug();
    });

    test('should set input value when search param name is set', () => {
        renderWithRouter(['/?name=Batman']);

        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');

        // screen.debug(input);
        expect(input.getAttribute('value')).toBe('Batman');
    });

    test('should change params when input change and enter is pressed', async () => {

        renderWithRouter(['/?name=Superman']);

        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');

        expect(input.getAttribute('value')).toBe('Superman'); // first time it have to be superman

        // changing url to Batman
        fireEvent.change(input, { target: { value: 'Batman' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        // screen.debug(input);

        expect(input.getAttribute('value')).toBe('Batman'); // it have to be Batman

    });


    test('should change param strength when slider is changed', async () => {

        renderWithRouter(['/?name=Superman&active-accordion=advanced-filters']);

        const slider = screen.getByRole('slider');

        expect(slider.getAttribute('aria-valuenow')).toBe('0'); // slider default value
        // screen.debug(slider);

        fireEvent.keyDown(slider, { key: 'ArrowRight' });
        // screen.debug(slider);

        expect(slider.getAttribute('aria-valuenow')).toBe('1')
    });

    test('should accordion be opened when active-accordion is set', async () => {

        renderWithRouter(['/?name=Superman&active-accordion=advanced-filters']);

        const accordion = screen.getByTestId('accordion');

        const accordionItem = accordion.querySelector('div');


        expect(accordionItem?.getAttribute('data-state')).toBe('open')
        // screen.debug(accordion);
    });


    test('should accordion be closed when active-accordion param is not set', async () => {

        renderWithRouter(['/?name=Superman']);

        const accordion = screen.getByTestId('accordion');

        const accordionItem = accordion.querySelector('div');


        expect(accordionItem?.getAttribute('data-state')).toBe('closed');
        // screen.debug(accordion);
    });


});
