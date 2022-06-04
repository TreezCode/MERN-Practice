// external imports
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
// internal imports
import { selectCurrentUser, signOut } from '../features/auth/authSlice';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import Spinner from './Spinner';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [logout, { isLoading, isError, isSuccess, error }] =
    useLogoutMutation();

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
                <FaSignInAlt /> settings
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

  return isLoading ? <Spinner /> : content 
}

export default Header;
