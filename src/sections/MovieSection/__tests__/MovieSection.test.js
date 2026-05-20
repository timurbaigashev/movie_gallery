import { render, screen } from "@testing-library/react";
//import { useFetch } from "../../../hooks/useFetch";
import MovieSection from "../index";

jest.mock("../../../hooks/useFetch", () => ({
    useFetch: () => ({
        data: { Search: [{ imdbID: "1", Title: "Batman" }] },
        loading: false,
        error: null
    })
}));

test("renders movie list", async () => {
    render(<MovieSection />);

    expect(await screen.findByText(/Batman/i)).toBeInTheDocument();
});