// Note this is not an End-to-End test. This is just to test the routing of App.tsx

import React from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import firebase from 'firebase/app';
import { mockHistoryPush } from './setupTests';
import App from './App';

afterEach(cleanup);

it('Loading app without credentials tries to push to auth/login, but will dashboard because test cannot load /auth/login', async () => {
  const { getByText, getByPlaceholderText } = render(<App />);

  expect(mockHistoryPush).toHaveBeenCalledWith('/auth/login');

  await waitFor(() => {
    expect(getByText(/Dashboard/i).textContent).toBe('Dashboard');
  });
});
