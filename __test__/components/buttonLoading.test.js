import datamock from "@/__mocks__/datamock";
import { ButtonLoading } from "@/components/button-loading";
import { render, screen } from "@testing-library/react";

describe("ButtonLoading", () => {
    it("[+] Button render", () => {
        render(< ButtonLoading />)
        const button = screen.getByRole("button", datamock.loadingButton)

        expect(screen.getByText("Please wait")).toBeInTheDocument()
    })

    it("[-] Button not render", () => {
        render(< ButtonLoading />)
        const button = screen.getByRole("button", datamock.loadingButton)

        expect(button).not.toBe("ini bukan button loading")
    })
})