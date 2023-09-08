import { render, screen, waitFor } from "@testing-library/react";
import Signup from "../signup";
import userEvent from "@testing-library/user-event";
import { setupServer } from 'msw/node'
import { rest } from 'msw'

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

type SignUpData = {
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
};

const mockSignUpData: SignUpData = {
  email: 'boahCho@gmail.com',
  password: 'boahChoDora',
  password_confirmation: 'boahChoDora',
  first_name: 'Boah',
  last_name: 'Cho',
};

describe('SignUp', () => {
  describe('Render', () => {
    it('should render Sign Up text', () => {
      render(<Signup />);
      expect(screen.getByRole('heading', {name: 'Sign Up'})).toBeInTheDocument();
    });
    it('should render label Email', () => {
      render(<Signup />);
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });
    it('should render label Password', () => {
      render(<Signup />);
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });
    it('should render label Password Confirmation', () => {
      render(<Signup />);
      expect(screen.getByLabelText('Password Confirmation')).toBeInTheDocument();
    });
    it('should render label First Name', () => {
      render(<Signup />);
      expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    });
    it('should render label Last Name', () => {
      render(<Signup />);
      expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    });
    it('should render button Sign Up', () => {
      render(<Signup />);
      expect(screen.getByRole('button', {name: 'Sign Up'})).toBeInTheDocument();
    });
  });

  // describe('Function', () => {
  //   it('should display error message when password confirmation is not match', async () => {
  //     render(<Signup />);
  //     const emailInput = screen.getByLabelText('Email');
  //     const passwordInput = screen.getByLabelText('Password');
  //     const passwordConfirmationInput = screen.getByLabelText('Password Confirmation');
  //     const firstNameInput = screen.getByLabelText('First Name');
  //     const lastNameInput = screen.getByLabelText('Last Name');
  //     const submitButton = screen.getByRole('button', {name: 'Sign Up'});
  //     await userEvent.type(emailInput, mockSignUpData.email);
  //     await userEvent.type(passwordInput, mockSignUpData.password);
  //     await userEvent.type(passwordConfirmationInput, mockSignUpData.password_confirmation+'a');
  //     await userEvent.type(firstNameInput, mockSignUpData.first_name);
  //     await userEvent.type(lastNameInput, mockSignUpData.last_name);
  //     submitButton.click();
  //     expect(screen.findByText(/Password does not match/)).toBeInTheDocument();
  //   });
  //   it('should post data to backend when all fields are filled properly', async () => {
  //     render(<Signup />);
  //     const emailInput = screen.getByLabelText('Email');
  //     const passwordInput = screen.getByLabelText('Password');
  //     const passwordConfirmationInput = screen.getByLabelText('Password Confirmation');
  //     const firstNameInput = screen.getByLabelText('First Name');
  //     const lastNameInput = screen.getByLabelText('Last Name');
  //     const submitButton = screen.getByRole('button', {name: 'Sign Up'});
  //     await userEvent.type(emailInput, mockSignUpData.email);
  //     await userEvent.type(passwordInput, mockSignUpData.password);
  //     await userEvent.type(passwordConfirmationInput, mockSignUpData.password_confirmation);
  //     await userEvent.type(firstNameInput, mockSignUpData.first_name);
  //     await userEvent.type(lastNameInput, mockSignUpData.last_name);
  //     submitButton.click();
  //     expect(screen.findByText(/Sign up success/)).toBeInTheDocument();
  //   });
  // });
});