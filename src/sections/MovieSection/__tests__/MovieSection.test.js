import { render, screen } from "@testing-library/react";
import { useFetch } from "../../../hooks/useFetch";
import MovieSection from "../index";

// 1. Move the mock to the top level (outside tests)
jest.mock("../../../hooks/useFetch", () => ({
    useFetch: () => ({
        data: { Search: [{ imdbID: "1", Title: "Batman" }] },
        loading: false,
        error: null
    })
}));

test("renders movie list", async () => {
    render(<MovieSection />);

    // 2. Use a regex to be safe and findBy to wait for the render
    expect(await screen.findByText(/Batman/i)).toBeInTheDocument();
});