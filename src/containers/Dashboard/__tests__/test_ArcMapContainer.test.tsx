import React from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import ArcMapContainer from '../DashboardContainer';
import ArcAuthContainer from '../../ArcAuthContainer';
import { ArcProvider } from '../../../context/ArcProvider';
import { act } from 'react-dom/test-utils';
import { ArcContext } from '../../../context/ArcProvider';
import { mockedAxios, mockedUserCredential } from '../../../setupTests';

afterEach(cleanup);

it('Failing the axios get request causes a console warn.', async () => {
  // set axios mock to return invalid token
  const spyAxios = jest.spyOn(mockedAxios, 'get');
  spyAxios.mockImplementation((url: string, params: any) => {
    return new Promise((resolve, reject) => {
      resolve({
        data: null,
      });
    });
  });
  // Spy console warn
  const spyConsole = jest.spyOn(console, 'warn');
  spyConsole.mockImplementation((message: string) => {
    return null;
  });
  await act(async () => {
    render(
      <ArcProvider>
        <ArcAuthContainer>
          <ArcMapContainer />
        </ArcAuthContainer>
      </ArcProvider>,
    );
  });
  expect(console.warn).toBeCalled();
  spyConsole.mockRestore();
  spyAxios.mockRestore();
});

it('With a valid axios get request response, no console warn should be called .', async () => {
  // set axios mock to return invalid token
  const spyAxios = jest.spyOn(mockedAxios, 'get');
  spyAxios.mockImplementation((url: string, params: any) => {
    return new Promise((resolve, reject) => {
      resolve({
        data: {
          access_token: 'validtoken',
          expires_in: 1000,
        },
      });
    });
  });
  // Spy console warn
  const spyConsole = jest.spyOn(console, 'warn');
  spyConsole.mockImplementation((message: string) => {
    return null;
  });
  await act(async () => {
    render(
      <ArcProvider>
        <ArcAuthContainer>
          <ArcMapContainer />
        </ArcAuthContainer>
      </ArcProvider>,
    );
  });
  expect(console.warn).toBeCalledTimes(0);
  spyConsole.mockRestore();
  spyAxios.mockRestore();
});
