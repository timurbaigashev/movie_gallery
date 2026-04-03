import { renderHook, act } from "@testing-library/react";
import { useForm } from "../useForm";

test("should call submit function", () => {
    const mockSubmit = jest.fn();
    const { result } = renderHook(() => useForm({ name: "" }));

    act(() => {
        // Update state
        result.current.handleChange({ target: { name: "name", value: "Timur" } });
    });

    act(() => {
        // handleSubmit returns a function, so we call it twice:
        // handleSubmit(callback)(event)
        result.current.handleSubmit(mockSubmit)({ preventDefault: () => { } });
    });

    expect(mockSubmit).toHaveBeenCalledWith({ name: "Timur" });
});