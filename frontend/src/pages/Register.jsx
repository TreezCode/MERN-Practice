// external imports
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
// internal imports
import Spinner from '../components/Spinner';
import { useRegisterMutation } from '../features/auth/authApiSlice';
import { setCredentials } from '../features/auth/authSlice';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // create local state for form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  // destructure state
  const { username, email, password, password2 } = formData;

  // destructure rtk mutation
  const [register, { isLoading, isSuccess }] = useRegisterMutation();
  
  // local state/reference for errors
  const [errMsg, setErrMsg] = useState('');
  const errRef = useRef();
  
  // --------- TODO ----------
  // create dynamic input errors
  // --------- TODO ----------
  
  // register effects
  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate, dispatch]);

  // handle input
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle submit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      try {
        const userData = { username, email, password };
        const credentials = await register(userData).unwrap();
        dispatch(setCredentials({ email, ...credentials }));
        navigate('/');
      } catch (error) {
        const message = error?.data?.message;
        !message ? toast.error(error) : toast.error(message);
        if (!error?.status) {
          setErrMsg('No Server Response');
        } else if (error?.status === 400) {
          setErrMsg(message);
        } else if (error?.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg('Registration failed...');
        }
        // errRef.current.focus();
      }
    }
  };

  // page content
  const content = (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <p ref={errRef} className={errMsg ? 'errMsg' : 'hidden'}>
        {errMsg}
      </p>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='username'
              name='username'
              value={username}
              placeholder='Enter your username'
              autoComplete='off'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
  
  // render
  return isLoading ? <Spinner /> : content;
}
export default Register;