import { render, screen } from "@testing-library/react";
import MovieCard from "../index";

test("renders movie card", () => {
    const movie = {
        Title: "Inception",
        Year: "2010"
    };

    render(<MovieCard movie={movie} />);

    // проверяем кнопку (она точно есть)
    expect(screen.getByText(/оставить комментарий/i)).toBeInTheDocument();
});