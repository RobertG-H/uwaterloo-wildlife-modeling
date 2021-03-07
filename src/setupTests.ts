// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import firebase from 'firebase/app';
import { auth } from './firebase';

// Mock History
export const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

// Mock Auth

jest.mock('auth');
export const mockedAuth = auth as jest.Mocked<typeof auth>;

export class MockUser implements firebase.User {
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

export const mockedUserCredential: firebase.auth.UserCredential = {
  credential: null,
  user: new MockUser(),
};

// mock local storage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};
global.localStorage = localStorageMock;
