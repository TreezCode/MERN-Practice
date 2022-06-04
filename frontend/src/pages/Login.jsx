// external imports
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
// internal imports
import Spinner from '../components/Spinner';
import { setCredentials } from '../features/auth/authSlice';
import { useLoginMutation } from '../features/auth/authApiSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // local state for form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // destructure form state
  const { email, password } = formData;

  // destructure rtk mutation
  const [login, { isLoading, isSuccess }] = useLoginMutation();

  // local state/reference for errors
  const [errMsg, setErrMsg] = useState('');
  const errRef = useRef();

  // --------- TODO ----------
  // create dynamic input errors
  // --------- TODO ----------

  // input effects
  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  // login effects
  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

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
    try {
      const credentials = await login({ email, password }).unwrap();
      dispatch(setCredentials({ email, ...credentials }));
      setFormData({
        email: '',
        password: '',
      });
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
        setErrMsg('Login failed...');
      }
      // errRef.current.focus();
    }
  };

  // page content
  const content = (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>
      <p ref={errRef} className={errMsg ? 'errMsg' : 'hidden'}>
        {errMsg}
      </p>
      <section className='form'>
        <form onSubmit={onSubmit}>
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

export default Login;
