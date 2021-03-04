import React from 'react';
import LoginContainer from '..';
import { AuthProvider } from '../../../context/AuthProvider';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { auth } from '../../../firebase';

afterEach(cleanup);
jest.mock('auth');
const mockedAuth = auth as jest.Mocked<typeof auth>;

it('Username field is changed when user inputs text', () => {
  const { getByPlaceholderText } = render(<LoginContainer />);
  const userInput: HTMLInputElement = getByPlaceholderText(/Username/i) as HTMLInputElement;
  expect(userInput.value).toBe('');
  fireEvent.change(userInput, { target: { value: 'fakeemail' } });
  expect(userInput.value).toBe('fakeemail');
});

it('Password field is changed when user inputs text', () => {
  const { getByPlaceholderText } = render(<LoginContainer />);
  const passwordInput: HTMLInputElement = getByPlaceholderText(/Password/i) as HTMLInputElement;
  expect(passwordInput.value).toBe('');
  fireEvent.change(passwordInput, { target: { value: 'fakepassword' } });
  expect(passwordInput.value).toBe('fakepassword');
});

it('Error message is displayed when incorrect credentials are supplied', async () => {
  const mockAddListener = jest.spyOn(mockedAuth, 'signInWithEmailAndPassword');
  mockAddListener.mockImplementation((email: string, password: string) => {
    return new Promise((resolve, reject) => {
      reject({
        message: 'The email address is badly formatted.',
      });
    });
  });
  const { getByText, getByPlaceholderText } = render(
    <AuthProvider>
      <LoginContainer />
    </AuthProvider>,
  );
  const userInput: HTMLInputElement = getByPlaceholderText(/Username/i) as HTMLInputElement;
  const passwordInput: HTMLInputElement = getByPlaceholderText(/Password/i) as HTMLInputElement;
  const errorMessage = 'Error: The email address is badly formatted.';
  fireEvent.change(userInput, { target: { value: 'fakeemail' } });
  fireEvent.change(passwordInput, { target: { value: 'fakepassword' } });
  fireEvent.click(getByText('Submit'));
  expect(mockedAuth.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  await waitFor(() => {
    expect(getByText(/Error/i).textContent).toBe(errorMessage);
  });
});
