// src/pages/__tests__/MoviesPage.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import MoviesPage from '../MoviesPage';

// Мокаем MovieSection
jest.mock('../../sections/MovieSection', () => {
    return function MockMoviesSection() {
        return (
            <div data-testid="movie-section">
                <div data-testid="movie-card" data-title="Inception">Inception</div>
                <div data-testid="movie-card" data-title="The Matrix">The Matrix</div>

                <button data-testid="comment-btn">
                    💬 Leave a comment
                </button>

                <button data-testid="load-more-btn">
                    Load more
                </button>
            </div>
        );
    };
});

// Мокаем CommentModal
jest.mock('../../components/CommentModal', () => () => (
    <div data-testid="comment-modal">Comment Modal</div>
));

describe('Интеграционные тесты страницы Movies', () => {

    const renderPage = () => render(
        <AuthProvider>
            <BrowserRouter>
                <MoviesPage />
            </BrowserRouter>
        </AuthProvider>
    );

    test('отображает заголовок страницы и список фильмов', () => {
        renderPage();

        // Используем более точный селектор, чтобы избежать дублирования "Movies"
        expect(screen.getByText('Movies', { selector: 'h1.title' })).toBeInTheDocument();
        expect(screen.getByText(/Your curated results live here/i)).toBeInTheDocument();

        expect(screen.getAllByTestId('movie-card')).toHaveLength(2);
    });

    test('кнопка "Оставить комментарий" существует и кликабельна', () => {
        renderPage();

        const commentBtn = screen.getByTestId('comment-btn');
        expect(commentBtn).toBeInTheDocument();
        expect(commentBtn).not.toBeDisabled();

        fireEvent.click(commentBtn);
    });

    test('кнопка Load more присутствует и кликабельна', () => {
        renderPage();

        const loadMoreBtn = screen.getByTestId('load-more-btn');
        expect(loadMoreBtn).toBeInTheDocument();
        expect(loadMoreBtn).not.toBeDisabled();

        fireEvent.click(loadMoreBtn);
    });
});