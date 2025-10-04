import { use } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import { FavoriteHeroContext, FavoriteHeroProvider } from './FavoriteHeroContext';
import type { Hero } from '../interfaces/hero.interface';


const mockHero = {
    id: '1',
    name: 'superman'
} as Hero;

const TestComponent = () => {

    const { favoriteCount, favorites, isFavorite, toggleFavorite } = use(FavoriteHeroContext);

    return (
        <div>
            <div data-testid="favorite-count">{favoriteCount}</div>

            <div data-testid="favorite-list">
                {
                    favorites.map((hero) => (
                        <div key={hero.id} data-testid={`hero-${hero.id}`}>
                            {hero.name}
                        </div>
                    ))
                }
            </div>

            <button data-testid="toggle-favorite"
                onClick={() => toggleFavorite(mockHero as Hero)}
            >
                Toggle Favorite
            </button>

            <div data-testid='is-favorite'>{isFavorite(mockHero).toString()}</div>

        </div>
    )
}

const renderContextTest = () => {
    return render(
        <FavoriteHeroProvider>
            <TestComponent />
        </FavoriteHeroProvider>
    )
}


describe('FavoriteHeroContext', () => {

    // clean localStorage before a test
    beforeEach(() => {
        localStorage.clear();
    });


    test('should initialize with default values', () => {
        renderContextTest();

        // screen.debug();

        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('favorite-list').children.length).toBe(0);
        expect(screen.getByTestId('is-favorite').textContent).toBe('false')
    });


    test('should add hero to favorites (and localStorage) when toggleFavorite is called with new Hero', () => {
        renderContextTest();

        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);
        // screen.debug();


        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('favorite-list').children.length).toBe(1);
        expect(screen.getByTestId('hero-1').textContent).toBe('superman');
        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        // console.log(localStorage.getItem('favorites'));
        expect(localStorage.getItem('favorites')).toBe('[{"id":"1","name":"superman"}]');
    });


    test('should remove hero from favorites when toggleFavorite is called two times', () => {
        localStorage.setItem('favorites', JSON.stringify([mockHero]));

        // console.log(localStorage.getItem('favorites'));
        renderContextTest();
        // screen.debug();


        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('is-favorite').textContent).toBeTruthy();
        expect(screen.getByTestId('hero-1').textContent).toBe('superman');


        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);
        // screen.debug();

        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('is-favorite').textContent).toBe('false');
        expect(screen.queryByTestId('hero-1')).toBeNull();
    });


});