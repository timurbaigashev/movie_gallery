import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "../useFetch";

test("fetch works", async () => {
    const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => ({ Search: [{ Title: "Batman" }] })
    });

    const { result } = renderHook(() => useFetch("test-url"));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data.Search[0].Title).toBe("Batman");

    mockFetch.mockRestore();
});