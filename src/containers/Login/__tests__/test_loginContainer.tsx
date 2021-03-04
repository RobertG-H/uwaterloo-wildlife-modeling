import React from 'react';
import LoginContainer from '../LoginContainer';
import { AuthProvider } from '../../../context/AuthProvider';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { auth } from '../../../firebase';
import firebase from 'firebase/app';

afterEach(cleanup);

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock('auth');
const mockedAuth = auth as jest.Mocked<typeof auth>;

class MockUser implements firebase.User {
  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  emailVerified!: boolean;
  getIdTokenResult(forceRefresh?: boolean): Promise<firebase.auth.IdTokenResult> {
    throw new Error('Method not implemented.');
  }
  getIdToken(forceRefresh?: boolean): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve('faketoken');
    });
  }
  isAnonymous!: boolean;
  linkAndRetrieveDataWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.auth.UserCredential> {
    throw new Error('Method not implemented.');
  }
  linkWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.auth.UserCredential> {
    throw new Error('Method not implemented.');
  }
  linkWithPhoneNumber(
    phoneNumber: string,
    applicationVerifier: firebase.auth.ApplicationVerifier,
  ): Promise<firebase.auth.ConfirmationResult> {
    throw new Error('Method not implemented.');
  }
  linkWithPopup(provider: firebase.auth.AuthProvider): Promise<firebase.auth.UserCredential> {
    throw new Error('Method not implemented.');
  }
  linkWithRedirect(provider: firebase.auth.AuthProvider): Promise<void> {
    throw new Error('Method not implemented.');
  }
  metadata!: firebase.auth.UserMetadata;
  multiFactor!: firebase.User.MultiFactorUser;
  phoneNumber!: string | null;
  providerData!: (firebase.UserInfo | null)[];
  reauthenticateAndRetrieveDataWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.auth.UserCredential> {
    throw new Error('Method not implemented.');
  }
  reauthenticateWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.auth.UserCredential> {
    throw new Error('Method not implemented.');
  }
  reauthenticateWithPhoneNumber(
    phoneNumber: string,
    applicationVerifier: firebase.auth.ApplicationVerifier,
  ): Promise<firebase.auth.ConfirmationResult> {
    throw new Error('Method not implemented.');
  }
  reauthenticateWithPopup(provider: firebase.auth.AuthProvider): Promise<firebase.auth.UserCredential> {
    throw new Error('Method not implemented.');
  }
  reauthenticateWithRedirect(provider: firebase.auth.AuthProvider): Promise<void> {
    throw new Error('Method not implemented.');
  }
  refreshToken!: string;
  reload(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  sendEmailVerification(actionCodeSettings?: firebase.auth.ActionCodeSettings | null): Promise<void> {
    throw new Error('Method not implemented.');
  }
  tenantId!: string | null;
  toJSON(): Object {
    throw new Error('Method not implemented.');
  }
  unlink(providerId: string): Promise<firebase.User> {
    throw new Error('Method not implemented.');
  }
  updateEmail(newEmail: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updatePassword(newPassword: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updatePhoneNumber(phoneCredential: firebase.auth.AuthCredential): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateProfile(profile: { displayName?: string | null | undefined; photoURL?: string | null | undefined }): Promise<void> {
    throw new Error('Method not implemented.');
  }
  verifyBeforeUpdateEmail(newEmail: string, actionCodeSettings?: firebase.auth.ActionCodeSettings | null): Promise<void> {
    throw new Error('Method not implemented.');
  }
  displayName!: string | null;
  email!: string | null;
  photoURL!: string | null;
  providerId!: string;
  uid!: string;
}

const mockedUserCredential: firebase.auth.UserCredential = {
  credential: null,
  user: new MockUser(),
};

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
