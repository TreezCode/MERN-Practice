// external imports
import { useEffect } from 'react';
import { toast } from 'react-toastify';
// internal imports
import Spinner from '../components/Spinner';
import { useGetUserQuery } from '../features/auth/authApiSlice';

const User = () => {
  // destructure rtk query
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
      <br />
      <h4>Email: </h4>
      <p>{user?.email}</p>
      <br />
      <h4>Joined: </h4>
      <p>{new Date(user?.createdAt).toLocaleString('en-US')}</p>
      <br />
      <h4>Last Update: </h4>
      <p>{new Date(user?.updatedAt).toLocaleString('en-US')}</p>
    </section>
  );

  // render
  return isLoading ? <Spinner /> : content;
};
export default User;
