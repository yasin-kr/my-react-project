import { useState } from 'react';

const LoginForm2 = () => {
  const [values, setValues] = useState({
    login: '',
    password: '',
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();

    console.log(values);

    setValues({
      login: '',
      password: '',
    });
  };

  const handleChange = (evt) => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="login"
        value={values.login}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm2;
