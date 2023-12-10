import datamock from "@/__mocks__/datamock";
import { ThemeToggle } from "@/components/theme-toggle";
import { render, screen } from "@testing-library/react";

describe("ButtonLoading", () => {
    it("[+] Button render", () => {
        render(<ThemeToggle />)
        const themeToggle = screen.getByText(datamock.themeToggle.textToggle)

        expect(screen.getByText(datamock.themeToggle.textToggle)).toBeInTheDocument()
    })

    it("[-] Button not render", () => {
        render(<ThemeToggle />)
        const themeToggle = screen.getByText(datamock.themeToggle.textToggle)

        expect(themeToggle).not.toBe("ini bukan text toggle")
    })
})