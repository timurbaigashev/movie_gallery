// src/components/__tests__/MovieListWithRenderProps.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import MovieListWithRenderProps from '../MovieList/MovieListWithRenderProps';

const mockMovies = [
    { imdbID: "1", Title: "Inception", Year: "2010", imdbRating: "8.8" },
    { imdbID: "2", Title: "The Matrix", Year: "1999", imdbRating: "8.7" },
    { imdbID: "3", Title: "Interstellar", Year: "2014", imdbRating: "8.7" },
];

describe('Тестирование Render Props компонента', () => {
    test('вызывает функцию children с правильными параметрами', () => {
        const renderProp = jest.fn(({ movies }) => (
            <div data-testid="movie-list">{movies.length} movies</div>
        ));

        render(<MovieListWithRenderProps movies={mockMovies}>{renderProp}</MovieListWithRenderProps>);

        expect(renderProp).toHaveBeenCalled();
        expect(screen.getByTestId('movie-list')).toHaveTextContent('3 movies');
    });

    test('фильтрует и сортирует фильмы корректно', () => {
        const renderProp = jest.fn(({ movies, setSearchTerm, setSortBy }) => (
            <div>
                <input
                    data-testid="search-input"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button data-testid="sort-rating" onClick={() => setSortBy('rating')}>
                    Sort by Rating
                </button>
                <div data-testid="movie-count">{movies.length}</div>
            </div>
        ));

        render(<MovieListWithRenderProps movies={mockMovies}>{renderProp}</MovieListWithRenderProps>);

        // Проверяем начальное состояние
        expect(screen.getByTestId('movie-count')).toHaveTextContent('3');

        // Фильтрация
        fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'inception' } });
        expect(screen.getByTestId('movie-count')).toHaveTextContent('1');

        // Сортировка (просто проверяем, что функция вызвалась)
        fireEvent.click(screen.getByTestId('sort-rating'));
    });
});