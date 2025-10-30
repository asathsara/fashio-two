import { renderHook, act, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { useItemForm } from "./useItemForm"
import * as useItemsModule from "@/hooks/useItems"

vi.mock("@/hooks/useItems")
vi.mock("sonner", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}))

describe("useItemForm", () => {
    const mockMutate = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
        vi.spyOn(useItemsModule, "useInsertItem").mockReturnValue({
            mutate: mockMutate,
            isPending: false,
        } as unknown as ReturnType<typeof useItemsModule.useInsertItem>)
    })

    it("should validate FormData matches user input", async () => {
        const { result } = renderHook(() => useItemForm())

        const testFile = new File(["test"], "test.jpg", { type: "image/jpeg" })

        await act(async () => {
            result.current.setValue("name", "Test Item")
            result.current.setValue("description", "Test Description")
            result.current.setValue("category", "cat1")
            result.current.setValue("subCategory", "subcat1")
            result.current.setValue("price", 100)
            result.current.setValue("stock", 50)
            result.current.setValue("selectedSizes", ["M", "L"])
            result.current.setValue("images", [testFile])
        })

        await act(async () => {
            await result.current.onSubmit()
        })

        await waitFor(() => {
            expect(mockMutate).toHaveBeenCalled()
            const formData = mockMutate.mock.calls[0][0] as FormData

            expect(formData.get("name")).toBe("Test Item")
            expect(formData.get("price")).toBe("100")
            expect(formData.get("stock")).toBe("50")
            expect(formData.get("selectedSizes")).toBe(JSON.stringify(["M", "L"]))
        })
    })
})