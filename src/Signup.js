import React, { useState } from 'react';
import './Signup.css';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Auth from './useAuth';
import { storage } from './firebase';

const Signup = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [openProgress, setOpenProgress] = useState(false);

  const auth = Auth();

  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = (data) => {
    setOpenProgress(true);
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) =>
            auth.signup(data.name, data.email, data.password, url)
          )
          setTimeout(() => {
            setOpenProgress(false);
            reset();
          }, 2000)
      }
      
    );
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="Signup">
      <TwitterIcon className="twitter" fontSize="large" />
      <h2>Sign up </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="name"
          ref={register({ required: true })}
          type="text"
          placeholder="Name"
        />
        <br />
        {errors.name && <p>This field is required!</p>}
        
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
        <input
          type="file"
          ref={register({ required: true })}
          name="file"
          onChange={handleChange}
        />{' '}
        <br />
        
        {openProgress && (
          <progress className="progress" value={progress} max="100" />
        )}
        <br />
        <input type="submit" value="Sign up" />
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
