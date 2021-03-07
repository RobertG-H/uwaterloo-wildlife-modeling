import React from 'react';
import LoginContainer from '../LoginContainer';
import { AuthProvider } from '../../../context/AuthProvider';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import firebase from 'firebase/app';
import { mockHistoryPush, mockedAuth, mockedUserCredential } from '../../../setupTests';

afterEach(cleanup);

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

it('Error message is displayed when submit is clicked with incorrect credentials', async () => {
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

it('History.push is called when submit is clicked with correct credentials', async () => {
  const mockAddListener = jest.spyOn(mockedAuth, 'signInWithEmailAndPassword');
  mockAddListener.mockImplementation((email: string, password: string) => {
    return new Promise((resolve, reject) => {
      resolve(mockedUserCredential);
    });
  });
  const { getByText, getByPlaceholderText } = render(
    <AuthProvider>
      <LoginContainer />
    </AuthProvider>,
  );
  const userInput: HTMLInputElement = getByPlaceholderText(/Username/i) as HTMLInputElement;
  const passwordInput: HTMLInputElement = getByPlaceholderText(/Password/i) as HTMLInputElement;
  fireEvent.change(userInput, { target: { value: 'fakeemail' } });
  fireEvent.change(passwordInput, { target: { value: 'fakepassword' } });
  fireEvent.click(getByText('Submit'));
  expect(mockedAuth.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  await waitFor(() => {
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});
