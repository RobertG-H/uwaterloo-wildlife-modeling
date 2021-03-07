const mockAuth: any = {
  sendPasswordResetEmail: jest.fn(() => Promise.resolve({})),
};

export { mockAuth as default };
