// external imports
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
// internal imports
import Spinner from './Spinner';
import { selectCurrentUser, signOut } from '../features/auth/authSlice';
import { useLogoutMutation } from '../features/auth/authApiSlice';

function Header() {
  const dispatch = useDispatch();

  // current user from global state
  const user = useSelector(selectCurrentUser);

  // destructure mutation
  const [logout, { isLoading, isError, error }] = useLogoutMutation();
  
  // handle logout
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  // error effects
  useEffect(() => {
    if (isError) {
      const message = error?.data?.message;
      !message ? toast.error(error) : toast.error(message);
    }
  }, [isError, error]);

  // header content
  const content = (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>GoalTracker</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to='/user'>
                <FaUser /> User
              </Link>
            </li>
            <li>
              <button className='btn' onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
  
  // render
  return isLoading ? <Spinner /> : content 
}

export default Header;
