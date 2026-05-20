import { render, screen, fireEvent } from "@testing-library/react";
import CommentForm from '../../components/CommentForm';

describe("CommentForm", () => {
    test("calls onAddComment with valid data", () => {
        const mockAddComment = jest.fn();
        render(<CommentForm onAddComment={mockAddComment} />);

        fireEvent.change(screen.getByPlaceholderText(/your name/i), {
            target: { name: "name", value: "Timur" }
        });
        fireEvent.change(screen.getByPlaceholderText(/movie title/i), {
            target: { name: "movie", value: "Inception" }
        });
        fireEvent.change(screen.getByPlaceholderText(/your comment.../i), {
            target: { name: "comment", value: "This is a long enough comment for validation" }
        });

        fireEvent.click(screen.getByText(/leave a comment/i));

        expect(mockAddComment).toHaveBeenCalled();
    });
});