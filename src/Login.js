import React from 'react';
import './Signup.css';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from './useAuth';

const Login = () => {
  const auth = useAuth();
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = (data) => {
    auth.login(data.email, data.password)
    console.log(data);
    reset();
  };
  return (
    <div className="Signup">
      <TwitterIcon className="twitter" fontSize="large" />
      <h2>Login </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="email"
          ref={register({ required: true })}
          type="email"
          placeholder="Email"
        />{' '}
        <br />
        {errors.email && <p>This field is required!</p>}
        <input
          name="password"
          ref={register({ required: true })}
          type="password"
          placeholder="Password"
        />{' '}
        <br />
        {errors.password && <p>This field is required!</p>}
        <input type="submit" value="Login" />
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
