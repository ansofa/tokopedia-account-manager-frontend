import datamock from "@/__mocks__/datamock";
import Registration from "@/app/(auth)/registration/page";
import { render, screen } from "@testing-library/react";

describe("Registration", () => {
    it("[+] Registration render", () => {
        render(<Registration />)
        const registration = screen.getByText("Sign Up")
        expect(registration).toBeInTheDocument()

        const description = screen.getByText("Create your email by filling this section")
        expect(description).toBeInTheDocument()

        const usernameText = screen.getByText("Full Name")
        expect(usernameText).toBeInTheDocument()

        const usernameForm = screen.getByPlaceholderText("Full Name")
        expect(usernameForm).toBeInTheDocument()

        const emailText = screen.getByText("Email")
        expect(emailText).toBeInTheDocument()

        const emailForm = screen.getByPlaceholderText("m@example.com")
        expect(emailForm).toBeInTheDocument()

        const passwordText = screen.getByText("Password")
        expect(passwordText).toBeInTheDocument()

    })

    it("[-] Registration not render", () => {
        render(<Registration />)
        const registration = screen.getByText("Sign Up")
        expect(registration).not.toBe("ini bukan button login")

        const description = screen.getByText("Create your email by filling this section")
        expect(description).not.toBe("ini bukan description")

        const usernameText = screen.getByText("Full Name")
        expect(usernameText).not.toBe("ini bukan username")

        const usernameForm = screen.getByPlaceholderText("Full Name")
        expect(usernameForm).not.toBe("ini bukan username")

        const emailText = screen.getByText("Email")
        expect(emailText).not.toBe("ini bukan email")

        const emailForm = screen.getByPlaceholderText("m@example.com")
        expect(emailForm).not.toBe("ini bukan email")

        const passwordText = screen.getByText("Password")
        expect(passwordText).not.toBe("ini bukan password")

        
    })
})