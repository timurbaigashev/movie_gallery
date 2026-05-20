// src/components/__tests__/ProtectedRoute.test.jsx

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

// Мок для useAuth (чтобы не зависеть от реального контекста)
jest.mock('../../context/AuthContext', () => ({
    useAuth: jest.fn(),
    AuthProvider: ({ children }) => <div>{children}</div>,
}));

const { useAuth } = require('../../context/AuthContext');

const renderWithRouter = (ui) => {
    return render(
        <BrowserRouter>
            {ui}
        </BrowserRouter>
    );
};

describe('ProtectedRoute', () => {
    test('показывает "Загрузка..." пока loading === true', () => {
        useAuth.mockReturnValue({ user: null, loading: true });

        renderWithRouter(
            <ProtectedRoute>
                <div>Protected Content</div>
            </ProtectedRoute>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('показывает сообщение об авторизации, если user === null', () => {
        useAuth.mockReturnValue({ user: null, loading: false });

        renderWithRouter(
            <ProtectedRoute>
                <div>Protected Content</div>
            </ProtectedRoute>
        );

        expect(screen.getByText('Please login or register')).toBeInTheDocument();
        expect(screen.getByText(/To view the profile you need to be logged in using Google services./i)).toBeInTheDocument();
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    test('отображает children, если пользователь авторизован', () => {
        useAuth.mockReturnValue({
            user: { name: 'Test User', email: 'test@example.com' },
            loading: false
        });

        renderWithRouter(
            <ProtectedRoute>
                <div data-testid="protected-content">Protected Content</div>
            </ProtectedRoute>
        );

        expect(screen.getByTestId('protected-content')).toBeInTheDocument();
        expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
});