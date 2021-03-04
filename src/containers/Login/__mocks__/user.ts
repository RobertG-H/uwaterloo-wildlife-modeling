const mockUser: any = {
  getIdToken: jest.fn(() => Promise.resolve({})),
};

export { mockUser as default };
