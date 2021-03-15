export interface authState {
  auth: {
    loading: boolean;
    data: any | null;
    error: any | null;
  };
}

export default <authState>{
  auth: {
    loading: false,
    data: null,
    error: null,
  },
};
