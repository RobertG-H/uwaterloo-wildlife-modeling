import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useHistory } from 'react-router-dom';
import { login } from '../../context/actions/login';

interface formInputTypes {
  username: string;
  password: string;
}

export interface formTypes {
  form: formInputTypes;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, data: any) => void;
  loading: boolean;
  error: any | null;
  loginFormValid: boolean;
  onSubmit: () => void;
}

export default (): formTypes => {
  const [form, setForm] = useState<formInputTypes>({
    username: '',
    password: '',
  });

  const history = useHistory();

  const {
    state: {
      auth: { loading, error, data },
    },
    dispatch,
  } = useContext(AuthContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, data: any) => {
    setForm({ ...form, [data.name]: data.value });
  };

  const loginFormValid = !form.username.length || !form.password.length;

  const onSubmit = () => {
    login(form)(dispatch);
  };

  useEffect(() => {
    if (data) {
      if (data!.user) {
        history.push('/');
      }
    }
  }, [data]);

  return { form, onChange, loading, error, loginFormValid, onSubmit };
};
