import { render, screen, fireEvent } from "@testing-library/react";
import CommentForm from "../index";

describe("CommentForm", () => {
    test("calls onAddComment with valid data", () => {
        const mockAddComment = jest.fn();
        render(<CommentForm onAddComment={mockAddComment} />);

        // 1. Fill the form with VALID data (passing validation)
        fireEvent.change(screen.getByPlaceholderText(/ваше имя/i), {
            target: { name: "name", value: "Timur" }
        });
        fireEvent.change(screen.getByPlaceholderText(/название фильма/i), {
            target: { name: "movie", value: "Inception" }
        });
        fireEvent.change(screen.getByPlaceholderText(/ваш комментарий/i), {
            target: { name: "comment", value: "This is a long enough comment for validation" }
        });

        // 2. Click submit
        fireEvent.click(screen.getByText(/отправить комментарий/i));

        // 3. Success!
        expect(mockAddComment).toHaveBeenCalled();
    });
});