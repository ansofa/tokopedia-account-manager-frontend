import Login from "@/app/(auth)/login/page";
import { render,screen } from "@testing-library/react";

describe("Login",()=>{
    it("[+] Login render",()=>{
        render(<Login />)
        const login = screen.getByText("Sign In")
        expect(login).toBeInTheDocument()

        const email = screen.getByText("Email")
        expect(email).toBeInTheDocument()

        const password = screen.getByText("Password")
        expect(password).toBeInTheDocument()

        const button = screen.getByText("Login")
        expect(button).toBeInTheDocument()

        const signIn = screen.getByText("Sign In")
        expect(signIn).toBeInTheDocument()

        const emailText = screen.getByText("Email")
        expect(emailText).toBeInTheDocument()

        const emailForm = screen.getByPlaceholderText("m@example.com")
        expect(emailForm).toBeInTheDocument()

        const passwordText = screen.getByText("Password")
        expect(passwordText).toBeInTheDocument()

        const passwordForm = screen.getByPlaceholderText("******")
        expect(passwordForm).toBeInTheDocument()

        const buttonLogin = screen.getByText("Login")
        expect(buttonLogin).toBeInTheDocument()


    })
    
    it("[-] Login not render",()=>{
        render(<Login />)
        const login = screen.getByText("Sign In")
        expect(login).not.toBe("ini bukan button login")

        const email = screen.getByText("Email")
        expect(email).not.toBe("ini bukan email")

        const password = screen.getByText("Password")
        expect(password).not.toBe("ini bukan password")

        const button = screen.getByText("Login")
        expect(button).not.toBe("ini bukan button login")

        const signIn = screen.getByText("Sign In")
        expect(signIn).not.toBe("ini bukan button login")

        const emailText = screen.getByText("Email")
        expect(emailText).not.toBe("ini bukan email")

        const emailForm = screen.getByPlaceholderText("m@example.com")
        expect(emailForm).not.toBe("ini bukan email")

        const passwordText = screen.getByText("Password")
        expect(passwordText).not.toBe("ini bukan password")

        const passwordForm = screen.getByPlaceholderText("******")
        expect(passwordForm).not.toBe("ini bukan password")

        const buttonLogin = screen.getByText("Login")
        expect(buttonLogin).not.toBe("ini bukan button login")

        
    })
})