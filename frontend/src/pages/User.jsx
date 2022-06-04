// external imports
import { useEffect } from 'react';
import { toast } from 'react-toastify';
// internal imports
import Spinner from '../components/Spinner';
import { useGetUserQuery } from '../features/auth/authApiSlice';

const User = () => {
  const { data: user, isLoading, isError, error } = useGetUserQuery();

  // error effects
  useEffect(() => {
    if (isError) {
      const message = error?.data?.message;
      !message ? toast.error(error) : toast.error(message);
    }
  });

  // page content
  const content = (
    <section className='heading'>
      <h1>Welcome {user?.username}</h1>
      <p>{user?.email}</p>
      <br />
      <h4>Updated at: </h4>
      <p>{new Date(user?.updatedAt).toLocaleString('en-US')}</p>
    </section>
  );

  // render
  return isLoading ? <Spinner /> : content;
};
export default User;
