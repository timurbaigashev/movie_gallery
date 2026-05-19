// src/hooks/__tests__/useForm.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from '../useForm';

describe('Задача 9: Тестирование гибридной формы (Controlled + Uncontrolled)', () => {

    test('управляет controlled полями через useState', () => {
        const TestComponent = () => {
            const { values, handleChange } = useForm({ name: '', email: '' });

            return (
                <form>
                    <input
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        data-testid="name-input"
                    />
                    <input
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        data-testid="email-input"
                    />
                </form>
            );
        };

        render(<TestComponent />);

        const nameInput = screen.getByTestId('name-input');
        fireEvent.change(nameInput, { target: { value: 'Timur' } });

        expect(nameInput.value).toBe('Timur');
    });

    test('собирает данные из uncontrolled полей через ref', () => {
        const onSubmitMock = jest.fn();

        const TestComponent = () => {
            const { handleSubmit, formRef } = useForm({});

            return (
                <form ref={formRef} onSubmit={handleSubmit(onSubmitMock)}>
                    <input name="username" defaultValue="testuser" data-testid="username" />
                    <input name="comment" defaultValue="Отличный фильм!" data-testid="comment" />
                    <button type="submit">Отправить</button>
                </form>
            );
        };

        render(<TestComponent />);

        fireEvent.click(screen.getByText('Отправить'));

        expect(onSubmitMock).toHaveBeenCalledWith(
            expect.objectContaining({
                username: "testuser",
                comment: "Отличный фильм!"
            })
        );
    });

    test('гибридная форма: controlled + uncontrolled поля вместе', () => {
        const onSubmitMock = jest.fn();

        const TestComponent = () => {
            const { values, handleChange, handleSubmit, formRef } = useForm({ name: "Timur" });

            return (
                <form ref={formRef} onSubmit={handleSubmit(onSubmitMock)}>
                    {/* Controlled поле */}
                    <input
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        data-testid="controlled-name"
                    />
                    {/* Uncontrolled поле */}
                    <input name="rating" defaultValue="9" data-testid="uncontrolled-rating" />
                    <button type="submit">Submit</button>
                </form>
            );
        };

        render(<TestComponent />);

        fireEvent.click(screen.getByText('Submit'));

        expect(onSubmitMock).toHaveBeenCalledWith({
            name: "Timur",
            rating: "9"
        });
    });

    test('resetForm сбрасывает и controlled, и uncontrolled поля', () => {
        const TestComponent = () => {
            const { values, handleChange, resetForm, formRef } = useForm({ name: 'Initial Name' });

            return (
                <form ref={formRef} data-testid="test-form">
                    {/* Controlled */}
                    <input
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        data-testid="controlled-name"
                    />
                    {/* Uncontrolled */}
                    <input
                        name="note"
                        defaultValue="Old note"
                        data-testid="uncontrolled-note"
                    />
                    <button type="button" onClick={resetForm} data-testid="reset-btn">
                        Reset
                    </button>
                </form>
            );
        };

        render(<TestComponent />);

        const resetBtn = screen.getByTestId('reset-btn');
        fireEvent.click(resetBtn);

        // Проверяем controlled поле
        expect(screen.getByTestId('controlled-name').value).toBe('Initial Name');

        // Проверяем uncontrolled поле (после reset должно вернуться к defaultValue)
        expect(screen.getByTestId('uncontrolled-note').value).toBe('Old note');
    });
});