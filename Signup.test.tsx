import {getByLabelText, getByTestId, render,screen} from '@testing-library/react'
import SignUpForm from '../Signup.web'
import validateForm from '../Signup.web'
import userEvent from '@testing-library/user-event'

describe("test the SignupForm Component",() => {
    test("render signup form with button", async() => {
        render(<SignUpForm/>)
        const button = await screen.findAllByRole("button")
        expect(button).toHaveLength(1)
    })
    test("should failed on validation",() => {
        const firstName = " "
        const lastName = " "
        const email = "manish.com"
        const password = " "
        const confirmpassword = "vbgn"
        expect(new validateForm(firstName)).not.toBe(true)
        expect(new validateForm(lastName)).not.toBe(true)
        expect(new validateForm(email)).not.toBe(true)
        expect(new validateForm(password)).not.toBe(true)
        expect(new validateForm(confirmpassword)).not.toBe(true)
    })
    test("email input should accept email",()=>{
        render(<SignUpForm/>)

        const email = screen.getByLabelText("Email") as HTMLInputElement
        userEvent.type(email,"manish")
        expect(email.value).not.toMatch("manish@gmail.com")
    })
    test("password input should have type password",()=>{
        render(<SignUpForm/>)

        const password = screen.getByLabelText("Password") as HTMLInputElement
        expect(password).toHaveAttribute("type","password")
    })
    test("confirm password input should match with password",()=>{
        render(<SignUpForm/>)

        const confirmPassword = screen.getByLabelText("Confirm Password") as HTMLInputElement
        expect(confirmPassword).toHaveAttribute("type","password")
    })
    test("should be able to submit the form", () =>{
        render(<SignUpForm/>)
        const submitButton = getByTestId(document.body,"signup-button")
        const firstName = screen.getByLabelText("First Name") as HTMLInputElement
        const lastName = screen.getByLabelText("Last Name")as HTMLInputElement
        const email = screen.getByLabelText("Email") as HTMLInputElement
        const password = screen.getByLabelText("Password") as HTMLInputElement
        const confirmPassword = screen.getByLabelText("Confirm Password") as HTMLInputElement

        userEvent.type(firstName,"Manish")
        userEvent.type(lastName,"Yogi")
        userEvent.type(email,"manish@gmail.in")
        userEvent.type(password,"Manish@123")
        userEvent.type(confirmPassword,"Manish@123")

        userEvent.click(submitButton)

        expect(firstName.value).toMatch("")
        expect(lastName.value).toMatch("")
        expect(email.value).toMatch("")
        expect(password.value).toMatch("")
        expect(confirmPassword.value).toMatch("")
    })
})