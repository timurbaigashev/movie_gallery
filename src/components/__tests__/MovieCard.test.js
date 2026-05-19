// src/components/__tests__/MovieCard.test.jsx
import { render, screen } from '@testing-library/react';
import MovieCard from '../../components/MovieCard';

const mockMovie = {
    title: "Inception",
    poster: "https://via.placeholder.com/300x450?text=Inception",
    releaseDate: "2010",
    rating: "8.8"
};

describe('Задача 8: Compound Components - MovieCard', () => {

    test('корректно рендерит все составные части карточки', () => {
        render(
            <MovieCard movie={mockMovie}>
                <MovieCard.Header />
                <MovieCard.Body />
                <MovieCard.Footer />
            </MovieCard>
        );

        expect(screen.getByText('Inception')).toBeInTheDocument();
        expect(screen.getByText('Release: 2010')).toBeInTheDocument();
        expect(screen.getByText('8.8')).toBeInTheDocument();
        expect(screen.getByText(/Оставить комментарий/i)).toBeInTheDocument();
    });

    test('дочерние компоненты выбрасывают ошибку при использовании вне MovieCard', () => {
        expect(() => render(<MovieCard.Header />)).toThrow();
        expect(() => render(<MovieCard.Body />)).toThrow();
        expect(() => render(<MovieCard.Footer />)).toThrow();
    });

    test('MovieCard правильно передаёт данные фильма через Context', () => {
        render(
            <MovieCard movie={mockMovie}>
                <MovieCard.Body />
            </MovieCard>
        );

        expect(screen.getByText('Inception')).toBeInTheDocument();
        expect(screen.getByText('Release: 2010')).toBeInTheDocument();
        expect(screen.getByText('8.8')).toBeInTheDocument();
    });
});